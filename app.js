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
    updateViewModeUI();
    updateKPIs();
    updateSidebarBadges();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateViewModeUI() {
    const tableWrapper = document.getElementById('manifest-table-wrapper');
    const cardsWrapper = document.getElementById('manifest-cards-wrapper');
    const btnTable = document.getElementById('view-mode-table');
    const btnCards = document.getElementById('view-mode-cards');

    if (!tableWrapper || !cardsWrapper) return;

    if (state.viewMode === 'table') {
      tableWrapper.classList.remove('hidden');
      cardsWrapper.classList.add('hidden');

      btnTable?.classList.add('bg-cyan-500', 'text-dark-950', 'shadow-md');
      btnTable?.classList.remove('text-slate-300');
      btnCards?.classList.remove('bg-cyan-500', 'text-dark-950', 'shadow-md');
      btnCards?.classList.add('text-slate-300');
    } else {
      tableWrapper.classList.add('hidden');
      cardsWrapper.classList.remove('hidden');

      btnCards?.classList.add('bg-cyan-500', 'text-dark-950', 'shadow-md');
      btnCards?.classList.remove('text-slate-300');
      btnTable?.classList.remove('bg-cyan-500', 'text-dark-950', 'shadow-md');
      btnTable?.classList.add('text-slate-300');
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
            ? (isBootcamp ? 'bg-cyan-500 text-dark-950 shadow-md shadow-cyan-500/20' : 'bg-purple-600 text-white shadow-md shadow-purple-600/20')
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

    // 2. Unified Track Pills Container
    const trackContainer = document.getElementById('track-pills-container');
    if (trackContainer) {
      trackContainer.innerHTML = '';
      
      const allBtn = document.createElement('button');
      allBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
        state.activeTrack === 'all'
          ? (isBootcamp ? 'bg-indigo-500 text-white shadow-md' : 'bg-purple-600 text-white shadow-md')
          : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/5'
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
            ? (isBootcamp ? 'bg-indigo-500 text-white shadow-md' : 'bg-purple-600 text-white shadow-md')
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
        tr.className = 'hover:bg-white/[0.04] transition-colors border-b border-white/5';
        tr.innerHTML = `
          <td class="py-3 px-4 text-center font-mono text-xs text-slate-400 font-bold">${index + 1}</td>
          
          <td class="py-3 px-4">
            <div class="font-bold text-white flex items-center gap-2">
              <span>${escapeHTML(student.name)}</span>
              ${student.notes ? `<span title="${escapeHTML(student.notes)}" class="cursor-help text-cyan-400 text-xs"><i data-lucide="info" class="w-3.5 h-3.5 inline"></i></span>` : ''}
            </div>
            <div class="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 font-medium">
              <span>${escapeHTML(student.cohort)}</span>
            </div>
          </td>

          <td class="py-3 px-4">
            <a href="tel:${escapeHTML(student.phone)}" class="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-mono text-xs py-1 px-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 touch-btn" title="Call Guardian">
              <i data-lucide="phone" class="w-3 h-3 text-cyan-400"></i>
              <span>${escapeHTML(student.phone)}</span>
            </a>
          </td>

          <td class="py-3 px-4 text-xs text-slate-300 font-medium">
            <span class="inline-flex items-center gap-1.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              ${escapeHTML(student.residence)}
            </span>
          </td>

          <td class="py-3 px-4">
            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-200">
              ${escapeHTML(student.track)}
            </span>
          </td>

          ${isBootcamp && state.activeManifestType !== 'class_attendance' ? `
            <td class="py-3 px-4 text-xs text-slate-300 th-transport-col">
              <span class="route-badge bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                ${routeCode}
              </span>
            </td>
          ` : ''}

          <td class="py-3 px-4 text-center">
            <button data-student-id="${student.id}" class="toggle-status-btn touch-btn h-10 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 mx-auto ${
              isCompleted
                ? 'bg-emerald-500 text-dark-950 shadow-md shadow-emerald-500/25'
                : 'glass-panel-subtle text-slate-300 hover:text-white border border-white/10'
            }">
              <i data-lucide="${isCompleted ? 'check-circle' : 'circle'}" class="w-4 h-4"></i>
              <span>${actionBtnText}</span>
            </button>
          </td>

          <td class="py-3 px-4 text-right">
            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-9 h-9 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors inline-flex items-center justify-center" title="Remove student">
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
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-bold text-sm text-cyan-300 shrink-0">
                ${escapeHTML(student.name.charAt(0))}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-bold text-slate-400">#${index + 1}</span>
                  <h4 class="font-extrabold text-base text-white tracking-tight">${escapeHTML(student.name)}</h4>
                </div>
                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-cyan-300 border border-white/10">${escapeHTML(student.cohort)}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-slate-300 border border-white/5">${escapeHTML(student.track)}</span>
                </div>
              </div>
            </div>

            <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-8 h-8 rounded-lg text-slate-400 hover:text-rose-400 inline-flex items-center justify-center shrink-0">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5">
            <div class="route-badge bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <i data-lucide="navigation" class="w-3 h-3"></i>
              <span>${routeCode} &bull; ${transportLabel}</span>
            </div>

            <span class="badge-status ${isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : (currentStatus === 'absent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40')}">
              <span class="pulse-dot ${isCompleted ? 'bg-emerald-400' : (currentStatus === 'absent' ? 'bg-rose-400' : 'bg-amber-400')}"></span>
              <span>${isCompleted ? actionBtnText.toUpperCase() : (currentStatus === 'absent' ? 'ABSENT' : 'PENDING')}</span>
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div class="flex items-center gap-1.5 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-400 shrink-0"></i>
              <span class="truncate font-medium">${escapeHTML(student.residence)}</span>
            </div>
            <a href="tel:${escapeHTML(student.phone)}" class="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-200 font-mono font-bold hover:bg-cyan-500/25 transition-all">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span class="truncate">${escapeHTML(student.phone)}</span>
            </a>
          </div>

          ${student.notes ? `
            <div class="text-xs text-amber-300/90 bg-amber-950/25 border border-amber-500/25 rounded-xl p-2.5 flex items-start gap-1.5">
              <i data-lucide="info" class="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"></i>
              <span>${escapeHTML(student.notes)}</span>
            </div>
          ` : ''}

          <!-- SchoolPass Large Rapid Action Verification Switch -->
          <button data-student-id="${student.id}" class="toggle-status-btn touch-btn w-full h-12 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
            isCompleted
              ? 'bg-emerald-500 text-dark-950 shadow-emerald-500/30 active:scale-98'
              : 'glass-panel-interactive border-white/15 text-white hover:bg-white/10 active:scale-98'
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

  function toggleStudentManifestStatus(studentId) {
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

    students.forEach(s => {
      const st = getStudentStatus(s.id);
      if (st !== 'pending' && st !== 'absent') completed++;
    });

    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const elTotal = document.getElementById('kpi-total');
    const elCompleted = document.getElementById('kpi-completed');
    const elCompletedLabel = document.getElementById('kpi-completed-label');
    const elPending = document.getElementById('kpi-pending');
    const elRate = document.getElementById('kpi-rate');
    const elCohortLabel = document.getElementById('kpi-cohort-label');

    if (elTotal) elTotal.textContent = total;
    if (elCompleted) elCompleted.textContent = completed;
    if (elPending) elPending.textContent = pending;
    if (elRate) elRate.textContent = `${rate}%`;
    if (elCohortLabel) elCohortLabel.textContent = `${state.activeCohort} Roster`;

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
        link.download = `Tech_AI_Academy_${manifestName}_${state.activeDate}.csv`;
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

        // Header Banner
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 24, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.text('TECH & AI ACADEMY', 14, 11);

        doc.setFontSize(8.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(56, 189, 248);
        doc.text('OPERATIONS & FLEET LOGISTICS PORTAL', 14, 17);

        doc.setFontSize(8.5);
        doc.setTextColor(203, 213, 225);
        doc.text(`Date: ${state.activeDate} | Generated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 196, 15, { align: 'right' });

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(13);
        doc.setTextColor(15, 23, 42);
        doc.text(manifestTitle.toUpperCase(), 14, 34);

        // Metadata box
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
            ''
          ];
        });

        doc.autoTable({
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
        
        dayBtns.forEach(b => b.classList.remove('bg-cyan-500', 'text-dark-950'));
        btn.classList.add('bg-cyan-500', 'text-dark-950');

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
    document.getElementById('view-mode-table')?.addEventListener('click', () => {
      state.viewMode = 'table';
      updateViewModeUI();
    });

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
    const saveBtn = document.getElementById('btn-save-settings');
    const testBtn = document.getElementById('btn-test-supabase');
    const urlInput = document.getElementById('setting-supabase-url');
    const keyInput = document.getElementById('setting-supabase-key');
    const exportBackupBtn = document.getElementById('btn-export-backup-json');
    const clearDataBtn = document.getElementById('btn-clear-all-data');

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

    openBtns.forEach(b => b?.addEventListener('click', openModal));
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

    clearDataBtn?.addEventListener('click', () => {
      if (confirm('Clear local cache? This resets all students and manifest logs to clean state.')) {
        state.data = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveStoredData();
        renderApp();
        notify('Local cache cleared to clean state.', 'info');
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
        ? 'bg-emerald-950/95 text-emerald-200 border border-emerald-500/40'
        : isError
        ? 'bg-rose-950/95 text-rose-200 border border-rose-500/40'
        : 'bg-dark-900/95 text-cyan-200 border border-cyan-500/40'
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
