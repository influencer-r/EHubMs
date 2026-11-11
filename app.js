const ELDOHUB_LOGO_DATA_URL = "data:image/png;base64,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";
/**
 * ==============================================================================
 * Tech & AI Academy - Operations & Fleet Management System
 * Hybrid Architecture Engine: SchoolPass (Dismissal/Carline) x Cloud School System
 * ==============================================================================
 */

(function () {
  'use strict';

  // ============================================================================
  // 1. STORAGE KEYS & CONSTANTS
  // ============================================================================

  const STORAGE_KEY = 'tech_ai_academy_data_v1';
  const LOGO_STORAGE_KEY = 'tech_ai_academy_logo_v1';
  const SUPABASE_CONFIG_KEY = 'tech_ai_academy_supabase_cfg_v1';

  // Pre-configured Supabase PostgreSQL Credentials
  const DEFAULT_SUPABASE_CONFIG = {
    url: 'https://sopqoumqblhtguprgtwx.supabase.co',
    key: 'sb_publishable_zPJ4Fguz3X4SnLavQpurRg_lUMxf_BO'
  };

  // Clean initial state (Zero hardcoded dummy names)
  const DEFAULT_STATE = {
    students: [],
    manifestLogs: [],
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

  // Runtime State
  const state = {
    activeBranch: 'bootcamp', // 'bootcamp' or 'regular'
    activeCohort: 'August Intake',
    activeTrack: 'all',
    activeManifestType: 'morning_pickup', // 'morning_pickup' | 'evening_dropoff' | 'gate_pickup' | 'class_attendance'
    activeDate: new Date().toISOString().split('T')[0],
    searchQuery: '',
    viewMode: window.innerWidth < 768 ? 'cards' : 'table', // 'table' (Cloud School) | 'cards' (SchoolPass)
    sidebarCollapsed: false,
    data: loadStoredData(),
    supabaseClient: null,
    supabaseStatus: 'local', // 'local' | 'connected' | 'error' | 'schema_needed'
    deferredPrompt: null
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
  // 2. SUPABASE BACKEND SYNCHRONIZATION
  // ============================================================================

  function initSupabase() {
    try {
      let config = null;
      const configStr = localStorage.getItem(SUPABASE_CONFIG_KEY);
      if (configStr) {
        config = JSON.parse(configStr);
      }
      
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
      if (showToast) notify('Operating in LocalStorage Mode', 'info');
      return false;
    }

    try {
      updateSupabaseStatus('connecting');
      const { data, error } = await state.supabaseClient
        .from('students')
        .select('id')
        .limit(1);

      if (error) {
        if (error.code === 'PGRST205' || error.message?.includes('schema cache') || error.message?.includes('does not exist')) {
          updateSupabaseStatus('schema_needed');
          if (showToast) notify('Connected to Supabase Project! Please run supabase-schema.sql in SQL Editor.', 'info');
          return false;
        }
        throw error;
      }

      updateSupabaseStatus('connected');
      if (showToast) notify('Connected to Supabase PostgreSQL Database!', 'success');
      
      syncWithSupabase();
      return true;
    } catch (err) {
      console.error('Supabase connection error:', err);
      updateSupabaseStatus('error');
      if (showToast) notify('Supabase connection failed: ' + (err.message || 'Check URL/Key'), 'error');
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
    const sidebarDot = document.getElementById('sidebar-db-dot');
    const sidebarLabel = document.getElementById('sidebar-status-label');
    const indicator = document.getElementById('settings-status-indicator');
    const statusText = document.getElementById('settings-status-text');

    if (status === 'connected') {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-emerald-400 shrink-0';
      if (sidebarLabel) sidebarLabel.textContent = 'PostgreSQL Connected';
      if (indicator) indicator.className = 'w-3 h-3 rounded-full bg-emerald-400';
      if (statusText) {
        statusText.textContent = 'Supabase Cloud: Connected & Syncing';
        statusText.className = 'text-xs font-bold text-emerald-400';
      }
    } else if (status === 'schema_needed') {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-cyan-400 shrink-0';
      if (sidebarLabel) sidebarLabel.textContent = 'Run Schema in SQL Editor';
      if (indicator) indicator.className = 'w-3 h-3 rounded-full bg-cyan-400';
      if (statusText) {
        statusText.textContent = 'Supabase Connected (Run schema in SQL editor)';
        statusText.className = 'text-xs font-bold text-cyan-300';
      }
    } else if (status === 'error') {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-rose-500';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-rose-500 shrink-0';
      if (sidebarLabel) sidebarLabel.textContent = 'Database Error';
      if (indicator) indicator.className = 'w-3 h-3 rounded-full bg-rose-500';
      if (statusText) {
        statusText.textContent = 'Supabase Cloud: Connection Error';
        statusText.className = 'text-xs font-bold text-rose-400';
      }
    } else {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-amber-400';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-amber-400 shrink-0';
      if (sidebarLabel) sidebarLabel.textContent = 'LocalStorage Mode';
      if (indicator) indicator.className = 'w-3 h-3 rounded-full bg-amber-400';
      if (statusText) {
        statusText.textContent = 'LocalStorage Mode (Offline Ready)';
        statusText.className = 'text-xs font-bold text-amber-400';
      }
    }
  }

  // ============================================================================
  // 3. DYNAMIC BACKGROUND SLIDESHOW (3-SECOND KEN BURNS CYCLE)
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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('Service Worker registered for offline use:', reg.scope))
          .catch(err => console.warn('Service Worker registration skipped:', err));
      });
    }

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
          notify('To install: tap your browser Share button (⎋) and select "Add to Home Screen" 📲', 'info');
        }
      });
    }
  }

  // ============================================================================
  // 5. BRANDING & LOGO CUSTOMIZER
  // ============================================================================

  function initLogoCustomizer() {
    const logoTriggers = [
      document.getElementById('sidebar-logo-trigger')
    ];
    const logoModal = document.getElementById('modal-logo');
    const closeLogoModalBtn = document.getElementById('btn-close-logo-modal');
    const logoFileInput = document.getElementById('input-logo-file');
    const logoPreviewImg = document.getElementById('logo-preview-img');
    const saveLogoBtn = document.getElementById('btn-save-logo');
    const resetLogoBtn = document.getElementById('btn-reset-logo');
    const academyLogoImg = document.getElementById('academy-logo-img');

    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo && academyLogoImg) {
      academyLogoImg.src = savedLogo;
      if (logoPreviewImg) logoPreviewImg.src = savedLogo;
    }

    logoTriggers.forEach(trigger => {
      trigger?.addEventListener('click', () => {
        logoModal?.classList.remove('hidden');
      });
    });

    closeLogoModalBtn?.addEventListener('click', () => {
      logoModal?.classList.add('hidden');
    });

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

    saveLogoBtn?.addEventListener('click', () => {
      if (tempLogoData) {
        localStorage.setItem(LOGO_STORAGE_KEY, tempLogoData);
        if (academyLogoImg) academyLogoImg.src = tempLogoData;
        notify('Academy logo updated successfully!', 'success');
      }
      logoModal?.classList.add('hidden');
    });

    resetLogoBtn?.addEventListener('click', () => {
      localStorage.removeItem(LOGO_STORAGE_KEY);
      if (academyLogoImg) academyLogoImg.src = './icons/icon.svg';
      if (logoPreviewImg) logoPreviewImg.src = './icons/icon.svg';
      tempLogoData = null;
      notify('Reset to official Academy logo icon.', 'info');
      logoModal?.classList.add('hidden');
    });
  }

  // ============================================================================
  // 6. UI RENDERING & COMPONENT ORCHESTRATION
  // ============================================================================

  function renderApp() {
    renderNavigation();
    renderBranchControls();
    renderManifestTable();
        updateKPIs();
    updateSidebarBadges();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  
  function renderNavigation() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    // Sidebar Campus/Branch Switcher buttons
    const btnBootcamp = document.getElementById('branch-nav-bootcamp');
    const btnRegular = document.getElementById('branch-nav-regular');
    // Mobile dock buttons
    const dockBootcamp = document.getElementById('dock-btn-bootcamp');
    const dockRegular = document.getElementById('dock-btn-regular');

    if (isBootcamp) {
      btnBootcamp?.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnBootcamp?.classList.remove('text-slate-400');
      btnRegular?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnRegular?.classList.add('text-slate-400');

      dockBootcamp?.classList.add('text-cyan-400');
      dockBootcamp?.classList.remove('text-slate-400');
      dockRegular?.classList.remove('text-cyan-400');
      dockRegular?.classList.add('text-slate-400');
    } else {
      btnRegular?.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-indigo-600', 'text-white', 'shadow-md');
      btnRegular?.classList.remove('text-slate-400');
      btnBootcamp?.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md');
      btnBootcamp?.classList.add('text-slate-400');

      dockRegular?.classList.add('text-cyan-400');
      dockRegular?.classList.remove('text-slate-400');
      dockBootcamp?.classList.remove('text-cyan-400');
      dockBootcamp?.classList.add('text-slate-400');
    }

    // Update Top View Title & Subheading
    const topTitle = document.getElementById('top-view-title');
    const topBranchPill = document.getElementById('top-branch-pill');

    if (topBranchPill) {
      topBranchPill.textContent = isBootcamp ? 'Boot Camp' : 'Regular Programs';
      topBranchPill.className = isBootcamp
        ? 'hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
        : 'hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30';
    }

    if (topTitle) {
      if (state.activeManifestType === 'morning_pickup') topTitle.textContent = 'Morning Pick-up Bus Manifest';
      else if (state.activeManifestType === 'evening_dropoff') topTitle.textContent = 'Evening Drop-off Bus Manifest';
      else if (state.activeManifestType === 'gate_pickup') topTitle.textContent = 'Gate & Carline Dismissal Register';
      else topTitle.textContent = 'Class Attendance Register';
    }

    // Highlight active sidebar navigation item
    const navItems = [
      { id: 'tab-logistics-morning', type: 'morning_pickup' },
      { id: 'tab-logistics-evening', type: 'evening_dropoff' },
      { id: 'tab-logistics-gate', type: 'gate_pickup' },
      { id: 'tab-logistics-class', type: 'class_attendance' }
    ];

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        if (state.activeManifestType === item.type) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });
  }

  function updateSidebarBadges() {
    const isBootcamp = state.activeBranch === 'bootcamp';
    const students = state.data.students.filter(s => s.branch === state.activeBranch && (!state.activeCohort || s.cohort === state.activeCohort));

    const morningCount = students.filter(s => s.transport_mode === 'morning_bus' || s.transport_mode === 'both').length;
    const eveningCount = students.filter(s => s.transport_mode === 'evening_bus' || s.transport_mode === 'both').length;
    const gateCount = students.filter(s => s.transport_mode === 'parent_pickup' || s.transport_mode === 'self_arrival').length;
    const classCount = students.length;

    const bMorning = document.getElementById('badge-nav-morning');
    const bEvening = document.getElementById('badge-nav-evening');
    const bGate = document.getElementById('badge-nav-gate');
    const bClass = document.getElementById('badge-nav-class');

    if (bMorning) bMorning.textContent = morningCount;
    if (bEvening) bEvening.textContent = eveningCount;
    if (bGate) bGate.textContent = gateCount;
    if (bClass) bClass.textContent = classCount;
  }

  function renderBranchControls() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    // 1. Unified Cohort / Stream Switcher Container
    const cohortContainer = document.getElementById('cohort-switcher-container');
    if (cohortContainer) {
      cohortContainer.innerHTML = '';
      const cohorts = state.data.cohorts[state.activeBranch] || [];
      cohorts.forEach(cohort => {
        const isActive = state.activeCohort === cohort;
        const btn = document.createElement('button');
        btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          isActive
            ? (isBootcamp ? 'bg-sky-600 text-white shadow-sm' : 'bg-indigo-600 text-white shadow-sm')
            : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
        }`;
        btn.textContent = cohort;
        btn.onclick = () => {
          state.activeCohort = cohort;
          renderApp();
        };
        cohortContainer.appendChild(btn);
      });
    }

    // 2. Unified Track Pills Container
    const trackContainer = document.getElementById('track-pills-container');
    if (trackContainer) {
      trackContainer.innerHTML = '';
      
      const allBtn = document.createElement('button');
      allBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
        state.activeTrack === 'all'
          ? (isBootcamp ? 'bg-indigo-600 text-white shadow-sm' : 'bg-purple-600 text-white shadow-sm')
          : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
      }`;
      allBtn.textContent = 'All Tracks';
      allBtn.onclick = () => {
        state.activeTrack = 'all';
        renderApp();
      };
      trackContainer.appendChild(allBtn);

      const tracks = state.data.tracks[state.activeBranch] || [];
      tracks.forEach(track => {
        const isActive = state.activeTrack === track;
        const btn = document.createElement('button');
        btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          isActive
            ? (isBootcamp ? 'bg-indigo-600 text-white shadow-sm' : 'bg-purple-600 text-white shadow-sm')
            : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
        }`;
        btn.textContent = track;
        btn.onclick = () => {
          state.activeTrack = track;
          renderApp();
        };
        trackContainer.appendChild(btn);
      });
    }

    // Sync Date Input
    const dateInput = document.getElementById('manifest-date-input');
    if (dateInput) dateInput.value = state.activeDate;
  }

  // Filter students based on branch, cohort, track, manifest type, and search
  function getFilteredStudents() {
    const isBootcamp = state.activeBranch === 'bootcamp';

    return state.data.students
      .filter(s => {
        if (s.branch !== state.activeBranch) return false;
        if (state.activeCohort && s.cohort !== state.activeCohort) return false;
        if (state.activeTrack !== 'all' && s.track !== state.activeTrack) return false;

        if (isBootcamp) {
          if (state.activeManifestType === 'morning_pickup') {
            if (s.transport_mode !== 'morning_bus' && s.transport_mode !== 'both') return false;
          } else if (state.activeManifestType === 'evening_dropoff') {
            if (s.transport_mode !== 'evening_bus' && s.transport_mode !== 'both') return false;
          } else if (state.activeManifestType === 'gate_pickup') {
            if (s.transport_mode !== 'parent_pickup' && s.transport_mode !== 'self_arrival') return false;
          }
        }

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
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }

  function getStudentStatus(studentId) {
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

    transportHeaderCols.forEach(col => {
      if (isBootcamp && state.activeManifestType !== 'class_attendance') {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    });

    if (isBootcamp) {
      if (state.activeManifestType === 'morning_pickup') {
        headingText.textContent = 'Morning Pick-up Bus Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'SchoolPass Live Fleet Operations • Sorted Alphabetically (A–Z)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Picked Up';
      } else if (state.activeManifestType === 'evening_dropoff') {
        headingText.textContent = 'Evening Drop-off Bus Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus-front" class="w-5 h-5 text-cyan-400"></i>';
        subheadingText.textContent = 'SchoolPass Dismissal Boarding • Sorted Alphabetically (A–Z)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Dropped Off';
      } else if (state.activeManifestType === 'gate_pickup') {
        headingText.textContent = 'Gate / Parent Carline Register';
        headingIcon.innerHTML = '<i data-lucide="shield-check" class="w-5 h-5 text-emerald-400"></i>';
        subheadingText.textContent = 'SchoolPass Carline Queue & Self-Arrival Log • Sorted Alphabetically (A–Z)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Checked In';
      } else {
        headingText.textContent = 'Class Attendance Register (Kids)';
        headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-400"></i>';
        subheadingText.textContent = 'Cloud School System Daily Class Roster • Sorted Alphabetically (A–Z)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
      }
    } else {
      headingText.textContent = 'Regular Programs Class Register';
      headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-400"></i>';
      subheadingText.textContent = 'Cloud School System Academic Roster • Adult & Youth Intakes';
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

      let actionBtnText = '';
      if (state.activeManifestType === 'morning_pickup') actionBtnText = isCompleted ? 'Picked Up' : 'Pick Up';
      else if (state.activeManifestType === 'evening_dropoff') actionBtnText = isCompleted ? 'Dropped Off' : 'Drop Off';
      else if (state.activeManifestType === 'gate_pickup') actionBtnText = isCompleted ? 'Checked In' : 'Check In';
      else actionBtnText = isCompleted ? 'Present' : 'Absent';

      let transportLabel = 'N/A';
      let routeCode = 'LOCAL';
      if (student.transport_mode === 'both') {
        transportLabel = 'Morning & Evening Bus';
        routeCode = 'BUS RT-01';
      } else if (student.transport_mode === 'morning_bus') {
        transportLabel = 'Morning Bus Only';
        routeCode = 'BUS AM-01';
      } else if (student.transport_mode === 'evening_bus') {
        transportLabel = 'Evening Bus Only';
        routeCode = 'BUS PM-01';
      } else if (student.transport_mode === 'parent_pickup') {
        transportLabel = 'Parent Gate Carline';
        routeCode = 'CARLINE-GATE';
      } else if (student.transport_mode === 'self_arrival') {
        transportLabel = 'Self Arrival / Walker';
        routeCode = 'WALKER';
      }

      // 1. Cloud School System: Clean Administrative Data Table Row
      if (tbody) {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';
        tr.innerHTML = `
          <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-bold">${index + 1}</td>
          
          <td class="py-3.5 px-4">
            <div class="font-extrabold text-slate-900 flex items-center gap-2">
              <span>${escapeHTML(student.name)}</span>
              ${student.notes ? `<span title="${escapeHTML(student.notes)}" class="cursor-help text-sky-600 text-xs"><i data-lucide="info" class="w-3.5 h-3.5 inline"></i></span>` : ''}
            </div>
            <div class="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-semibold">
              <span>${escapeHTML(student.cohort)}</span>
            </div>
          </td>

          <td class="py-3.5 px-4">
            <a href="tel:${escapeHTML(student.phone)}" class="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-800 font-mono text-xs py-1 px-2.5 rounded-lg bg-sky-50 border border-sky-200 touch-btn font-semibold hover:bg-sky-100 transition-colors" title="Call Guardian">
              <i data-lucide="phone" class="w-3 h-3 text-sky-600"></i>
              <span>${escapeHTML(student.phone)}</span>
            </a>
          </td>

          <td class="py-3.5 px-4 text-xs text-slate-600 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              ${escapeHTML(student.residence)}
            </span>
          </td>

          <td class="py-3.5 px-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700">
              ${escapeHTML(student.track)}
            </span>
          </td>

          ${isBootcamp && state.activeManifestType !== 'class_attendance' ? `
            <td class="py-3.5 px-4 text-xs text-slate-700 th-transport-col">
              <span class="route-badge bg-sky-50 text-sky-700 border border-sky-200">
                ${routeCode}
              </span>
            </td>
          ` : ''}

          <td class="py-3.5 px-4 text-center">
            <button data-student-id="${student.id}" class="toggle-status-btn touch-btn h-10 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 mx-auto ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-2 border-slate-200 shadow-sm'
            }">
              <i data-lucide="${isCompleted ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
              <span>${actionBtnText}</span>
            </button>
          </td>

          <td class="py-3.5 px-4 text-right">
            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-9 h-9 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center" title="Remove student">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }

      // 2. SchoolPass: Rapid-Action Operational Cards Grid
      if (cardsContainer) {
        const card = document.createElement('div');
        const cardStatusClass = isCompleted ? 'status-completed' : (currentStatus === 'absent' ? 'status-absent' : 'status-pending');
        card.className = `schoolpass-card ${cardStatusClass} p-4 sm:p-5 space-y-3.5`;
        
        card.innerHTML = `
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center font-bold text-sm text-sky-700 shrink-0">
                ${escapeHTML(student.name.charAt(0))}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-bold text-slate-400">#${index + 1}</span>
                  <h4 class="font-extrabold text-base text-slate-900 tracking-tight">${escapeHTML(student.name)}</h4>
                </div>
                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">${escapeHTML(student.cohort)}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">${escapeHTML(student.track)}</span>
                </div>
              </div>
            </div>

            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-8 h-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-flex items-center justify-center shrink-0">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
            <div class="route-badge bg-sky-50 text-sky-700 border border-sky-200">
              <i data-lucide="navigation" class="w-3 h-3 text-sky-600"></i>
              <span>${routeCode} &bull; ${transportLabel}</span>
            </div>

            <span class="badge-status ${isCompleted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : (currentStatus === 'absent' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-amber-100 text-amber-800 border border-amber-300')}">
              <span class="pulse-dot ${isCompleted ? 'bg-emerald-500' : (currentStatus === 'absent' ? 'bg-rose-500' : 'bg-amber-500')}"></span>
              <span>${isCompleted ? actionBtnText.toUpperCase() : (currentStatus === 'absent' ? 'ABSENT' : 'PENDING')}</span>
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="flex items-center gap-1.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span class="truncate font-medium">${escapeHTML(student.residence)}</span>
            </div>
            <a href="tel:${escapeHTML(student.phone)}" class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 font-mono font-bold hover:bg-sky-100 transition-all">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-sky-600"></i>
              <span class="truncate">${escapeHTML(student.phone)}</span>
            </a>
          </div>

          ${student.notes ? `
            <div class="text-xs text-amber-900 bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-1.5 font-medium">
              <i data-lucide="info" class="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5"></i>
              <span>${escapeHTML(student.notes)}</span>
            </div>
          ` : ''}

          <!-- SchoolPass Large Rapid Action Verification Switch -->
          <button data-student-id="${student.id}" class="toggle-status-btn touch-btn w-full h-12 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 active:scale-98'
              : 'bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 active:scale-98'
          }">
            <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-5 h-5"></i>
            <span>${isCompleted ? `${actionBtnText} (Verified - Tap to Undo)` : `Tap to Verify ${actionBtnText}`}</span>
          </button>
        `;
        cardsContainer.appendChild(card);
      }
    });

    // Wire status toggles
    document.querySelectorAll('.toggle-status-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        toggleStudentManifestStatus(studentId);
      });
    });

    // Wire delete buttons
    document.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-delete-id');
        deleteStudent(studentId);
      });
    });
  }

  function setStudentManifestStatus(studentId, targetStatus) {
    const existingIndex = state.data.manifestLogs.findIndex(
      l => l.student_id === studentId && l.date === state.activeDate && l.type === state.activeManifestType
    );

    const logRecord = {
      id: (existingIndex >= 0 ? state.data.manifestLogs[existingIndex].id : crypto.randomUUID ? crypto.randomUUID() : 'log_' + Date.now()),
      student_id: studentId,
      date: state.activeDate,
      type: state.activeManifestType,
      status: targetStatus,
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

  function renderManifestTable() {
    const tbody = document.getElementById('manifest-table-body');
    const emptyState = document.getElementById('manifest-empty-state');
    const countPill = document.getElementById('manifest-count-pill');
    const headingText = document.getElementById('heading-text');
    const headingIcon = document.getElementById('heading-icon');
    const subheadingText = document.getElementById('manifest-table-subheading');
    const batchActionLabel = document.getElementById('batch-action-label');
    const transportHeaderCols = document.querySelectorAll('.th-transport-col');
    const thChecklistCol = document.getElementById('th-checklist-col');

    const isBootcamp = state.activeBranch === 'bootcamp';
    const isAttendance = state.activeManifestType === 'class_attendance';
    const students = getFilteredStudents();

    transportHeaderCols.forEach(col => {
      if (isBootcamp && !isAttendance) {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    });

    if (isBootcamp) {
      if (state.activeManifestType === 'morning_pickup') {
        headingText.textContent = 'Morning Pick-up Bus Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus" class="w-5 h-5 text-sky-600"></i>';
        subheadingText.textContent = 'EldoHub Fleet Operations • Alphabetical (A–Z) Checklist';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Picked Up';
        if (thChecklistCol) thChecklistCol.textContent = 'Pick-up Checklist';
      } else if (state.activeManifestType === 'evening_dropoff') {
        headingText.textContent = 'Evening Drop-off Bus Manifest';
        headingIcon.innerHTML = '<i data-lucide="bus-front" class="w-5 h-5 text-blue-600"></i>';
        subheadingText.textContent = 'EldoHub Dismissal Boarding • Alphabetical (A–Z) Checklist';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Dropped Off';
        if (thChecklistCol) thChecklistCol.textContent = 'Drop-off Checklist';
      } else if (state.activeManifestType === 'gate_pickup') {
        headingText.textContent = 'Gate / Parent Carline Register';
        headingIcon.innerHTML = '<i data-lucide="shield-check" class="w-5 h-5 text-emerald-600"></i>';
        subheadingText.textContent = 'Gate Arrival & Dismissal Checklist • Alphabetical (A–Z)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Checked In';
        if (thChecklistCol) thChecklistCol.textContent = 'Gate Check-in';
      } else {
        headingText.textContent = 'Class Attendance Register (Kids Boot Camp)';
        headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-600"></i>';
        subheadingText.textContent = 'Daily Class Attendance • Two-Box Checklist (Present / Absent)';
        if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
        if (thChecklistCol) thChecklistCol.textContent = 'Attendance (Present / Absent)';
      }
    } else {
      headingText.textContent = 'Regular Programs Class Register';
      headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-600"></i>';
      subheadingText.textContent = 'Daily Academic Attendance • Two-Box Checklist (Present / Absent)';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
      if (thChecklistCol) thChecklistCol.textContent = 'Attendance (Present / Absent)';
    }

    if (countPill) {
      countPill.textContent = `${students.length} Student${students.length === 1 ? '' : 's'}`;
    }

    if (students.length === 0) {
      if (tbody) tbody.innerHTML = '';
      emptyState?.classList.remove('hidden');
      return;
    }

    emptyState?.classList.add('hidden');
    if (tbody) tbody.innerHTML = '';

    students.forEach((student, index) => {
      const currentStatus = getStudentStatus(student.id);

      let routeCode = 'LOCAL';
      if (student.transport_mode === 'both') routeCode = 'BUS RT-01';
      else if (student.transport_mode === 'morning_bus') routeCode = 'BUS AM-01';
      else if (student.transport_mode === 'evening_bus') routeCode = 'BUS PM-01';
      else if (student.transport_mode === 'parent_pickup') routeCode = 'CARLINE-GATE';
      else if (student.transport_mode === 'self_arrival') routeCode = 'WALKER';

      if (tbody) {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';

        let actionCellHTML = '';

        if (isAttendance) {
          // Attendance: Two boxes [✔ Present] and [✖ Absent]
          const isPresent = currentStatus === 'present';
          const isAbsent = currentStatus === 'absent';

          actionCellHTML = `
            <div class="flex items-center justify-center gap-2">
              <button data-student-id="${student.id}" data-status="present" class="checklist-btn touch-btn ${
                isPresent
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
              }" title="Mark Present">
                <span class="text-sm font-black">${isPresent ? '✔' : '✓'}</span>
                <span>Present</span>
              </button>

              <button data-student-id="${student.id}" data-status="absent" class="checklist-btn touch-btn ${
                isAbsent
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-600'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-rose-500 hover:text-rose-700'
              }" title="Mark Absent">
                <span class="text-sm font-black">✖</span>
                <span>Absent</span>
              </button>
            </div>
          `;
        } else if (state.activeManifestType === 'morning_pickup') {
          // Morning Bus Pick-up: Single checkbox with Green tick (Picked Up) or Red X (Not Picked Up)
          const isPickedUp = currentStatus === 'picked_up';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="morning" class="single-check-btn touch-btn ${
                isPickedUp
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Pick-up state">
                <span class="text-base font-black">${isPickedUp ? '✔' : '✖'}</span>
                <span>${isPickedUp ? 'Picked Up' : 'Not Picked Up'}</span>
              </button>
            </div>
          `;
        } else if (state.activeManifestType === 'evening_dropoff') {
          // Evening Bus Drop-off: Single checkbox with Green tick (Dropped Off) or Red X (Not Dropped Off)
          const isDroppedOff = currentStatus === 'dropped_off';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="evening" class="single-check-btn touch-btn ${
                isDroppedOff
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Drop-off state">
                <span class="text-base font-black">${isDroppedOff ? '✔' : '✖'}</span>
                <span>${isDroppedOff ? 'Dropped Off' : 'Not Dropped Off'}</span>
              </button>
            </div>
          `;
        } else {
          // Gate / Parent Carline Register: Single checkbox with Green tick (Checked In) or Red X (Not Checked In)
          const isCheckedIn = currentStatus === 'checked_in';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="gate" class="single-check-btn touch-btn ${
                isCheckedIn
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Gate Check-in state">
                <span class="text-base font-black">${isCheckedIn ? '✔' : '✖'}</span>
                <span>${isCheckedIn ? 'Checked In' : 'Not Checked In'}</span>
              </button>
            </div>
          `;
        }

        tr.innerHTML = `
          <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-bold">${index + 1}</td>
          
          <td class="py-3.5 px-4">
            <div class="font-extrabold text-slate-900 flex items-center gap-2">
              <span>${escapeHTML(student.name)}</span>
              ${student.notes ? `<span title="${escapeHTML(student.notes)}" class="cursor-help text-sky-600 text-xs"><i data-lucide="info" class="w-3.5 h-3.5 inline"></i></span>` : ''}
            </div>
            <div class="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-semibold">
              <span>${escapeHTML(student.cohort)}</span>
            </div>
          </td>

          <td class="py-3.5 px-4">
            <a href="tel:${escapeHTML(student.phone)}" class="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-800 font-mono text-xs py-1 px-2.5 rounded-lg bg-sky-50 border border-sky-200 touch-btn font-semibold hover:bg-sky-100 transition-colors" title="Call Guardian">
              <i data-lucide="phone" class="w-3 h-3 text-sky-600"></i>
              <span>${escapeHTML(student.phone)}</span>
            </a>
          </td>

          <td class="py-3.5 px-4 text-xs text-slate-600 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              ${escapeHTML(student.residence)}
            </span>
          </td>

          <td class="py-3.5 px-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-700">
              ${escapeHTML(student.track)}
            </span>
          </td>

          ${isBootcamp && !isAttendance ? `
            <td class="py-3.5 px-4 text-xs text-slate-700 th-transport-col">
              <span class="route-badge bg-sky-50 text-sky-700 border border-sky-200">
                ${routeCode}
              </span>
            </td>
          ` : ''}

          <td class="py-3 px-4 text-center">
            ${actionCellHTML}
          </td>

          <td class="py-3.5 px-4 text-right">
            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-9 h-9 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center" title="Remove student">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      }
    });

    // Wire Two-Box Checklist buttons (Attendance: Present & Absent)
    document.querySelectorAll('.checklist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        const targetStatus = btn.getAttribute('data-status');
        setStudentManifestStatus(studentId, targetStatus);
      });
    });

    // Wire Single Checkbox buttons (Pick-up, Drop-off, Gate)
    document.querySelectorAll('.single-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        const toggleType = btn.getAttribute('data-toggle-type');
        const current = getStudentStatus(studentId);
        let next;
        if (toggleType === 'morning') {
          next = current === 'picked_up' ? 'absent' : 'picked_up';
        } else if (toggleType === 'evening') {
          next = current === 'dropped_off' ? 'absent' : 'dropped_off';
        } else {
          next = current === 'checked_in' ? 'absent' : 'checked_in';
        }
        setStudentManifestStatus(studentId, next);
      });
    });

    // Wire delete buttons
    document.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-delete-id');
        deleteStudent(studentId);
      });
    });
  }

  function deleteStudent(studentId) {
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

    if (confirm(`Remove "${student.name}" from the academy roster?`)) {
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

    const isAttendance = state.activeManifestType === 'class_attendance';
    const isMorning = state.activeManifestType === 'morning_pickup';
    const isEvening = state.activeManifestType === 'evening_dropoff';
    const isGate = state.activeManifestType === 'gate_pickup';

    students.forEach(s => {
      const st = getStudentStatus(s.id);
      if (isAttendance && st === 'present') completed++;
      else if (isMorning && st === 'picked_up') completed++;
      else if (isEvening && st === 'dropped_off') completed++;
      else if (isGate && st === 'checked_in') completed++;
    });

    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const elTotal = document.getElementById('kpi-total');
    const elCompleted = document.getElementById('kpi-completed');
    const elCompletedLabel = document.getElementById('kpi-completed-label');
    const elCompletedSublabel = document.getElementById('kpi-completed-sublabel');
    const elPending = document.getElementById('kpi-pending');
    const elPendingLabel = document.getElementById('kpi-pending-label');
    const elPendingSublabel = document.getElementById('kpi-pending-sublabel');
    const elRate = document.getElementById('kpi-rate');
    const elCohortLabel = document.getElementById('kpi-cohort-label');

    if (elTotal) elTotal.textContent = total;
    if (elCompleted) elCompleted.textContent = completed;
    if (elPending) elPending.textContent = pending;
    if (elRate) elRate.textContent = `${rate}%`;
    if (elCohortLabel) elCohortLabel.textContent = `${state.activeCohort} Roster`;

    if (isAttendance) {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Present (✔)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Marked Present';
      if (elPendingLabel) elPendingLabel.textContent = 'Absent (✖)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Marked Absent';
    } else if (isMorning) {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Picked Up (✔)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Bus Boarded';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Picked Up (✖)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Pick-up';
    } else if (isEvening) {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Dropped Off (✔)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Safely Disembarked';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Dropped Off (✖)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Drop-off';
    } else {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Checked In (✔)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Gate Verified';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Checked In (✖)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Arrival';
    }
  }

  // ============================================================================
  // 7. SINGLE-ENTRY ONBOARDING ENGINE
  // ============================================================================

  function initOnboarding() {
    const modal = document.getElementById('modal-onboarding');
    const openBtns = [
      document.getElementById('btn-open-onboarding'),
      document.getElementById('header-btn-onboard'),
      document.getElementById('btn-empty-onboard'),
      document.getElementById('dock-btn-add')
    ];
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
      
      if (cohortSelect) {
        cohortSelect.innerHTML = '';
        state.data.cohorts[selectedBranch].forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          cohortSelect.appendChild(opt);
        });
      }

      if (trackSelect) {
        trackSelect.innerHTML = '';
        state.data.tracks[selectedBranch].forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          trackSelect.appendChild(opt);
        });
      }

      if (transportGroup) {
        if (selectedBranch === 'bootcamp') {
          transportGroup.classList.remove('hidden');
        } else {
          transportGroup.classList.add('hidden');
        }
      }
    }

    openBtns.forEach(btn => btn?.addEventListener('click', openModal));
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

      state.data.students.push(newStudent);
      saveStoredData();

      persistStudentToSupabase(newStudent);

      state.activeBranch = branch;
      state.activeCohort = cohort;
      state.activeTrack = 'all';

      closeModal();
      renderApp();
      notify(`Student "${name}" registered & propagated!`, 'success');
    });

    // Demo Data Loader (Allows immediate preview of SchoolPass cards & Cloud School table)
    document.getElementById('btn-load-demo-data')?.addEventListener('click', () => {
      const demoStudents = [
        {
          id: 'demo_1',
          name: 'Zawadi Mwangi',
          phone: '+254 712 345 678',
          residence: 'Kilimani, Nairobi',
          branch: 'bootcamp',
          cohort: 'August Intake',
          track: 'Junior Robotics',
          transport_mode: 'both',
          notes: 'Authorized carline pickup: Mother (Jane)',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'demo_2',
          name: 'Liam Otieno',
          phone: '+254 722 987 654',
          residence: 'Westlands, Nairobi',
          branch: 'bootcamp',
          cohort: 'August Intake',
          track: 'Advanced Robotics',
          transport_mode: 'morning_bus',
          notes: 'Drop off at Gate 2',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'demo_3',
          name: 'Amina Hassan',
          phone: '+254 733 112 233',
          residence: 'Karen, Nairobi',
          branch: 'bootcamp',
          cohort: 'August Intake',
          track: 'Web Development',
          transport_mode: 'parent_pickup',
          notes: 'Parent Carline tag: #CP-88',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      state.data.students = demoStudents;
      saveStoredData();
      demoStudents.forEach(persistStudentToSupabase);
      renderApp();
      notify('Demo roster loaded! Explore both Table View and SchoolPass Cards.', 'success');
    });
  }

  // ============================================================================
  // 8. DYNAMIC COHORT & TRACK CREATOR
  // ============================================================================

  function initDynamicItemCreator() {
    const modal = document.getElementById('modal-add-item');
    const modalTitle = document.getElementById('modal-add-item-title');
    const modalLabel = document.getElementById('modal-add-item-label');
    const inputName = document.getElementById('input-new-item-name');
    const closeBtn = document.getElementById('btn-close-add-item');
    const cancelBtn = document.getElementById('btn-cancel-add-item');
    const confirmBtn = document.getElementById('btn-confirm-add-item');

    let currentMode = 'track';

    function openModal(mode) {
      currentMode = mode;
      if (mode === 'track') {
        modalTitle.textContent = `Add Track to ${state.activeBranch === 'bootcamp' ? 'Boot Camp' : 'Regular Programs'}`;
        modalLabel.textContent = 'Curriculum Track Name';
        inputName.placeholder = 'e.g. AI & Robotics Advanced';
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

    document.getElementById('btn-add-track-trigger')?.addEventListener('click', () => openModal('track'));
    document.getElementById('btn-add-cohort-trigger')?.addEventListener('click', () => openModal('cohort'));

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
          notify(`New track "${name}" added!`, 'success');
        }
      } else {
        if (!state.data.cohorts[branch].includes(name)) {
          state.data.cohorts[branch].push(name);
          state.activeCohort = name;
          saveStoredData();
          notify(`New cohort "${name}" added!`, 'success');
        }
      }
      closeModal();
      renderApp();
    });
  }

  // ============================================================================
  // 9. UNIVERSAL EXPORT & PRINT ENGINE
  // ============================================================================

  function initExportEngine() {
    const printBtns = [
      document.getElementById('toolbar-btn-print'),
      document.getElementById('btn-trigger-print'),
      document.getElementById('dock-btn-print')
    ];

    function triggerPrint() {
      const students = getFilteredStudents();
      const isBootcamp = state.activeBranch === 'bootcamp';

      document.getElementById('print-doc-date').textContent = 'Date: ' + state.activeDate;
      document.getElementById('print-doc-timestamp').textContent = 'Generated: ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      let manifestTitle = 'Daily Class Register';
      if (isBootcamp) {
        if (state.activeManifestType === 'morning_pickup') manifestTitle = 'Morning Pick-up Bus Manifest';
        else if (state.activeManifestType === 'evening_dropoff') manifestTitle = 'Evening Drop-off Bus Manifest';
        else if (state.activeManifestType === 'gate_pickup') manifestTitle = 'Gate & Carline Dismissal Register';
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

    printBtns.forEach(btn => btn?.addEventListener('click', triggerPrint));

    // CSV / Excel Export
    const csvBtns = [
      document.getElementById('toolbar-btn-csv'),
      document.getElementById('btn-export-csv')
    ];

    csvBtns.forEach(btn => {
      btn?.addEventListener('click', () => {
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
          else if (state.activeManifestType === 'gate_pickup') manifestName = 'Gate_Carline_Register';
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
        link.download = `EldoHub_Tech_AI_Academy_${manifestName}_${state.activeDate}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        notify('Excel / CSV spreadsheet downloaded successfully!', 'success');
      });
    });

    // Official PDF Export
    const pdfBtns = [
      document.getElementById('toolbar-btn-pdf'),
      document.getElementById('btn-export-pdf')
    ];

    pdfBtns.forEach(btn => {
      btn?.addEventListener('click', () => {
        const students = getFilteredStudents();
        if (students.length === 0) {
          notify('No students to export in current manifest.', 'info');
          return;
        }

        if (!window.jspdf || !window.jspdf.jsPDF) {
          notify('PDF engine initializing, please retry...', 'info');
          return;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const isBootcamp = state.activeBranch === 'bootcamp';

        let manifestTitle = 'Daily Class Attendance Register';
        if (isBootcamp) {
          if (state.activeManifestType === 'morning_pickup') manifestTitle = 'Morning Pick-up Bus Manifest';
          else if (state.activeManifestType === 'evening_dropoff') manifestTitle = 'Evening Drop-off Bus Manifest';
          else if (state.activeManifestType === 'gate_pickup') manifestTitle = 'Gate & Carline Dismissal Register';
        }

        // Header Banner with Official EldoHub Tech & AI Academy Branding
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 26, 'F');

        try {
          if (typeof ELDOHUB_LOGO_DATA_URL !== 'undefined') {
            doc.addImage(ELDOHUB_LOGO_DATA_URL, 'PNG', 12, 4, 45, 18);
          }
        } catch (e) {
          console.warn('Could not embed logo in PDF:', e);
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(255, 255, 255);
        doc.text('ELDOHUB TECH & AI ACADEMY', 64, 11);

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(56, 189, 248);
        doc.text('OPERATIONS, ATTENDANCE & FLEET LOGISTICS', 64, 18);

        doc.setFontSize(8.5);
        doc.setTextColor(203, 213, 225);
        doc.text(`Date: ${state.activeDate} | Generated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 196, 15, { align: 'right' });

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(15, 23, 42);
        doc.text(manifestTitle.toUpperCase(), 14, 36);

        // Metadata box
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.roundedRect(14, 40, 182, 16, 2, 2, 'FD');

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(71, 85, 105);
        doc.text(`Branch: ${isBootcamp ? 'Boot Camp (Kids)' : 'Regular Programs'}`, 18, 46);
        doc.text(`Cohort: ${state.activeCohort}`, 80, 46);
        doc.text(`Track: ${state.activeTrack === 'all' ? 'All Tracks' : state.activeTrack}`, 140, 46);

        let completed = 0;
        students.forEach(s => {
          const st = getStudentStatus(s.id);
          if (st === 'present' || st === 'picked_up' || st === 'dropped_off' || st === 'checked_in') completed++;
        });
        const rate = students.length > 0 ? Math.round((completed / students.length) * 100) : 0;
        doc.text(`Total Enrolled: ${students.length}`, 18, 52);
        doc.text(`Completed / Verified: ${completed} (${rate}%)`, 80, 52);
        doc.text(`Pending / Absent: ${students.length - completed}`, 140, 52);

        const tableRows = students.map((s, idx) => {
          const status = getStudentStatus(s.id);
          let displayStatus = 'NOT VERIFIED';
          if (status === 'present') displayStatus = '[✔] PRESENT';
          else if (status === 'absent') displayStatus = '[✖] ABSENT';
          else if (status === 'picked_up') displayStatus = '[✔] PICKED UP';
          else if (status === 'dropped_off') displayStatus = '[✔] DROPPED OFF';
          else if (status === 'checked_in') displayStatus = '[✔] CHECKED IN';
          return [
            idx + 1,
            s.name,
            s.phone,
            s.residence,
            s.track,
            displayStatus,
            ''
          ];
        });

        doc.autoTable({
          startY: 60,
          startY: 58,
          head: [['#', 'Student Full Name', 'Contact Phone', 'Residence', 'Track', 'Status', 'Sign-off']],
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
    });

    // Batch Actions
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

    // Reset Manifest
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
  // 10. SEARCH, DATE CONTROLS & VIEW TOGGLE
  // ============================================================================

  function initSearchAndDateControls() {
    const searchInput = document.getElementById('manifest-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderManifestTable();
        updateKPIs();
        if (window.lucide) window.lucide.createIcons();
      });
    }

    const dayBtns = document.querySelectorAll('.day-selector-btn');
    const dayMap = { 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5 };

    dayBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const dayStr = btn.getAttribute('data-day');
        const targetWeekday = dayMap[dayStr];
        
        const now = new Date();
        const currentWeekday = now.getDay();
        const diff = targetWeekday - (currentWeekday === 0 ? 7 : currentWeekday);
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + diff);

        state.activeDate = targetDate.toISOString().split('T')[0];
        
        dayBtns.forEach(b => b.classList.remove('bg-white', 'text-sky-700', 'shadow-sm', 'border', 'border-slate-200'));
        btn.classList.add('bg-white', 'text-sky-700', 'shadow-sm', 'border', 'border-slate-200');

        renderApp();
      });
    });

    const dateInput = document.getElementById('manifest-date-input');
    dateInput?.addEventListener('change', (e) => {
      if (e.target.value) {
        state.activeDate = e.target.value;
        renderApp();
      }
    });

    // View Switcher: Cloud School Table vs SchoolPass Cards
    

    document.getElementById('view-mode-cards')?.addEventListener('click', () => {
      state.viewMode = 'cards';
      updateViewModeUI();
    });
  }

  // ============================================================================
  // 11. SIDEBAR & OFF-CANVAS DRAWER
  // ============================================================================

  function initSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const closeMobileBtn = document.getElementById('btn-close-sidebar-mobile');
    const backdrop = document.getElementById('sidebar-backdrop');
    const syncNowBtn = document.getElementById('sidebar-sync-now');

    toggleBtn?.addEventListener('click', () => {
      if (window.innerWidth < 1025) {
        sidebar?.classList.toggle('mobile-open');
        backdrop?.classList.toggle('hidden');
      } else {
        sidebar?.classList.toggle('collapsed');
      }
    });

    closeMobileBtn?.addEventListener('click', () => {
      sidebar?.classList.remove('mobile-open');
      backdrop?.classList.add('hidden');
    });

    backdrop?.addEventListener('click', () => {
      sidebar?.classList.remove('mobile-open');
      backdrop?.classList.add('hidden');
    });

    syncNowBtn?.addEventListener('click', () => {
      syncWithSupabase();
      notify('Synchronizing with Supabase Cloud...', 'info');
    });
  }

  // ============================================================================
  // 12. SUPABASE SETTINGS & BACKUP ENGINE
  // ============================================================================

  function initSettingsModal() {
    const modal = document.getElementById('modal-settings');
    const openBtns = [
      document.getElementById('btn-open-settings'),
      document.getElementById('dock-btn-settings')
    ];
    const closeBtn = document.getElementById('btn-close-settings');
    const syncModalBtn = document.getElementById('btn-sync-modal-now');
    const exportBackupBtn = document.getElementById('btn-export-backup-json');
    const clearDataBtn = document.getElementById('btn-clear-all-data');

    function openModal() {
      modal?.classList.remove('hidden');
    }

    function closeModal() {
      modal?.classList.add('hidden');
    }

    openBtns.forEach(b => b?.addEventListener('click', openModal));
    closeBtn?.addEventListener('click', closeModal);

    syncModalBtn?.addEventListener('click', async () => {
      syncModalBtn.disabled = true;
      syncModalBtn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4 animate-spin"></i><span>Syncing...</span>';
      if (window.lucide) window.lucide.createIcons();
      await fetchSupabaseData(true);
      syncModalBtn.disabled = false;
      syncModalBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Synchronized!</span>';
      if (window.lucide) window.lucide.createIcons();
      notify('Cloud synchronization completed successfully!', 'success');
      setTimeout(() => {
        syncModalBtn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4"></i><span>Synchronize Now</span>';
        if (window.lucide) window.lucide.createIcons();
      }, 2000);
    });

    exportBackupBtn?.addEventListener('click', () => {
      const jsonStr = JSON.stringify(state.data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EldoHub_Academy_Backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify('JSON Backup downloaded!', 'success');
    });

    clearDataBtn?.addEventListener('click', () => {
      if (confirm('Clear local cache on this device? This will reload the latest data from the cloud.')) {
        state.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveStoredData();
        fetchSupabaseData(true);
        notify('Device cache refreshed.', 'info');
        closeModal();
      }
    });
  }

  // ============================================================================
  // 13. BRANCH SWITCHING & LOGISTICS TABS
  // ============================================================================

  function initBranchAndTabListeners() {
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

    // Sidebar Logistics Tabs
    document.getElementById('tab-logistics-morning')?.addEventListener('click', () => {
      state.activeManifestType = 'morning_pickup';
      renderApp();
      if (window.innerWidth < 1025) {
        document.getElementById('app-sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebar-backdrop')?.classList.add('hidden');
      }
    });

    document.getElementById('tab-logistics-evening')?.addEventListener('click', () => {
      state.activeManifestType = 'evening_dropoff';
      renderApp();
      if (window.innerWidth < 1025) {
        document.getElementById('app-sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebar-backdrop')?.classList.add('hidden');
      }
    });

    document.getElementById('tab-logistics-gate')?.addEventListener('click', () => {
      state.activeManifestType = 'gate_pickup';
      renderApp();
      if (window.innerWidth < 1025) {
        document.getElementById('app-sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebar-backdrop')?.classList.add('hidden');
      }
    });

    document.getElementById('tab-logistics-class')?.addEventListener('click', () => {
      state.activeManifestType = 'class_attendance';
      renderApp();
      if (window.innerWidth < 1025) {
        document.getElementById('app-sidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebar-backdrop')?.classList.add('hidden');
      }
    });
  }

  // ============================================================================
  // 14. TOAST NOTIFICATIONS & UTILITIES
  // ============================================================================

  function notify(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const isError = type === 'error';

    toast.className = `p-3.5 px-4 rounded-xl text-xs font-bold shadow-2xl flex items-center gap-2.5 max-w-sm pointer-events-auto transition-all transform duration-300 translate-y-2 opacity-0 ${
      isSuccess
        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
        : isError
        ? 'bg-rose-600 text-white shadow-rose-600/30'
        : 'bg-slate-900 text-white shadow-slate-900/30'
    }`;

    const iconName = isSuccess ? 'check-circle' : isError ? 'alert-triangle' : 'info';
    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-4 h-4 shrink-0"></i>
      <span>${escapeHTML(message)}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

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
  // 15. BOOTSTRAP INITIALIZATION
  // ============================================================================

  document.addEventListener('DOMContentLoaded', () => {
    initBackgroundSlideshow();
    initPWA();
    initSidebar();
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
