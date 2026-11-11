/**
 * ==============================================================================
 * Tech & AI Academy - Operations & Daily Logistics Portal
 * Production Single-Page Application Engine
 * ==============================================================================
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. STATE & STORAGE MANAGEMENT
  // ============================================================================

  const STORAGE_KEY = 'tech_ai_academy_data_v1';
  const LOGO_STORAGE_KEY = 'tech_ai_academy_logo_v1';
  const SUPABASE_CONFIG_KEY = 'tech_ai_academy_supabase_cfg_v1';

  // Default Academy Supabase Configuration
  const DEFAULT_SUPABASE_CONFIG = {
    url: 'https://sopqoumqblhtguprgtwx.supabase.co',
    key: 'sb_publishable_zPJ4Fguz3X4SnLavQpurRg_lUMxf_BO'
  };

  // Default initial tracks & cohorts (Clean state: 0 students)
  const DEFAULT_STATE = {
    students: [], // Clean state: zero hardcoded dummy names
    manifestLogs: [], // Clean state: daily records
    cohorts: {
      bootcamp: ['August Intake', 'November Intake'],
      regular: ['January Intake', 'February Intake', 'March Intake', 'April Intake', 'May Intake', 'June Intake']
    },
    tracks: {
      bootcamp: ['Junior Robotics', 'Advanced Robotics', 'Web Development'],
      regular: [
        'Full-Stack Web Development',
        'Cybersecurity & Ethical Hacking',
        'Data Science & Machine Learning',
        'Cloud & DevOps Engineering'
      ]
    }
  };

  // App Runtime State
  const state = {
    activeBranch: 'bootcamp', // 'bootcamp' or 'regular'
    activeCohort: 'August Intake',
    activeTrack: 'all',
    activeManifestType: 'morning_pickup', // 'morning_pickup' | 'evening_dropoff' | 'gate_pickup' | 'class_attendance'
    activeDate: new Date().toISOString().split('T')[0],
    searchQuery: '',
    data: loadStoredData(),
    supabaseClient: null,
    supabaseStatus: 'local', // 'local' | 'connected' | 'error'
    deferredPrompt: null // For PWA install
  };

  function loadStoredData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          students: Array.isArray(parsed.students) ? parsed.students : [],
          manifestLogs: Array.isArray(parsed.manifestLogs) ? parsed.manifestLogs : [],
          cohorts: parsed.cohorts || DEFAULT_STATE.cohorts,
          tracks: parsed.tracks || DEFAULT_STATE.tracks
        };
      }
    } catch (e) {
      console.warn('Failed to parse local storage data, resetting to clean state:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveStoredData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (e) {
      console.error('Failed to write to local storage:', e);
    }
  }

  // ============================================================================
  // 2. SUPABASE BACKEND INTEGRATION
  // ============================================================================

  function initSupabase() {
    try {
      let config = null;
      const configStr = localStorage.getItem(SUPABASE_CONFIG_KEY);
      if (configStr) {
        config = JSON.parse(configStr);
      }
      
      // Fallback to default credentials if not overridden
      const url = (config && config.url) ? config.url : DEFAULT_SUPABASE_CONFIG.url;
      const key = (config && config.key) ? config.key : DEFAULT_SUPABASE_CONFIG.key;

      if (url && key && window.supabase) {
        state.supabaseClient = window.supabase.createClient(url, key);
        testSupabaseConnection(false);
        return;
      }
    } catch (e) {
      console.warn('Supabase initialization deferred:', e);
    }
    updateSupabaseStatus('local');
  }

  async function testSupabaseConnection(showToast = true) {
    if (!state.supabaseClient) {
      updateSupabaseStatus('local');
      if (showToast) notify('Operating in LocalStorage Mode (No Supabase credentials configured)', 'info');
      return false;
    }

    try {
      updateSupabaseStatus('connecting');
      const { data, error } = await state.supabaseClient
        .from('students')
        .select('id')
        .limit(1);

      if (error) {
        // Table not found means project connection succeeded, but SQL schema hasn't run yet
        if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('does not exist')) {
          updateSupabaseStatus('schema_needed');
          if (showToast) notify('Connected to Supabase Project! Please run supabase-schema.sql in Supabase SQL Editor.', 'info');
          return false;
        }
        throw error;
      }

      updateSupabaseStatus('connected');
      if (showToast) notify('Successfully connected to Supabase PostgreSQL Database!', 'success');
      
      // Auto-sync initial data from Supabase
      syncWithSupabase();
      return true;
    } catch (err) {
      console.error('Supabase connection error:', err);
      updateSupabaseStatus('error');
      if (showToast) notify('Supabase connection failed: ' + (err.message || 'Check URL/Key or schema'), 'error');
      return false;
    }
  }

  async function syncWithSupabase() {
    if (!state.supabaseClient || state.supabaseStatus !== 'connected') return;

    try {
      // 1. Fetch Students
      const { data: dbStudents, error: err1 } = await state.supabaseClient
        .from('students')
        .select('*');

      if (!err1 && dbStudents && dbStudents.length > 0) {
        // Merge Supabase students into state
        const localMap = new Map(state.data.students.map(s => [s.id, s]));
        dbStudents.forEach(remoteStudent => {
          localMap.set(remoteStudent.id, remoteStudent);
        });
        state.data.students = Array.from(localMap.values());
      }

      // 2. Fetch Manifest Logs for Active Date
      const { data: dbLogs, error: err2 } = await state.supabaseClient
        .from('manifest_logs')
        .select('*')
        .eq('date', state.activeDate);

      if (!err2 && dbLogs) {
        const logMap = new Map(state.data.manifestLogs.map(l => [`${l.student_id}_${l.date}_${l.type}`, l]));
        dbLogs.forEach(remoteLog => {
          logMap.set(`${remoteLog.student_id}_${remoteLog.date}_${remoteLog.type}`, remoteLog);
        });
        state.data.manifestLogs = Array.from(logMap.values());
      }

      saveStoredData();
      renderApp();
    } catch (e) {
      console.warn('Sync with Supabase encountered a non-fatal warning:', e);
    }
  }

  async function persistStudentToSupabase(student) {
    if (!state.supabaseClient || state.supabaseStatus !== 'connected') return;
    try {
      await state.supabaseClient.from('students').upsert({
        id: student.id,
        name: student.name,
        phone: student.phone,
        residence: student.residence,
        branch: student.branch,
        cohort: student.cohort,
        track: student.track,
        transport_mode: student.transport_mode,
        notes: student.notes || ''
      });
    } catch (e) {
      console.warn('Could not sync student to Supabase:', e);
    }
  }

  async function persistManifestLogToSupabase(log) {
    if (!state.supabaseClient || state.supabaseStatus !== 'connected') return;
    try {
      await state.supabaseClient.from('manifest_logs').upsert({
        student_id: log.student_id,
        date: log.date,
        type: log.type,
        status: log.status,
        logged_at: log.logged_at,
        notes: log.notes || ''
      }, { onConflict: 'student_id,date,type' });
    } catch (e) {
      console.warn('Could not sync manifest log to Supabase:', e);
    }
  }

  function updateSupabaseStatus(status) {
    state.supabaseStatus = status;
    const dot = document.getElementById('supabase-status-dot');
    const indicator = document.getElementById('settings-status-indicator');
    const statusText = document.getElementById('settings-status-text');

    if (!dot || !indicator || !statusText) return;

    if (status === 'connected') {
      dot.className = 'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-dark-900';
      dot.title = 'Database Status: Connected to Supabase';
      indicator.className = 'w-3 h-3 rounded-full bg-emerald-400';
      statusText.textContent = 'Supabase Cloud: Connected & Syncing';
      statusText.className = 'text-xs font-bold text-emerald-400';
    } else if (status === 'schema_needed') {
      dot.className = 'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping border-2 border-dark-900';
      dot.title = 'Database Status: Connected to Supabase! Run supabase-schema.sql to initialize tables';
      indicator.className = 'w-3 h-3 rounded-full bg-cyan-400';
      statusText.textContent = 'Supabase Connected (Run schema in SQL editor)';
      statusText.className = 'text-xs font-bold text-cyan-300';
    } else if (status === 'error') {
      dot.className = 'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-dark-900';
      dot.title = 'Database Status: Supabase Connection Error';
      indicator.className = 'w-3 h-3 rounded-full bg-rose-500';
      statusText.textContent = 'Supabase Cloud: Connection Error';
      statusText.className = 'text-xs font-bold text-rose-400';
    } else {
      dot.className = 'absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-dark-900';
      dot.title = 'Database Status: LocalStorage Mode';
      indicator.className = 'w-3 h-3 rounded-full bg-amber-400';
      statusText.textContent = 'LocalStorage Mode (Offline Ready)';
      statusText.className = 'text-xs font-bold text-amber-400';
    }
  }

  // ============================================================================
  // 3. DYNAMIC BACKGROUND SLIDESHOW & KEN BURNS EFFECT
  // ============================================================================

  function initBackgroundSlideshow() {
    const slides = document.querySelectorAll('.slide-item');
    if (!slides || slides.length === 0) return;

    let currentIndex = 0;
    // Cross slide every 3000ms with Ken Burns zoom animation
    setInterval(() => {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }, 3000);
  }

  // ============================================================================
  // 4. MOBILE PWA INSTALL ENGINE
  // ============================================================================

  function initPWA() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker registered for offline use:', reg.scope))
          .catch(err => console.warn('Service Worker registration skipped:', err));
      });
    }

    // Capture install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      state.deferredPrompt = e;
      const installBtn = document.getElementById('pwa-install-btn');
      if (installBtn) {
        installBtn.classList.add('border-cyan-400', 'bg-cyan-500/20');
      }
    });

    const installBtn = document.getElementById('pwa-install-btn');
    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        if (state.deferredPrompt) {
          state.deferredPrompt.prompt();
          const { outcome } = await state.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            notify('Tech & AI Academy installed successfully!', 'success');
            state.deferredPrompt = null;
          }
        } else {
          // Fallback guidance for iOS and already-installed browsers
          notify('To install: tap your browser Share button (⎋) and select "Add to Home Screen" 📲', 'info');
        }
      });
    }
  }

  // ============================================================================
  // 5. BRANDING & LOGO CUSTOMIZER
  // ============================================================================

  function initLogoCustomizer() {
    const logoTrigger = document.getElementById('logo-trigger');
    const logoModal = document.getElementById('modal-logo');
    const closeLogoModalBtn = document.getElementById('btn-close-logo-modal');
    const logoFileInput = document.getElementById('input-logo-file');
    const logoPreviewImg = document.getElementById('logo-preview-img');
    const saveLogoBtn = document.getElementById('btn-save-logo');
    const resetLogoBtn = document.getElementById('btn-reset-logo');
    const academyLogoImg = document.getElementById('academy-logo-img');

    // Load saved custom logo if exists
    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo && academyLogoImg) {
      academyLogoImg.src = savedLogo;
      if (logoPreviewImg) logoPreviewImg.src = savedLogo;
    }

    if (logoTrigger && logoModal) {
      logoTrigger.addEventListener('click', () => {
        logoModal.classList.remove('hidden');
      });
    }

    if (closeLogoModalBtn && logoModal) {
      closeLogoModalBtn.addEventListener('click', () => {
        logoModal.classList.add('hidden');
      });
    }

    let tempLogoData = null;
    if (logoFileInput) {
      logoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            tempLogoData = event.target.result;
            if (logoPreviewImg) logoPreviewImg.src = tempLogoData;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (saveLogoBtn) {
      saveLogoBtn.addEventListener('click', () => {
        if (tempLogoData) {
          localStorage.setItem(LOGO_STORAGE_KEY, tempLogoData);
          if (academyLogoImg) academyLogoImg.src = tempLogoData;
          notify('Custom Academy logo updated successfully!', 'success');
        }
        logoModal.classList.add('hidden');
      });
    }

    if (resetLogoBtn) {
      resetLogoBtn.addEventListener('click', () => {
        localStorage.removeItem(LOGO_STORAGE_KEY);
        if (academyLogoImg) academyLogoImg.src = './icons/icon.svg';
        if (logoPreviewImg) logoPreviewImg.src = './icons/icon.svg';
        tempLogoData = null;
        notify('Reset to official Academy logo icon.', 'info');
        logoModal.classList.add('hidden');
      });
    }
  }

  // ============================================================================
  // 6. UI RENDERING & COMPONENT ORCHESTRATION
  // ============================================================================

  function renderApp() {
    renderNavigation();
    renderBranchControls();
    renderManifestTable();
    updateKPIs();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function renderNavigation() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    // Desktop branch buttons
    const btnBootcamp = document.getElementById('branch-nav-bootcamp');
    const btnRegular = document.getElementById('branch-nav-regular');
    // Mobile branch buttons
    const mBtnBootcamp = document.getElementById('mobile-branch-bootcamp');
    const mBtnRegular = document.getElementById('mobile-branch-regular');
    // Dock buttons
    const dockBootcamp = document.getElementById('dock-btn-bootcamp');
    const dockRegular = document.getElementById('dock-btn-regular');

    if (isBootcamp) {
      btnBootcamp?.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnBootcamp?.classList.remove('text-slate-300', 'hover:bg-white/5');
      btnRegular?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnRegular?.classList.add('text-slate-300', 'hover:bg-white/5');

      mBtnBootcamp?.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white');
      mBtnBootcamp?.classList.remove('text-slate-400');
      mBtnRegular?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white');
      mBtnRegular?.classList.add('text-slate-400');

      dockBootcamp?.classList.add('text-cyan-400');
      dockBootcamp?.classList.remove('text-slate-400');
      dockRegular?.classList.remove('text-cyan-400');
      dockRegular?.classList.add('text-slate-400');
    } else {
      btnRegular?.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white', 'shadow-md');
      btnRegular?.classList.remove('text-slate-300', 'hover:bg-white/5');
      btnBootcamp?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnBootcamp?.classList.add('text-slate-300', 'hover:bg-white/5');

      mBtnRegular?.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white');
      mBtnRegular?.classList.remove('text-slate-400');
      mBtnBootcamp?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white');
      mBtnBootcamp?.classList.add('text-slate-400');

      dockRegular?.classList.add('text-cyan-400');
      dockRegular?.classList.remove('text-slate-400');
      dockBootcamp?.classList.remove('text-cyan-400');
      dockBootcamp?.classList.add('text-slate-400');
    }

    // Toggle control panels
    const secBootcamp = document.getElementById('section-bootcamp-controls');
    const secRegular = document.getElementById('section-regular-controls');
    if (isBootcamp) {
      secBootcamp?.classList.remove('hidden');
      secRegular?.classList.add('hidden');
    } else {
      secBootcamp?.classList.add('hidden');
      secRegular?.classList.remove('hidden');
    }

    // Update banner badge and titles
    const badgeBranch = document.getElementById('badge-branch-type');
    const viewTitle = document.getElementById('view-title');
    const viewSubtitle = document.getElementById('view-subtitle');

    if (isBootcamp) {
      if (badgeBranch) badgeBranch.textContent = 'Branch A: Kids Seasonal Boot Camp';
      if (badgeBranch) badgeBranch.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
      if (viewTitle) viewTitle.textContent = 'Daily Logistics & Attendance Operations';
      if (viewSubtitle) viewSubtitle.textContent = 'Real-time morning bus pickup, evening dropoff & gate registers';
    } else {
      if (badgeBranch) badgeBranch.textContent = 'Branch B: Regular Programs (Adults/Youth)';
      if (badgeBranch) badgeBranch.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30';
      if (viewTitle) viewTitle.textContent = 'Class Attendance & Academic Register';
      if (viewSubtitle) viewSubtitle.textContent = 'Year-round career programs attendance roster & compliance';
    }

    // Active day badge
    const activeDayText = document.getElementById('active-day-text');
    if (activeDayText) {
      const dayName = new Date(state.activeDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      activeDayText.textContent = dayName;
    }
  }

  function renderBranchControls() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    if (isBootcamp) {
      // 1. Boot Camp Cohorts
      const cohortContainer = document.getElementById('bootcamp-cohort-tabs');
      if (cohortContainer) {
        cohortContainer.innerHTML = '';
        state.data.cohorts.bootcamp.forEach(cohort => {
          const isActive = state.activeCohort === cohort;
          const btn = document.createElement('button');
          btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
            isActive
              ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/20'
              : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
          }`;
          btn.textContent = cohort;
          btn.onclick = () => {
            state.activeCohort = cohort;
            renderApp();
          };
          cohortContainer.appendChild(btn);
        });
      }

      // 2. Boot Camp Tracks
      const trackContainer = document.getElementById('bootcamp-track-pills');
      if (trackContainer) {
        trackContainer.innerHTML = '';
        // 'All Tracks' pill
        const allBtn = document.createElement('button');
        allBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          state.activeTrack === 'all'
            ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
            : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
        }`;
        allBtn.textContent = 'All Tracks';
        allBtn.onclick = () => {
          state.activeTrack = 'all';
          renderApp();
        };
        trackContainer.appendChild(allBtn);

        state.data.tracks.bootcamp.forEach(track => {
          const isActive = state.activeTrack === track;
          const btn = document.createElement('button');
          btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
            isActive
              ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
              : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
          }`;
          btn.textContent = track;
          btn.onclick = () => {
            state.activeTrack = track;
            renderApp();
          };
          trackContainer.appendChild(btn);
        });
      }

      // 3. Logistics Sub-Tabs Styling
      const tabs = [
        { id: 'tab-logistics-morning', type: 'morning_pickup' },
        { id: 'tab-logistics-evening', type: 'evening_dropoff' },
        { id: 'tab-logistics-gate', type: 'gate_pickup' },
        { id: 'tab-logistics-class', type: 'class_attendance' }
      ];

      tabs.forEach(t => {
        const el = document.getElementById(t.id);
        if (el) {
          const isActive = state.activeManifestType === t.type;
          if (isActive) {
            el.className = 'manifest-tab-btn touch-btn h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10';
          } else {
            el.className = 'manifest-tab-btn touch-btn h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all glass-panel-subtle text-slate-300 hover:text-white border border-white/5';
          }
        }
      });

    } else {
      // Regular Programs Controls
      // 1. Monthly Intakes
      const intakeContainer = document.getElementById('regular-intake-tabs');
      if (intakeContainer) {
        intakeContainer.innerHTML = '';
        state.data.cohorts.regular.forEach(intake => {
          const isActive = state.activeCohort === intake;
          const btn = document.createElement('button');
          btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
            isActive
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
          }`;
          btn.textContent = intake;
          btn.onclick = () => {
            state.activeCohort = intake;
            renderApp();
          };
          intakeContainer.appendChild(btn);
        });
      }

      // 2. Regular Program Tracks
      const regTrackContainer = document.getElementById('regular-track-pills');
      if (regTrackContainer) {
        regTrackContainer.innerHTML = '';
        const allBtn = document.createElement('button');
        allBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          state.activeTrack === 'all'
            ? 'bg-purple-600 text-white shadow-md'
            : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
        }`;
        allBtn.textContent = 'All Programs';
        allBtn.onclick = () => {
          state.activeTrack = 'all';
          renderApp();
        };
        regTrackContainer.appendChild(allBtn);

        state.data.tracks.regular.forEach(track => {
          const isActive = state.activeTrack === track;
          const btn = document.createElement('button');
          btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
            isActive
              ? 'bg-purple-600 text-white shadow-md'
              : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
          }`;
          btn.textContent = track;
          btn.onclick = () => {
            state.activeTrack = track;
            renderApp();
          };
          regTrackContainer.appendChild(btn);
        });
      }
    }

    // Synchronize Date Inputs
    const bDateInput = document.getElementById('manifest-date-input');
    const rDateInput = document.getElementById('regular-date-input');
    if (bDateInput) bDateInput.value = state.activeDate;
    if (rDateInput) rDateInput.value = state.activeDate;
  }

  // Filter students based on branch, cohort, track, manifest type, and search
  function getFilteredStudents() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    return state.data.students
      .filter(s => {
        // 1. Branch match
        if (s.branch !== state.activeBranch) return false;

        // 2. Cohort match
        if (state.activeCohort && s.cohort !== state.activeCohort) return false;

        // 3. Track match
        if (state.activeTrack !== 'all' && s.track !== state.activeTrack) return false;

        // 4. Manifest Type Filter (Split Daily Logistics for Boot Camp)
        if (isBootcamp) {
          if (state.activeManifestType === 'morning_pickup') {
            // Bus-assigned morning students
            if (s.transport_mode !== 'morning_bus' && s.transport_mode !== 'both') return false;
          } else if (state.activeManifestType === 'evening_dropoff') {
            // Bus-assigned evening students
            if (s.transport_mode !== 'evening_bus' && s.transport_mode !== 'both') return false;
          } else if (state.activeManifestType === 'gate_pickup') {
            // Parent pickup & self arrival
            if (s.transport_mode !== 'parent_pickup' && s.transport_mode !== 'self_arrival') return false;
          }
          // 'class_attendance' includes all enrolled kids in the cohort
        }

        // 5. Search Query Filter
        if (state.searchQuery.trim()) {
          const q = state.searchQuery.toLowerCase().trim();
          const matchName = s.name.toLowerCase().includes(q);
          const matchPhone = s.phone.toLowerCase().includes(q);
          const matchRes = s.residence.toLowerCase().includes(q);
          const matchTrack = s.track.toLowerCase().includes(q);
          if (!matchName && !matchPhone && !matchRes && !matchTrack) return false;
        }

        return true;
      })
      // Sorted Alphabetically (A-Z)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }

  function getStudentStatus(studentId) {
    const key = `${studentId}_${state.activeDate}_${state.activeManifestType}`;
    const log = state.data.manifestLogs.find(
      l => l.student_id === studentId && l.date === state.activeDate && l.type === state.activeManifestType
    );
    return log ? log.status : 'pending';
  }

  function renderManifestTable() {
    const tbody = document.getElementById('manifest-table-body');
    const cardsContainer = document.getElementById('manifest-cards-container');
    const emptyState = document.getElementById('manifest-empty-state');
    const countPill = document.getElementById('manifest-count-pill');
    const headingText = document.getElementById('heading-text');
    const headingIcon = document.getElementById('heading-icon');
    const subheadingText = document.getElementById('manifest-table-subheading');
    const batchActionLabel = document.getElementById('batch-action-label');
    const transportHeaderCols = document.querySelectorAll('.th-transport-col');

    const isBootcamp = state.activeBranch === 'bootcamp';
    const students = getFilteredStudents();

    // Toggle transport column visibility (Excludes transport fields in Regular mode)
    transportHeaderCols.forEach(col => {
      if (isBootcamp && state.activeManifestType !== 'class_attendance') {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    });

    // Configure titles and action labels
    if (isBootcamp) {
      if (state.activeManifestType === 'morning_pickup') {
        headingText.textContent = 'Morning Pick-up Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'Sorted Alphabetically (A–Z) • Filtered for Morning Bus Students';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Picked Up';
      } else if (state.activeManifestType === 'evening_dropoff') {
        headingText.textContent = 'Evening Drop-off Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus-front" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'Sorted Alphabetically (A–Z) • Filtered for Evening Bus Students';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Dropped Off';
      } else if (state.activeManifestType === 'gate_pickup') {
        headingText.textContent = 'Gate / Parent Pick-up Register';
        headingIcon.innerHTML = '<i data-lucide="shield-check" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'Sorted Alphabetically (A–Z) • Parent Pickup & Self-Arrival Log';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Checked In';
      } else {
        headingText.textContent = 'Class Attendance Register (Kids)';
        headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'Sorted Alphabetically (A–Z) • Daily Class Participation';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
      }
    } else {
      headingText.textContent = 'Regular Programs Class Register';
      headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-400"></i>';
      subheadingText.textContent = 'Sorted Alphabetically (A–Z) • Adult & Youth Year-Round Intakes';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
    }

    if (countPill) {
      countPill.textContent = `${students.length} Student${students.length === 1 ? '' : 's'}`;
    }

    if (students.length === 0) {
      if (tbody) tbody.innerHTML = '';
      if (cardsContainer) cardsContainer.innerHTML = '';
      emptyState?.classList.remove('hidden');
      return;
    }

    emptyState?.classList.add('hidden');
    if (tbody) tbody.innerHTML = '';
    if (cardsContainer) cardsContainer.innerHTML = '';

    students.forEach((student, index) => {
      const currentStatus = getStudentStatus(student.id);
      const isCompleted = currentStatus !== 'pending' && currentStatus !== 'absent';

      // Determine label & badge classes based on manifest type
      let actionBtnText = '';
      let activeBadgeClass = '';
      if (state.activeManifestType === 'morning_pickup') {
        actionBtnText = isCompleted ? 'Picked Up' : 'Pick Up';
        activeBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      } else if (state.activeManifestType === 'evening_dropoff') {
        actionBtnText = isCompleted ? 'Dropped Off' : 'Drop Off';
        activeBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      } else if (state.activeManifestType === 'gate_pickup') {
        actionBtnText = isCompleted ? 'Checked In' : 'Check In';
        activeBadgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      } else {
        actionBtnText = isCompleted ? 'Present' : 'Absent';
        activeBadgeClass = isCompleted
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          : 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      }

      // Friendly transport label
      let transportLabel = 'N/A';
      if (student.transport_mode === 'both') transportLabel = '🚌 Morning & Evening Bus';
      else if (student.transport_mode === 'morning_bus') transportLabel = '🚌 Morning Bus Only';
      else if (student.transport_mode === 'evening_bus') transportLabel = '🚍 Evening Bus Only';
      else if (student.transport_mode === 'parent_pickup') transportLabel = '🚗 Parent Pick-up';
      else if (student.transport_mode === 'self_arrival') transportLabel = '🚶 Self Arrival';

      // 1. Cloud School System: Clean Administrative Table Row (Desktop)
      if (tbody) {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/[0.035] transition-colors border-b border-white/5';
        tr.innerHTML = `
          <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-semibold">${index + 1}</td>
          
          <td class="py-3.5 px-4">
            <div class="font-bold text-white flex items-center gap-2">
              <span>${escapeHTML(student.name)}</span>
              ${student.notes ? `<span title="${escapeHTML(student.notes)}" class="cursor-help text-cyan-400 text-xs"><i data-lucide="info" class="w-3.5 h-3.5 inline"></i></span>` : ''}
            </div>
            <div class="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>${escapeHTML(student.cohort)}</span>
            </div>
          </td>

          <td class="py-3.5 px-4">
            <a href="tel:${escapeHTML(student.phone)}" class="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-mono text-xs py-1 px-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 touch-btn" title="Tap to call parent / guardian directly">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span>${escapeHTML(student.phone)}</span>
            </a>
          </td>

          <td class="py-3.5 px-4 text-xs text-slate-300 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400"></i>
              ${escapeHTML(student.residence)}
            </span>
          </td>

          <td class="py-3.5 px-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-200">
              ${escapeHTML(student.track)}
            </span>
          </td>

          ${isBootcamp && state.activeManifestType !== 'class_attendance' ? `
            <td class="py-3.5 px-4 text-xs text-slate-300 th-transport-col">
              <span class="text-[11px] font-semibold text-slate-300">${transportLabel}</span>
            </td>
          ` : ''}

          <td class="py-3.5 px-4 text-center">
            <button data-student-id="${student.id}" class="toggle-status-btn touch-btn h-10 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 mx-auto ${
              isCompleted
                ? 'bg-emerald-500 text-dark-950 shadow-md shadow-emerald-500/25'
                : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/10'
            }">
              <i data-lucide="${isCompleted ? 'check' : 'circle'}" class="w-4 h-4"></i>
              <span>${actionBtnText}</span>
            </button>
          </td>

          <td class="py-3.5 px-4 text-right">
            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-9 h-9 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors inline-flex items-center justify-center" title="Remove student from roster">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }

      // 2. SchoolPass: Rapid-Action Operational Cards Feed (Mobile Viewports)
      if (cardsContainer) {
        const card = document.createElement('div');
        const cardStatusClass = isCompleted ? 'status-completed' : (currentStatus === 'absent' ? 'status-absent' : 'status-pending');
        card.className = `schoolpass-card ${cardStatusClass} rounded-2xl p-4 space-y-3`;
        
        card.innerHTML = `
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-slate-400">#${index + 1}</span>
                <h4 class="font-extrabold text-base text-white">${escapeHTML(student.name)}</h4>
              </div>
              <div class="flex flex-wrap items-center gap-1.5 mt-1">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-cyan-300 border border-white/10">${escapeHTML(student.cohort)}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300 border border-white/5">${escapeHTML(student.track)}</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <span class="badge-status ${isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : (currentStatus === 'absent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40')}">
                <span class="pulse-dot ${isCompleted ? 'bg-emerald-400' : (currentStatus === 'absent' ? 'bg-rose-400' : 'bg-amber-400')}"></span>
                <span>${isCompleted ? actionBtnText.toUpperCase() : (currentStatus === 'absent' ? 'ABSENT' : 'PENDING')}</span>
              </span>
              <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 inline-flex items-center justify-center">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-0.5">
            <div class="flex items-center gap-1.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-cyan-400 shrink-0"></i>
              <span class="truncate font-medium">${escapeHTML(student.residence)}</span>
            </div>
            <a href="tel:${escapeHTML(student.phone)}" class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-mono font-bold hover:bg-cyan-500/25 transition-all">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span class="truncate">${escapeHTML(student.phone)}</span>
            </a>
          </div>

          ${isBootcamp && state.activeManifestType !== 'class_attendance' ? `
            <div class="text-[11px] font-semibold text-slate-300 px-1 flex items-center gap-1.5">
              <span class="text-slate-400">Transport:</span>
              <span class="text-cyan-300 font-bold">${transportLabel}</span>
            </div>
          ` : ''}

          ${student.notes ? `
            <div class="text-xs text-amber-300/90 bg-amber-950/20 border border-amber-500/20 rounded-xl p-2.5 flex items-start gap-1.5">
              <i data-lucide="info" class="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"></i>
              <span>${escapeHTML(student.notes)}</span>
            </div>
          ` : ''}

          <button data-student-id="${student.id}" class="toggle-status-btn touch-btn w-full h-12 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
            isCompleted
              ? 'bg-emerald-500 text-dark-950 shadow-emerald-500/25 active:scale-98'
              : 'glass-panel-interactive border-white/15 text-white hover:bg-white/10 active:scale-98'
          }">
            <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-5 h-5"></i>
            <span>${isCompleted ? `${actionBtnText} (Tap to Toggle)` : `Tap to Mark ${actionBtnText}`}</span>
          </button>
        `;
        cardsContainer.appendChild(card);
      }
    });

    // Wire status toggles
    document.querySelectorAll('.toggle-status-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = btn.getAttribute('data-student-id');
        toggleStudentManifestStatus(studentId);
      });
    });

    // Wire delete buttons
    document.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = btn.getAttribute('data-delete-id');
        deleteStudent(studentId);
      });
    });
  }

  function toggleStudentManifestStatus(studentId) {
    const isBootcamp = state.activeBranch === 'bootcamp';
    const currentStatus = getStudentStatus(studentId);
    let nextStatus = 'pending';

    if (state.activeManifestType === 'morning_pickup') {
      nextStatus = currentStatus === 'picked_up' ? 'pending' : 'picked_up';
    } else if (state.activeManifestType === 'evening_dropoff') {
      nextStatus = currentStatus === 'dropped_off' ? 'pending' : 'dropped_off';
    } else if (state.activeManifestType === 'gate_pickup') {
      nextStatus = currentStatus === 'checked_in' ? 'pending' : 'checked_in';
    } else {
      nextStatus = currentStatus === 'present' ? 'absent' : 'present';
    }

    // Update local state
    const existingIndex = state.data.manifestLogs.findIndex(
      l => l.student_id === studentId && l.date === state.activeDate && l.type === state.activeManifestType
    );

    const logRecord = {
      id: (existingIndex >= 0 ? state.data.manifestLogs[existingIndex].id : crypto.randomUUID ? crypto.randomUUID() : 'log_' + Date.now()),
      student_id: studentId,
      date: state.activeDate,
      type: state.activeManifestType,
      status: nextStatus,
      logged_at: new Date().toISOString(),
      notes: ''
    };

    if (existingIndex >= 0) {
      state.data.manifestLogs[existingIndex] = logRecord;
    } else {
      state.data.manifestLogs.push(logRecord);
    }

    saveStoredData();
    persistManifestLogToSupabase(logRecord);
    renderApp();
  }

  function deleteStudent(studentId) {
    const student = state.data.students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Are you sure you want to remove "${student.name}" from the academy roster?`)) {
      state.data.students = state.data.students.filter(s => s.id !== studentId);
      state.data.manifestLogs = state.data.manifestLogs.filter(l => l.student_id !== studentId);
      saveStoredData();

      if (state.supabaseClient && state.supabaseStatus === 'connected') {
        state.supabaseClient.from('students').delete().eq('id', studentId).then(() => {});
      }

      notify(`Student ${student.name} removed.`, 'info');
      renderApp();
    }
  }

  function updateKPIs() {
    const students = getFilteredStudents();
    const total = students.length;
    let completed = 0;

    students.forEach(s => {
      const st = getStudentStatus(s.id);
      if (st !== 'pending' && st !== 'absent') {
        completed++;
      }
    });

    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const elTotal = document.getElementById('kpi-total');
    const elCompleted = document.getElementById('kpi-completed');
    const elCompletedLabel = document.getElementById('kpi-completed-label');
    const elPending = document.getElementById('kpi-pending');
    const elRate = document.getElementById('kpi-rate');

    if (elTotal) elTotal.textContent = total;
    if (elCompleted) elCompleted.textContent = completed;
    if (elPending) elPending.textContent = pending;
    if (elRate) elRate.textContent = `${rate}%`;

    // Dynamic completed label
    if (elCompletedLabel) {
      if (state.activeManifestType === 'morning_pickup') elCompletedLabel.textContent = 'Picked Up';
      else if (state.activeManifestType === 'evening_dropoff') elCompletedLabel.textContent = 'Dropped Off';
      else if (state.activeManifestType === 'gate_pickup') elCompletedLabel.textContent = 'Checked In';
      else elCompletedLabel.textContent = 'Present';
    }
  }

  // ============================================================================
  // 7. SINGLE-ENTRY ONBOARDING ENGINE
  // ============================================================================

  function initOnboarding() {
    const modal = document.getElementById('modal-onboarding');
    const openBtn = document.getElementById('btn-open-onboarding');
    const emptyOnboardBtn = document.getElementById('btn-empty-onboard');
    const dockAddBtn = document.getElementById('dock-btn-add');
    const closeBtn = document.getElementById('btn-close-onboarding');
    const form = document.getElementById('student-onboarding-form');
    const branchRadios = document.querySelectorAll('input[name="onboard-branch"]');
    const cohortSelect = document.getElementById('onboard-cohort');
    const trackSelect = document.getElementById('onboard-track');
    const transportGroup = document.getElementById('onboard-transport-group');

    function openModal() {
      modal?.classList.remove('hidden');
      populateOnboardingDropdowns();
      document.getElementById('onboard-name')?.focus();
    }

    function closeModal() {
      modal?.classList.add('hidden');
      form?.reset();
    }

    function populateOnboardingDropdowns() {
      const selectedBranch = document.querySelector('input[name="onboard-branch"]:checked')?.value || 'bootcamp';
      
      // Populate cohorts
      if (cohortSelect) {
        cohortSelect.innerHTML = '';
        state.data.cohorts[selectedBranch].forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          cohortSelect.appendChild(opt);
        });
      }

      // Populate tracks
      if (trackSelect) {
        trackSelect.innerHTML = '';
        state.data.tracks[selectedBranch].forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          trackSelect.appendChild(opt);
        });
      }

      // Toggle transport group: only relevant for Boot Camp
      if (transportGroup) {
        if (selectedBranch === 'bootcamp') {
          transportGroup.classList.remove('hidden');
        } else {
          transportGroup.classList.add('hidden');
        }
      }
    }

    openBtn?.addEventListener('click', openModal);
    emptyOnboardBtn?.addEventListener('click', openModal);
    dockAddBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    branchRadios.forEach(radio => {
      radio.addEventListener('change', populateOnboardingDropdowns);
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('onboard-name').value.trim();
      const phone = document.getElementById('onboard-phone').value.trim();
      const residence = document.getElementById('onboard-residence').value.trim();
      const branch = document.querySelector('input[name="onboard-branch"]:checked').value;
      const cohort = document.getElementById('onboard-cohort').value;
      const track = document.getElementById('onboard-track').value;
      const transportMode = branch === 'bootcamp' ? document.getElementById('onboard-transport').value : 'none';
      const notes = document.getElementById('onboard-notes').value.trim();

      if (!name || !phone || !residence) {
        notify('Please fill out student name, phone and residence.', 'error');
        return;
      }

      const newStudent = {
        id: crypto.randomUUID ? crypto.randomUUID() : 'std_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        name: name,
        phone: phone,
        residence: residence,
        branch: branch,
        cohort: cohort,
        track: track,
        transport_mode: transportMode,
        notes: notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Add to state and save
      state.data.students.push(newStudent);
      saveStoredData();

      // Persist to Supabase in real-time
      persistStudentToSupabase(newStudent);

      // Auto-switch view to match student so admin sees it instantly
      state.activeBranch = branch;
      state.activeCohort = cohort;
      state.activeTrack = 'all';

      closeModal();
      renderApp();
      notify(`Student "${name}" registered & propagated in real-time!`, 'success');
    });
  }

  // ============================================================================
  // 8. DYNAMIC COHORT & TRACK CREATION ENGINE
  // ============================================================================

  function initDynamicItemCreator() {
    const modal = document.getElementById('modal-add-item');
    const modalTitle = document.getElementById('modal-add-item-title');
    const modalLabel = document.getElementById('modal-add-item-label');
    const inputName = document.getElementById('input-new-item-name');
    const closeBtn = document.getElementById('btn-close-add-item');
    const cancelBtn = document.getElementById('btn-cancel-add-item');
    const confirmBtn = document.getElementById('btn-confirm-add-item');

    let currentMode = 'track'; // 'track' | 'cohort'

    function openModal(mode) {
      currentMode = mode;
      if (mode === 'track') {
        modalTitle.textContent = `Add Track to ${state.activeBranch === 'bootcamp' ? 'Boot Camp' : 'Regular Programs'}`;
        modalLabel.textContent = 'Track / Program Name';
        inputName.placeholder = 'e.g. Generative AI & Prompt Engineering';
      } else {
        modalTitle.textContent = `Add Intake Cohort to ${state.activeBranch === 'bootcamp' ? 'Boot Camp' : 'Regular Programs'}`;
        modalLabel.textContent = 'Intake Name';
        inputName.placeholder = state.activeBranch === 'bootcamp' ? 'e.g. December Holiday Camp' : 'e.g. July Intake';
      }
      inputName.value = '';
      modal.classList.remove('hidden');
      inputName.focus();
    }

    function closeModal() {
      modal.classList.add('hidden');
    }

    document.getElementById('btn-add-track-bootcamp')?.addEventListener('click', () => openModal('track'));
    document.getElementById('btn-add-track-regular')?.addEventListener('click', () => openModal('track'));
    document.getElementById('btn-add-cohort-bootcamp')?.addEventListener('click', () => openModal('cohort'));
    document.getElementById('btn-add-intake-regular')?.addEventListener('click', () => openModal('cohort'));

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    confirmBtn?.addEventListener('click', () => {
      const name = inputName.value.trim();
      if (!name) return;

      const branch = state.activeBranch;
      if (currentMode === 'track') {
        if (!state.data.tracks[branch].includes(name)) {
          state.data.tracks[branch].push(name);
          saveStoredData();
          notify(`New track "${name}" created!`, 'success');
        }
      } else {
        if (!state.data.cohorts[branch].includes(name)) {
          state.data.cohorts[branch].push(name);
          state.activeCohort = name;
          saveStoredData();
          notify(`New cohort "${name}" created!`, 'success');
        }
      }
      closeModal();
      renderApp();
    });
  }

  // ============================================================================
  // 9. UNIVERSAL EXPORT & PRINT ENGINE (FULLY WIRED)
  // ============================================================================

  function initExportEngine() {
    // 1. 🖨️ Native Print Engine
    const printBtn = document.getElementById('btn-trigger-print');
    const dockPrintBtn = document.getElementById('dock-btn-print');

    function triggerPrint() {
      const students = getFilteredStudents();
      const isBootcamp = state.activeBranch === 'bootcamp';

      // Populate dedicated #print-document container
      document.getElementById('print-doc-date').textContent = 'Date: ' + state.activeDate;
      document.getElementById('print-doc-timestamp').textContent = 'Generated: ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let manifestTitle = 'Daily Class Register';
      if (isBootcamp) {
        if (state.activeManifestType === 'morning_pickup') manifestTitle = 'Morning Pick-up Bus Manifest';
        else if (state.activeManifestType === 'evening_dropoff') manifestTitle = 'Evening Drop-off Bus Manifest';
        else if (state.activeManifestType === 'gate_pickup') manifestTitle = 'Gate & Parent Pick-up Register';
      }
      document.getElementById('print-doc-manifest').textContent = manifestTitle;
      document.getElementById('print-doc-branch').textContent = isBootcamp ? 'Kids Boot Camp (Seasonal)' : 'Regular Programs (Adults/Youth)';
      document.getElementById('print-doc-cohort').textContent = state.activeCohort;
      document.getElementById('print-doc-track').textContent = state.activeTrack === 'all' ? 'All Tracks' : state.activeTrack;

      let completed = 0;
      students.forEach(s => {
        const st = getStudentStatus(s.id);
        if (st !== 'pending' && st !== 'absent') completed++;
      });
      const pending = students.length - completed;
      const rate = students.length > 0 ? Math.round((completed / students.length) * 100) : 0;

      document.getElementById('print-doc-total').textContent = students.length;
      document.getElementById('print-doc-completed').textContent = completed;
      document.getElementById('print-doc-pending').textContent = pending;
      document.getElementById('print-doc-rate').textContent = `${rate}% Verified`;

      const tbody = document.getElementById('print-doc-tbody');
      tbody.innerHTML = '';

      if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #64748b;">No students registered for this manifest.</td></tr>';
      } else {
        students.forEach((s, i) => {
          const st = getStudentStatus(s.id);
          const isDone = st !== 'pending' && st !== 'absent';
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td style="text-align: center; font-weight: bold;">${i + 1}</td>
            <td><strong>${escapeHTML(s.name)}</strong></td>
            <td>${escapeHTML(s.phone)}</td>
            <td>${escapeHTML(s.residence)}</td>
            <td>${escapeHTML(s.track)}</td>
            <td style="text-align: center;">
              <span class="print-badge" style="${isDone ? 'background-color: #e2e8f0;' : ''}">
                ${isDone ? (st.toUpperCase().replace('_', ' ')) : 'PENDING'}
              </span>
            </td>
            <td style="border-bottom: 1px dashed #94a3b8;"></td>
          `;
          tbody.appendChild(tr);
        });
      }

      window.print();
    }

    printBtn?.addEventListener('click', triggerPrint);
    dockPrintBtn?.addEventListener('click', triggerPrint);

    // 2. 📊 CSV / Excel Export Engine
    const csvBtn = document.getElementById('btn-export-csv');
    csvBtn?.addEventListener('click', () => {
      const students = getFilteredStudents();
      if (students.length === 0) {
        notify('No students to export in current manifest.', 'info');
        return;
      }

      const isBootcamp = state.activeBranch === 'bootcamp';
      let manifestName = 'Class_Register';
      if (isBootcamp) {
        if (state.activeManifestType === 'morning_pickup') manifestName = 'Morning_Pickup_Manifest';
        else if (state.activeManifestType === 'evening_dropoff') manifestName = 'Evening_Dropoff_Manifest';
        else if (state.activeManifestType === 'gate_pickup') manifestName = 'Gate_Parent_Pickup_Register';
      }

      const headers = ['Serial', 'Student Name', 'Parent Phone', 'Residence', 'Branch', 'Cohort', 'Track', 'Transport Mode', 'Daily Status', 'Date', 'Notes'];
      const rows = students.map((s, idx) => {
        const status = getStudentStatus(s.id);
        return [
          idx + 1,
          `"${s.name.replace(/"/g, '""')}"`,
          `"${s.phone.replace(/"/g, '""')}"`,
          `"${s.residence.replace(/"/g, '""')}"`,
          s.branch,
          `"${s.cohort.replace(/"/g, '""')}"`,
          `"${s.track.replace(/"/g, '""')}"`,
          s.transport_mode,
          status,
          state.activeDate,
          `"${(s.notes || '').replace(/"/g, '""')}"`
        ];
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Tech_AI_Academy_${manifestName}_${state.activeDate}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notify('Excel / CSV spreadsheet downloaded successfully!', 'success');
    });

    // 3. 📄 Official PDF Export Engine
    const pdfBtn = document.getElementById('btn-export-pdf');
    pdfBtn?.addEventListener('click', () => {
      const students = getFilteredStudents();
      if (students.length === 0) {
        notify('No students to export in current manifest.', 'info');
        return;
      }

      if (!window.jspdf || !window.jspdf.jsPDF) {
        notify('PDF engine initializing, please retry in 2 seconds...', 'info');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');
      const isBootcamp = state.activeBranch === 'bootcamp';

      let manifestTitle = 'Daily Class Attendance Register';
      if (isBootcamp) {
        if (state.activeManifestType === 'morning_pickup') manifestTitle = 'Morning Pick-up Bus Manifest';
        else if (state.activeManifestType === 'evening_dropoff') manifestTitle = 'Evening Drop-off Bus Manifest';
        else if (state.activeManifestType === 'gate_pickup') manifestTitle = 'Gate & Parent Pick-up Register';
      }

      // Executive Header Bar
      doc.setFillColor(15, 23, 42); // #0f172a
      doc.rect(0, 0, 210, 24, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.text('TECH & AI ACADEMY', 14, 11);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(56, 189, 248); // #38bdf8
      doc.text('DAILY OPERATIONS & LOGISTICS PORTAL', 14, 17);

      doc.setFontSize(8.5);
      doc.setTextColor(203, 213, 225);
      doc.text(`Date: ${state.activeDate} | Generated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 196, 15, { align: 'right' });

      // Title & Metadata
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(manifestTitle.toUpperCase(), 14, 34);

      // Metadata Box
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);
      doc.roundedRect(14, 38, 182, 16, 2, 2, 'FD');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(`Branch: ${isBootcamp ? 'Boot Camp (Kids)' : 'Regular Programs'}`, 18, 44);
      doc.text(`Cohort: ${state.activeCohort}`, 80, 44);
      doc.text(`Track: ${state.activeTrack === 'all' ? 'All Tracks' : state.activeTrack}`, 140, 44);

      let completed = 0;
      students.forEach(s => {
        const st = getStudentStatus(s.id);
        if (st !== 'pending' && st !== 'absent') completed++;
      });
      const rate = students.length > 0 ? Math.round((completed / students.length) * 100) : 0;
      doc.text(`Total Roster: ${students.length}`, 18, 50);
      doc.text(`Verified: ${completed} (${rate}%)`, 80, 50);
      doc.text(`Pending: ${students.length - completed}`, 140, 50);

      // Table Generation via autoTable
      const tableRows = students.map((s, idx) => {
        const status = getStudentStatus(s.id);
        const isDone = status !== 'pending' && status !== 'absent';
        return [
          idx + 1,
          s.name,
          s.phone,
          s.residence,
          s.track,
          isDone ? status.toUpperCase().replace('_', ' ') : 'PENDING',
          '' // Empty for signature
        ];
      });

      doc.autoTable({
        startY: 58,
        head: [['#', 'Student Name', 'Parent Phone', 'Residence', 'Track', 'Status', 'Sign-off']],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [15, 23, 42],
          textColor: [255, 255, 255],
          fontSize: 9,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 8.5,
          textColor: [30, 41, 59]
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 42, fontStyle: 'bold' },
          2: { cellWidth: 32 },
          3: { cellWidth: 30 },
          4: { cellWidth: 32 },
          5: { cellWidth: 20, halign: 'center' },
          6: { cellWidth: 16 }
        },
        margin: { left: 14, right: 14 },
        didDrawPage: (data) => {
          // Footer
          doc.setFontSize(8);
          doc.setTextColor(148, 163, 184);
          doc.text(
            `Official Record of Tech & AI Academy - Operations Portal &bull; Page ${data.pageNumber}`,
            14,
            290
          );
        }
      });

      doc.save(`Tech_AI_Academy_${manifestTitle.replace(/\s+/g, '_')}_${state.activeDate}.pdf`);
      notify('Official PDF manifest generated & downloaded!', 'success');
    });

    // 4. Batch Actions Engine
    const batchBtn = document.getElementById('btn-batch-action');
    batchBtn?.addEventListener('click', () => {
      const students = getFilteredStudents();
      if (students.length === 0) return;

      let targetStatus = 'picked_up';
      if (state.activeManifestType === 'evening_dropoff') targetStatus = 'dropped_off';
      else if (state.activeManifestType === 'gate_pickup') targetStatus = 'checked_in';
      else if (state.activeManifestType === 'class_attendance') targetStatus = 'present';

      students.forEach(s => {
        const existingIndex = state.data.manifestLogs.findIndex(
          l => l.student_id === s.id && l.date === state.activeDate && l.type === state.activeManifestType
        );
        const record = {
          id: (existingIndex >= 0 ? state.data.manifestLogs[existingIndex].id : crypto.randomUUID ? crypto.randomUUID() : 'log_' + Date.now()),
          student_id: s.id,
          date: state.activeDate,
          type: state.activeManifestType,
          status: targetStatus,
          logged_at: new Date().toISOString(),
          notes: ''
        };
        if (existingIndex >= 0) {
          state.data.manifestLogs[existingIndex] = record;
        } else {
          state.data.manifestLogs.push(record);
        }
        persistManifestLogToSupabase(record);
      });

      saveStoredData();
      renderApp();
      notify(`All ${students.length} students marked ${targetStatus.replace('_', ' ')}!`, 'success');
    });

    // 5. Reset Current Manifest
    const resetBtn = document.getElementById('btn-reset-manifest');
    resetBtn?.addEventListener('click', () => {
      const students = getFilteredStudents();
      if (students.length === 0) return;

      if (confirm(`Reset status for all students in this manifest today (${state.activeDate})?`)) {
        const studentIds = new Set(students.map(s => s.id));
        state.data.manifestLogs = state.data.manifestLogs.filter(
          l => !(studentIds.has(l.student_id) && l.date === state.activeDate && l.type === state.activeManifestType)
        );
        saveStoredData();
        renderApp();
        notify('Manifest status reset to Pending.', 'info');
      }
    });
  }

  // ============================================================================
  // 10. SEARCH & DATE CONTROLS
  // ============================================================================

  function initSearchAndDateControls() {
    // Search input
    const searchInput = document.getElementById('manifest-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderManifestTable();
        updateKPIs();
        if (window.lucide) window.lucide.createIcons();
      });
    }

    // Day buttons (Mon-Fri)
    const dayBtns = document.querySelectorAll('.day-selector-btn');
    const dayMap = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5 };

    dayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const dayStr = btn.getAttribute('data-day');
        const targetWeekday = dayMap[dayStr];
        
        // Calculate date of current week's target weekday
        const now = new Date();
        const currentWeekday = now.getDay(); // 0 is Sunday, 1 is Monday...
        const diff = targetWeekday - (currentWeekday === 0 ? 7 : currentWeekday);
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + diff);

        state.activeDate = targetDate.toISOString().split('T')[0];
        
        dayBtns.forEach(b => b.classList.remove('bg-cyan-500', 'text-dark-950'));
        btn.classList.add('bg-cyan-500', 'text-dark-950');

        renderApp();
      });
    });

    // Date inputs
    const bDateInput = document.getElementById('manifest-date-input');
    const rDateInput = document.getElementById('regular-date-input');

    [bDateInput, rDateInput].forEach(inp => {
      inp?.addEventListener('change', (e) => {
        if (e.target.value) {
          state.activeDate = e.target.value;
          renderApp();
        }
      });
    });
  }

  // ============================================================================
  // 11. SUPABASE SETTINGS & BACKUP ENGINE
  // ============================================================================

  function initSettingsModal() {
    const modal = document.getElementById('modal-settings');
    const openBtn = document.getElementById('btn-open-settings');
    const dockBtn = document.getElementById('dock-btn-settings');
    const closeBtn = document.getElementById('btn-close-settings');
    const saveBtn = document.getElementById('btn-save-settings');
    const testBtn = document.getElementById('btn-test-supabase');
    const urlInput = document.getElementById('setting-supabase-url');
    const keyInput = document.getElementById('setting-supabase-key');
    const exportBackupBtn = document.getElementById('btn-export-backup-json');
    const clearDataBtn = document.getElementById('btn-clear-all-data');

    // Load saved or default settings
    try {
      const cfg = JSON.parse(localStorage.getItem(SUPABASE_CONFIG_KEY) || '{}');
      if (urlInput) urlInput.value = cfg.url || DEFAULT_SUPABASE_CONFIG.url;
      if (keyInput) keyInput.value = cfg.key || DEFAULT_SUPABASE_CONFIG.key;
    } catch (e) {
      if (urlInput) urlInput.value = DEFAULT_SUPABASE_CONFIG.url;
      if (keyInput) keyInput.value = DEFAULT_SUPABASE_CONFIG.key;
    }

    function openModal() {
      modal?.classList.remove('hidden');
    }

    function closeModal() {
      modal?.classList.add('hidden');
    }

    openBtn?.addEventListener('click', openModal);
    dockBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    saveBtn?.addEventListener('click', () => {
      const url = urlInput.value.trim();
      const key = keyInput.value.trim();

      localStorage.setItem(SUPABASE_CONFIG_KEY, JSON.stringify({ url, key }));
      if (url && key && window.supabase) {
        state.supabaseClient = window.supabase.createClient(url, key);
        testSupabaseConnection(true);
      } else {
        state.supabaseClient = null;
        updateSupabaseStatus('local');
        notify('Operating in LocalStorage Mode.', 'info');
      }
      closeModal();
    });

    testBtn?.addEventListener('click', async () => {
      const url = urlInput.value.trim();
      const key = keyInput.value.trim();
      if (!url || !key) {
        notify('Please enter both Supabase Project URL and Anon API Key.', 'error');
        return;
      }
      if (window.supabase) {
        state.supabaseClient = window.supabase.createClient(url, key);
        await testSupabaseConnection(true);
      }
    });

    // Backup JSON download
    exportBackupBtn?.addEventListener('click', () => {
      const jsonStr = JSON.stringify(state.data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tech_AI_Academy_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify('JSON Backup downloaded!', 'success');
    });

    // Clear all data
    clearDataBtn?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all local roster data? This resets all students and manifest logs.')) {
        state.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveStoredData();
        renderApp();
        notify('All local data cleared to clean state.', 'info');
        closeModal();
      }
    });
  }

  // ============================================================================
  // 12. BRANCH SWITCHING & LOGISTICS TABS
  // ============================================================================

  function initBranchAndTabListeners() {
    // Desktop Branch Switchers
    document.getElementById('branch-nav-bootcamp')?.addEventListener('click', () => {
      state.activeBranch = 'bootcamp';
      state.activeCohort = state.data.cohorts.bootcamp[0] || 'August Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'morning_pickup';
      renderApp();
    });

    document.getElementById('branch-nav-regular')?.addEventListener('click', () => {
      state.activeBranch = 'regular';
      state.activeCohort = state.data.cohorts.regular[0] || 'January Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'class_attendance';
      renderApp();
    });

    // Mobile Branch Switchers
    document.getElementById('mobile-branch-bootcamp')?.addEventListener('click', () => {
      state.activeBranch = 'bootcamp';
      state.activeCohort = state.data.cohorts.bootcamp[0] || 'August Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'morning_pickup';
      renderApp();
    });

    document.getElementById('mobile-branch-regular')?.addEventListener('click', () => {
      state.activeBranch = 'regular';
      state.activeCohort = state.data.cohorts.regular[0] || 'January Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'class_attendance';
      renderApp();
    });

    // Dock Switchers
    document.getElementById('dock-btn-bootcamp')?.addEventListener('click', () => {
      state.activeBranch = 'bootcamp';
      state.activeCohort = state.data.cohorts.bootcamp[0] || 'August Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'morning_pickup';
      renderApp();
    });

    document.getElementById('dock-btn-regular')?.addEventListener('click', () => {
      state.activeBranch = 'regular';
      state.activeCohort = state.data.cohorts.regular[0] || 'January Intake';
      state.activeTrack = 'all';
      state.activeManifestType = 'class_attendance';
      renderApp();
    });

    // Boot Camp Logistics Sub-Tabs
    document.getElementById('tab-logistics-morning')?.addEventListener('click', () => {
      state.activeManifestType = 'morning_pickup';
      renderApp();
    });

    document.getElementById('tab-logistics-evening')?.addEventListener('click', () => {
      state.activeManifestType = 'evening_dropoff';
      renderApp();
    });

    document.getElementById('tab-logistics-gate')?.addEventListener('click', () => {
      state.activeManifestType = 'gate_pickup';
      renderApp();
    });

    document.getElementById('tab-logistics-class')?.addEventListener('click', () => {
      state.activeManifestType = 'class_attendance';
      renderApp();
    });
  }

  // ============================================================================
  // 13. TOAST NOTIFICATION UTILITY
  // ============================================================================

  function notify(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const isError = type === 'error';

    toast.className = `p-3.5 px-4 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2.5 max-w-sm pointer-events-auto transition-all transform duration-300 translate-y-2 opacity-0 ${
      isSuccess
        ? 'bg-emerald-950/90 text-emerald-200 border border-emerald-500/40'
        : isError
        ? 'bg-rose-950/90 text-rose-200 border border-rose-500/40'
        : 'bg-dark-900/90 text-cyan-200 border border-cyan-500/40'
    }`;

    const iconName = isSuccess ? 'check-circle' : isError ? 'alert-triangle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 shrink-0"></i>
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ============================================================================
  // 14. APPLICATION BOOTSTRAP
  // ============================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initBackgroundSlideshow();
    initPWA();
    initLogoCustomizer();
    initBranchAndTabListeners();
    initSearchAndDateControls();
    initOnboarding();
    initDynamicItemCreator();
    initExportEngine();
    initSettingsModal();
    initSupabase();

    renderApp();
  });

})();
