/**
 * ==============================================================================
 * EldoHub Tech & AI Academy - Operations & Fleet Management System
 * Institutional Authentication, Role-Based Access Control (RBAC) & Audit Integrity
 * ==============================================================================
 */

const ELDOHUB_LOGO_DATA_URL = "data:image/png;base64,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";

(function() {
  'use strict';

  // Capture URL parameters BEFORE anything can strip or alter them!
  const INITIAL_HASH = window.location.hash || '';
  const INITIAL_SEARCH = window.location.search || '';
  // ONLY true if arriving via Supabase email invite or recovery link!
  const IS_RECOVERY_INTENT = 
    INITIAL_HASH.includes('type=invite') || 
    INITIAL_HASH.includes('type=recovery') || 
    INITIAL_SEARCH.includes('type=invite') || 
    INITIAL_SEARCH.includes('type=recovery');

  // ============================================================================
  // 1. GLOBAL STATE & INSTITUTIONAL CONFIGURATION
  // ============================================================================

  const STORAGE_KEY = 'tech_ai_academy_state_v11';
  const AUTH_STORAGE_KEY = 'eldohub_auth_session_v11';
  const SUPABASE_CONFIG_KEY = 'tech_ai_academy_supabase_config_v11';
  const LOGO_STORAGE_KEY = 'tech_ai_academy_custom_logo_v11';
  const OUTBOX_STORAGE_KEY = 'eldohub_offline_outbox_v11';

  const DEFAULT_SUPABASE_CONFIG = {
    url: 'https://sopqoumqblhtguprgtwx.supabase.co',
    key: 'sb_publishable_zPJ4Fguz3X4SnLavQpurRg_lUMxf_BO'
  };

  const DEFAULT_STATE = {
    students: [],
    manifestLogs: [],
    staff: [],
    auditLogs: [],
    feePayments: [],
    vehicles: [],
    cohorts: {
      bootcamp: ['Bootcamp 2026']
    },
    tracks: {
      bootcamp: ['Junior Robotics', 'Advanced Robotics', 'Web Development', 'AI & Coding', 'Data Science & AI']
    }
  };

  const state = {
    data: loadStoredData(),
    currentUser: null, // Holds authenticated staff profile
    isPasswordRecoveryActive: IS_RECOVERY_INTENT,
    activeBranch: 'bootcamp',
    activeCohort: 'Bootcamp 2026',
    activeTrack: 'all',
    activeVehicle: 'all',
    activeManifestType: 'morning_pickup',
    activeDate: new Date().toISOString().split('T')[0],
    activeViewModule: 'manifest_operations', // 'manifest_operations' | 'fees_payments' | 'staff_management' | 'audit_logs'
    feesFilter: { query: '', cohort: 'all', status: 'all' },
    searchQuery: '',
    sidebarCollapsed: false,
    supabaseClient: null,
    supabaseStatus: 'connecting',
    realtimeSubscription: null
  };

    function generateUUID() {
    if (typeof crypto !== 'undefined') {
      if (typeof crypto.randomUUID === 'function') {
        try { return crypto.randomUUID(); } catch (e) {}
      }
      if (typeof crypto.getRandomValues === 'function') {
        try {
          return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        } catch (e) {}
      }
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function ensureValidUUID(id) {
    if (typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
      return id;
    }
    return generateUUID();
  }

  function sanitizeStudentForSupabase(s) {
    const validId = ensureValidUUID(s.id);
    s.id = validId;
    const cleanPhone = (s.phone && String(s.phone).trim()) ? String(s.phone).trim() : 'N/A';
    const cleanResidence = (s.residence && String(s.residence).trim()) ? String(s.residence).trim() : 'N/A';
    return {
      id: validId,
      name: s.name || 'Unnamed Student',
      phone: cleanPhone,
      residence: cleanResidence,
      branch: s.branch || 'bootcamp',
      cohort: s.cohort || 'Bootcamp 2026',
      track: s.track || 'General Track',
      transport_mode: s.transport_mode || 'self_arrival',
      total_fee: Number(s.total_fee || 0),
      amount_paid: Number(s.amount_paid || 0),
      payment_status: ['Paid', 'Partial', 'Unpaid'].includes(s.payment_status) ? s.payment_status : 'Unpaid',
      notes: s.notes || '',
      created_at: s.created_at || new Date().toISOString(),
      updated_at: s.updated_at || new Date().toISOString()
    };
  }

  function sanitizePaymentForSupabase(p) {
    const validId = ensureValidUUID(p.id);
    const validStudentId = ensureValidUUID(p.student_id);
    p.id = validId;
    p.student_id = validStudentId;
    return {
      id: validId,
      student_id: validStudentId,
      amount: Number(p.amount || 0),
      payment_date: p.payment_date || new Date().toISOString().split('T')[0],
      payment_method: p.payment_method || 'M-Pesa',
      reference_code: p.reference_code || ('REC-' + Math.floor(100000 + Math.random() * 900000)),
      notes: p.notes || '',
      recorded_by: p.recorded_by || null,
      recorded_by_name: p.recorded_by_name || '',
      created_at: p.created_at || new Date().toISOString()
    };
  }

  function loadStoredData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const cohortsObj = parsed.cohorts || {};
        const tracksObj = parsed.tracks || {};

        // 100% Unified Bootcamps: merge any legacy cohorts/tracks into bootcamp arrays
        let bootcampCohorts = DEFAULT_STATE.cohorts.bootcamp;
        if (Array.isArray(cohortsObj.bootcamp) && cohortsObj.bootcamp.length > 0) {
          bootcampCohorts = cohortsObj.bootcamp;
        } else if (Array.isArray(cohortsObj)) {
          bootcampCohorts = cohortsObj;
        }

        let bootcampTracks = DEFAULT_STATE.tracks.bootcamp;
        if (Array.isArray(tracksObj.bootcamp) && tracksObj.bootcamp.length > 0) {
          bootcampTracks = tracksObj.bootcamp;
        } else if (Array.isArray(tracksObj)) {
          bootcampTracks = tracksObj;
        }

        // Normalize students: ensure fee balances and bootcamp branch
        const rawStudents = Array.isArray(parsed.students) ? parsed.students : [];
        const students = rawStudents.map(s => {
          const totalFee = Number(s.total_fee !== undefined ? s.total_fee : 0);
          const amountPaid = Number(s.amount_paid !== undefined ? s.amount_paid : 0);
          const balanceDue = Number(totalFee - amountPaid);
          let paymentStatus = s.payment_status;
          if (!paymentStatus) {
            paymentStatus = (amountPaid >= totalFee && totalFee > 0) ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid');
          }
          return {
            ...s,
            branch: 'bootcamp',
            total_fee: totalFee,
            amount_paid: amountPaid,
            balance_due: balanceDue,
            payment_status: paymentStatus
          };
        });

        // Ensure all students have valid PostgreSQL UUIDs
        const idMap = new Map();
        students.forEach(s => {
          if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s.id)) {
            const newId = generateUUID();
            idMap.set(s.id, newId);
            s.id = newId;
          }
        });
        if (idMap.size > 0 && Array.isArray(parsed.manifestLogs)) {
          parsed.manifestLogs.forEach(l => {
            if (idMap.has(l.student_id)) l.student_id = idMap.get(l.student_id);
          });
        }
        if (idMap.size > 0 && Array.isArray(parsed.feePayments)) {
          parsed.feePayments.forEach(p => {
            if (idMap.has(p.student_id)) p.student_id = idMap.get(p.student_id);
          });
        }

        // Filter out any legacy dummy vehicles
        const rawVehicles = Array.isArray(parsed.vehicles) ? parsed.vehicles : [];
        const cleanedVehicles = rawVehicles.filter(v => 
          !['veh_bus_1', 'veh_bus_2', 'veh_van_1', 'veh_van_2'].includes(v.id) &&
          v.plate !== 'KDC 101A' && v.plate !== 'KDC 102B' && v.plate !== 'KDD 201C' && v.plate !== 'KDD 202D'
        );

        return {
          students: students,
          manifestLogs: Array.isArray(parsed.manifestLogs) ? parsed.manifestLogs : [],
          staff: Array.isArray(parsed.staff) ? parsed.staff : [],
          auditLogs: Array.isArray(parsed.auditLogs) ? parsed.auditLogs : [],
          feePayments: Array.isArray(parsed.feePayments) ? parsed.feePayments : [],
          vehicles: cleanedVehicles,
          cohorts: { bootcamp: bootcampCohorts },
          tracks: { bootcamp: bootcampTracks }
        };
      }
    } catch (e) {
      console.warn('LocalStorage error, using defaults:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  function saveStoredData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  // ============================================================================
  // 2. OFFLINE OUTBOX ENGINE & PERSISTENCE QUEUE (24HR+ FAULT TOLERANCE)
  // ============================================================================

  function getOutboxQueue() {
    try {
      const q = localStorage.getItem(OUTBOX_STORAGE_KEY);
      return q ? JSON.parse(q) : [];
    } catch (e) {
      return [];
    }
  }

  function saveOutboxQueue(queue) {
    try {
      localStorage.setItem(OUTBOX_STORAGE_KEY, JSON.stringify(queue));
    } catch (e) {
      console.warn('Failed to save offline outbox queue:', e);
    }
  }

  function enqueueOutbox(type, payload) {
    const queue = getOutboxQueue();
    // Idempotent deduplication for status logs and vehicle assignments
    if (type === 'UPSERT_MANIFEST_LOG') {
      const existingIdx = queue.findIndex(
        i => i.type === 'UPSERT_MANIFEST_LOG' &&
             i.payload.student_id === payload.student_id &&
             i.payload.date === payload.date &&
             i.payload.type === payload.type
      );
      if (existingIdx >= 0) {
        queue[existingIdx].payload = payload;
        queue[existingIdx].timestamp = new Date().toISOString();
        saveOutboxQueue(queue);
        updateSyncIndicator();
        return;
      }
    } else if (type === 'ASSIGN_VEHICLE') {
      const existingIdx = queue.findIndex(
        i => i.type === 'ASSIGN_VEHICLE' && i.payload.studentId === payload.studentId
      );
      if (existingIdx >= 0) {
        queue[existingIdx].payload = payload;
        queue[existingIdx].timestamp = new Date().toISOString();
        saveOutboxQueue(queue);
        updateSyncIndicator();
        return;
      }
    }

    queue.push({
      id: 'sync_' + Date.now() + '_' + Math.random().toString(36).substr(2, 7),
      type: type,
      payload: payload,
      timestamp: new Date().toISOString(),
      retryCount: 0
    });
    saveOutboxQueue(queue);
    updateSyncIndicator();
  }

  let isFlushingOutbox = false;

  async function flushOutboxQueue() {
    if (isFlushingOutbox) return;
    if (!navigator.onLine || !state.supabaseClient) {
      updateSyncIndicator();
      return;
    }

    const queue = getOutboxQueue();
    if (queue.length === 0) {
      updateSyncIndicator();
      return;
    }

    isFlushingOutbox = true;
    updateSyncIndicator(true);

    let syncedCount = 0;
    const remainingQueue = [];

    for (const item of queue) {
      try {
        let success = false;
        if (item.type === 'INSERT_STUDENT') {
          const cleanStudent = sanitizeStudentForSupabase(item.payload);
          const { error } = await state.supabaseClient.from('students').upsert([cleanStudent], { onConflict: 'id' });
          if (!error) success = true;
          else console.warn('Supabase INSERT_STUDENT error:', error);
        } else if (item.type === 'DELETE_STUDENT') {
          const { error } = await state.supabaseClient.from('students').delete().eq('id', item.payload.id);
          if (!error) success = true;
        } else if (item.type === 'UPSERT_MANIFEST_LOG') {
          const { error } = await state.supabaseClient.from('manifest_logs').upsert([item.payload], { onConflict: 'student_id,date,type' });
          if (!error) success = true;
        } else if (item.type === 'ASSIGN_VEHICLE') {
          // assigned_vehicle is managed locally as vehicle column is not in Supabase students table
          success = true;
        } else if (item.type === 'INSERT_VEHICLE') {
          const { error } = await state.supabaseClient.from('vehicles').upsert([item.payload], { onConflict: 'id' });
          if (!error) success = true;
        } else if (item.type === 'DELETE_VEHICLE') {
          const { error } = await state.supabaseClient.from('vehicles').delete().eq('id', item.payload.id);
          if (!error) success = true;
        } else if (item.type === 'INSERT_AUDIT_LOG') {
          const { error } = await state.supabaseClient.from('audit_logs').insert([item.payload]);
          if (!error) success = true;
        } else if (item.type === 'INSERT_PAYMENT') {
          if (Number(item.payload.amount || 0) <= 0) {
            success = true;
          } else {
            const cleanPayment = sanitizePaymentForSupabase(item.payload);
            const { error } = await state.supabaseClient.from('fee_payments').insert([cleanPayment]);
            if (!error) {
              const std = state.data.students.find(s => s.id === item.payload.student_id);
              if (std) {
                await state.supabaseClient.from('students').update({
                  amount_paid: std.amount_paid,
                  payment_status: std.payment_status
                }).eq('id', std.id);
              }
              success = true;
            } else {
              console.warn('Supabase INSERT_PAYMENT error:', error);
            }
          }
        } else if (item.type === 'BULK_IMPORT_STUDENTS') {
          const { students, payments } = item.payload;
          let studentsOk = true;
          let paymentsOk = true;
          if (students && students.length > 0) {
            const cleanStudents = students.map(sanitizeStudentForSupabase);
            const { error: sErr } = await state.supabaseClient.from('students').upsert(cleanStudents, { onConflict: 'id' });
            if (sErr) {
              console.warn('Supabase bulk students upsert error, falling back to individual inserts:', sErr);
              let savedCount = 0;
              let lastErr = sErr;
              for (const std of cleanStudents) {
                const { error: singleErr } = await state.supabaseClient.from('students').upsert([std], { onConflict: 'id' });
                if (!singleErr) {
                  savedCount++;
                } else {
                  lastErr = singleErr;
                  console.error(`Failed to save student ${std.name}:`, singleErr);
                }
              }
              if (savedCount === 0) {
                notify(`Database Sync Error: ${lastErr.message || lastErr.code || 'Permission Denied'}`, 'error');
                studentsOk = false;
              } else {
                console.log(`Saved ${savedCount}/${cleanStudents.length} students individually.`);
              }
            }
          }
          if (payments && payments.length > 0) {
            const validPayments = payments.filter(p => Number(p.amount || 0) > 0);
            if (validPayments.length > 0) {
              const cleanPayments = validPayments.map(sanitizePaymentForSupabase);
              const { error: pErr } = await state.supabaseClient.from('fee_payments').insert(cleanPayments);
              if (pErr) {
                console.warn('Supabase bulk payments insert error:', pErr);
                paymentsOk = false;
              }
            }
          }
          if (studentsOk && paymentsOk) success = true;
        } else if (item.type === 'PROVISION_STAFF') {
          const p = item.payload;
          const clientConfig = {
            url: state.supabaseClient.supabaseUrl || DEFAULT_SUPABASE_CONFIG.url,
            key: state.supabaseClient.supabaseKey || DEFAULT_SUPABASE_CONFIG.key
          };
          const tempClient = window.supabase.createClient(clientConfig.url, clientConfig.key, {
            auth: { persistSession: false, autoRefreshToken: false }
          });
          const { data: signUpData, error: signUpError } = await tempClient.auth.signUp({
            email: p.email,
            password: p.initialPassword,
            options: {
              data: {
                full_name: p.name,
                role: p.role,
                is_first_login: p.role !== 'super_admin'
              }
            }
          });
          const realUserId = signUpData?.user?.id || p.localStaffId;
          await state.supabaseClient.from('profiles').upsert({
            id: realUserId,
            email: p.email,
            full_name: p.name,
            role: p.role,
            assigned_tracks: p.assigned_tracks,
            is_active: true,
            is_first_login: p.role !== 'super_admin'
          });
          const localStaff = state.data.staff.find(s => s.email.toLowerCase() === p.email.toLowerCase());
          if (localStaff) {
            localStaff.id = realUserId;
            saveStoredData();
          }
          try {
            await state.supabaseClient.auth.resetPasswordForEmail(p.email, { redirectTo: window.location.origin });
          } catch (e) {}
          success = true;
        }

        if (success) {
          syncedCount++;
        } else {
          item.retryCount = (item.retryCount || 0) + 1;
          remainingQueue.push(item);
        }
      } catch (err) {
        console.warn(`Sync item failed (${item.type}):`, err);
        item.retryCount = (item.retryCount || 0) + 1;
        remainingQueue.push(item);
      }
    }

    saveOutboxQueue(remainingQueue);
    isFlushingOutbox = false;
    updateSyncIndicator();

    if (syncedCount > 0) {
      notify(`Cloud Sync: Uploaded ${syncedCount} offline record${syncedCount === 1 ? '' : 's'}!`, 'success');
      fetchSupabaseData();
    }
  }

  function setupOfflineNetworkListeners() {
    window.addEventListener('online', () => {
      updateSupabaseStatus('connected');
      notify('Internet connection restored. Synchronizing offline records with cloud...', 'info');
      flushOutboxQueue();
    });

    window.addEventListener('offline', () => {
      updateSupabaseStatus('local');
      notify('Offline Mode: All additions & attendance changes are safely preserved on this device.', 'info');
      updateSyncIndicator();
    });

    setInterval(() => {
      if (navigator.onLine && getOutboxQueue().length > 0) {
        flushOutboxQueue();
      }
    }, 25000);
  }

  function updateSyncIndicator(isSyncing = false) {
    const queue = getOutboxQueue();
    const count = queue.length;
    const isOnline = navigator.onLine && state.supabaseStatus === 'connected';

    const headerBtn = document.getElementById('header-sync-status-btn');
    const headerDot = document.getElementById('header-sync-dot');
    const headerText = document.getElementById('header-sync-text');
    const sidebarDot = document.getElementById('sidebar-db-dot');
    const modalBadge = document.getElementById('settings-outbox-badge');
    const modalDesc = document.getElementById('settings-outbox-desc');

    if (isSyncing) {
      if (headerBtn) {
        headerBtn.className = 'touch-btn h-10 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-sky-50 text-sky-700 border border-sky-200 syncing';
        headerBtn.title = `Syncing ${count} offline record(s) to cloud...`;
      }
      if (headerDot) headerDot.className = 'w-2 h-2 rounded-full bg-sky-500 shrink-0';
      if (headerText) headerText.textContent = `Syncing (${count})...`;
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-sky-500 shrink-0';
      if (modalBadge) {
        modalBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200';
        modalBadge.textContent = 'Syncing...';
      }
      return;
    }

    if (headerBtn) headerBtn.classList.remove('syncing');

    if (!isOnline) {
      if (headerBtn) {
        headerBtn.className = 'touch-btn h-10 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-amber-50 text-amber-800 border border-amber-300';
        headerBtn.title = count > 0 ? `Offline: ${count} change(s) stored on device. Auto-syncs when online.` : 'Offline Mode: Stored on device.';
      }
      if (headerDot) headerDot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
      if (headerText) headerText.textContent = count > 0 ? `${count} Pending` : 'Offline';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
      if (modalBadge) {
        modalBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200';
        modalBadge.textContent = count > 0 ? `${count} Pending (Offline)` : 'Offline';
      }
      if (modalDesc) {
        modalDesc.textContent = count > 0 ? `${count} change(s) queued locally. Reconnecting will auto-sync.` : 'Operating offline. Changes will save locally.';
      }
    } else if (count > 0) {
      if (headerBtn) {
        headerBtn.className = 'touch-btn h-10 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-amber-50 text-amber-800 border border-amber-300';
        headerBtn.title = `${count} change(s) pending sync. Tap to upload now.`;
      }
      if (headerDot) headerDot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
      if (headerText) headerText.textContent = `${count} Pending`;
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
      if (modalBadge) {
        modalBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200';
        modalBadge.textContent = `${count} Pending`;
      }
      if (modalDesc) {
        modalDesc.textContent = `${count} change(s) waiting to sync to PostgreSQL cloud.`;
      }
    } else {
      if (headerBtn) {
        headerBtn.className = 'touch-btn h-10 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all bg-emerald-50 text-emerald-700 border border-emerald-200';
        headerBtn.title = 'Cloud Synchronized: All records up to date.';
      }
      if (headerDot) headerDot.className = 'w-2 h-2 rounded-full bg-emerald-500 shrink-0';
      if (headerText) headerText.textContent = 'Synced';
      if (sidebarDot) sidebarDot.className = 'w-2 h-2 rounded-full bg-emerald-500 shrink-0';
      if (modalBadge) {
        modalBadge.className = 'px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200';
        modalBadge.textContent = 'All Synced';
      }
      if (modalDesc) {
        modalDesc.textContent = 'All records synchronized with PostgreSQL cloud.';
      }
    }
  }

  // ============================================================================
  // 3. SUPABASE INITIALIZATION & REALTIME POSTGRESQL SYNC
  // ============================================================================

  function initSupabase() {
    let config = DEFAULT_SUPABASE_CONFIG;
    try {
      const stored = localStorage.getItem(SUPABASE_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.url && parsed.key) config = parsed;
      }
    } catch (e) {}

    if (window.supabase && config.url && config.key) {
      try {
        state.supabaseClient = window.supabase.createClient(config.url, config.key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });

        // Attach auth state listener immediately upon client creation
        state.supabaseClient.auth.onAuthStateChange(async (event, session) => {
          console.log('[Supabase Auth Event]:', event, session);
          if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && state.isPasswordRecoveryActive)) {
            state.isPasswordRecoveryActive = true;
            if (typeof window.showPasswordRecoveryModeGlobal === 'function') {
              window.showPasswordRecoveryModeGlobal();
            }
          }
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              await flushOutboxQueue();
              await fetchSupabaseData(true);
              renderApp();
            }
          }
        });

        updateSupabaseStatus(navigator.onLine ? 'connected' : 'local');
        setupRealtimeSubscriptions();
        flushOutboxQueue();
        fetchSupabaseData();
      } catch (err) {
        console.warn('Supabase initialization warning:', err);
        updateSupabaseStatus('local');
      }
    } else {
      updateSupabaseStatus('local');
    }
  }

  function updateSupabaseStatus(status) {
    state.supabaseStatus = status;
    const dot = document.getElementById('supabase-status-dot');
    const label = document.getElementById('sidebar-status-label');
    const dbDot = document.getElementById('sidebar-db-dot');

    if (status === 'connected') {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0';
      if (label) label.textContent = 'Cloud Sync Active';
      if (dbDot) dbDot.className = 'w-2 h-2 rounded-full bg-emerald-500 shrink-0';
    } else {
      if (dot) dot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0';
      if (label) label.textContent = 'Local Mode';
      if (dbDot) dbDot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
    }
    updateSyncIndicator();
  }

  async function fetchSupabaseData(force = false) {
    if (!state.supabaseClient || !navigator.onLine) {
      updateSyncIndicator();
      return;
    }

    try {
      const [studentsRes, logsRes, profilesRes, auditRes, vehiclesRes, paymentsRes] = await Promise.all([
        state.supabaseClient.from('students').select('*'),
        state.supabaseClient.from('manifest_logs').select('*'),
        state.supabaseClient.from('profiles').select('*'),
        state.supabaseClient.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100),
        state.supabaseClient.from('vehicles').select('*').catch(() => ({ data: null })),
        state.supabaseClient.from('fee_payments').select('*').order('created_at', { ascending: false }).catch(() => ({ data: null }))
      ]);

      const queue = getOutboxQueue();

      // 1. Safe Students Merge: Never overwrite students pending sync in the outbox
      if (studentsRes.data && !studentsRes.error) {
        const cloudStudents = studentsRes.data.map(s => {
          const totalFee = Number(s.total_fee !== undefined ? s.total_fee : 0);
          const amountPaid = Number(s.amount_paid !== undefined ? s.amount_paid : 0);
          const balanceDue = Number(totalFee - amountPaid);
          const status = s.payment_status || (amountPaid >= totalFee && totalFee > 0 ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid'));
          return {
            ...s,
            branch: 'bootcamp',
            total_fee: totalFee,
            amount_paid: amountPaid,
            balance_due: balanceDue,
            payment_status: status
          };
        });
        const cloudIdSet = new Set(cloudStudents.map(s => s.id));
        const pendingStudentIds = new Set(
          queue.filter(item => item.type === 'INSERT_STUDENT').map(item => item.payload.id)
        );
        const deletedStudentIds = new Set(
          queue.filter(item => item.type === 'DELETE_STUDENT').map(item => item.payload.id)
        );

        // Keep all local students that are not present in cloud and haven't been deleted
        const localStudentsToKeep = (state.data.students || []).filter(
          s => !cloudIdSet.has(s.id) && !deletedStudentIds.has(s.id)
        );

        // Filter out any cloud students that are queued for deletion locally
        const filteredCloud = cloudStudents.filter(s => !deletedStudentIds.has(s.id));

        state.data.students = [...filteredCloud, ...localStudentsToKeep];

        // AUTO-SYNC: If this device has local students not yet in the cloud, sync them up immediately!
        if (localStudentsToKeep.length > 0 && navigator.onLine) {
          enqueueOutbox('BULK_IMPORT_STUDENTS', {
            students: localStudentsToKeep,
            payments: state.data.feePayments || []
          });
          flushOutboxQueue();
        }
      }

      // 1B. Safe Fee Payments Merge
      if (paymentsRes && paymentsRes.data && !paymentsRes.error) {
        const cloudPayments = paymentsRes.data;
        const cloudPaymentIds = new Set(cloudPayments.map(p => p.id));
        const localPaymentsToKeep = (state.data.feePayments || []).filter(
          p => !cloudPaymentIds.has(p.id)
        );
        state.data.feePayments = [...cloudPayments, ...localPaymentsToKeep];

        // AUTO-SYNC: Push any un-synced fee payments to cloud
        if (localPaymentsToKeep.length > 0 && navigator.onLine) {
          localPaymentsToKeep.forEach(p => enqueueOutbox('INSERT_PAYMENT', p));
          flushOutboxQueue();
        }
      }

      // 2. Safe Manifest Logs Merge: Never overwrite local pending status changes
      if (logsRes.data && !logsRes.error) {
        const cloudLogs = logsRes.data;
        const pendingLogs = queue.filter(item => item.type === 'UPSERT_MANIFEST_LOG').map(item => item.payload);
        const pendingKeyMap = new Map(pendingLogs.map(l => [`${l.student_id}_${l.date}_${l.type}`, l]));

        const merged = cloudLogs.map(cl => {
          const key = `${cl.student_id}_${cl.date}_${cl.type}`;
          return pendingKeyMap.has(key) ? pendingKeyMap.get(key) : cl;
        });

        const cloudKeySet = new Set(cloudLogs.map(cl => `${cl.student_id}_${cl.date}_${cl.type}`));
        pendingLogs.forEach(pl => {
          const key = `${pl.student_id}_${pl.date}_${pl.type}`;
          if (!cloudKeySet.has(key)) {
            merged.push(pl);
          }
        });

        state.data.manifestLogs = merged;
      }

      // 3. Safe Profiles/Staff Merge: Never overwrite staff pending provision
      if (profilesRes.data && !profilesRes.error && profilesRes.data.length > 0) {
        const cloudStaff = profilesRes.data;
        const cloudEmails = new Set(cloudStaff.map(s => (s.email || '').toLowerCase()));
        const pendingEmails = new Set(
          queue.filter(item => item.type === 'PROVISION_STAFF').map(item => (item.payload.email || '').toLowerCase())
        );

        const pendingLocalStaff = (state.data.staff || []).filter(
          st => pendingEmails.has((st.email || '').toLowerCase()) && !cloudEmails.has((st.email || '').toLowerCase())
        );

        state.data.staff = [...cloudStaff, ...pendingLocalStaff];
      }

      if (auditRes.data && !auditRes.error) {
        state.data.auditLogs = auditRes.data;
      }

      // 4. Safe Vehicles Merge
      if (vehiclesRes && vehiclesRes.data && !vehiclesRes.error && vehiclesRes.data.length > 0) {
        const cloudVehicles = vehiclesRes.data;
        const cloudVehIds = new Set(cloudVehicles.map(v => v.id));
        const pendingVehIds = new Set(
          queue.filter(item => item.type === 'INSERT_VEHICLE').map(item => item.payload.id)
        );
        const deletedVehIds = new Set(
          queue.filter(item => item.type === 'DELETE_VEHICLE').map(item => item.payload.id)
        );

        const pendingLocalVehs = (state.data.vehicles || []).filter(
          v => pendingVehIds.has(v.id) && !cloudVehIds.has(v.id)
        );

        const filteredCloudVehs = cloudVehicles.filter(v => !deletedVehIds.has(v.id));
        state.data.vehicles = [...filteredCloudVehs, ...pendingLocalVehs];
      }

      saveStoredData();
      if (!state.isPasswordRecoveryActive) {
        renderApp();
      }
      updateSyncIndicator();
      if (force) notify('Cloud data synchronized successfully!', 'success');
    } catch (e) {
      console.warn('Fetch data warning:', e);
      updateSyncIndicator();
    }
  }

  function setupRealtimeSubscriptions() {
    if (!state.supabaseClient) return;

    try {
      state.supabaseClient
        .channel('schema-db-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, payload => {
          handleStudentRealtimeChange(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'manifest_logs' }, payload => {
          handleManifestRealtimeChange(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, payload => {
          handleProfileRealtimeChange(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'fee_payments' }, payload => {
          handleFeePaymentRealtimeChange(payload);
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime subscription error:', e);
    }
  }

  function handleStudentRealtimeChange(payload) {
    if (payload.eventType === 'INSERT') {
      if (!state.data.students.some(s => s.id === payload.new.id)) {
        state.data.students.push(payload.new);
      }
    } else if (payload.eventType === 'UPDATE') {
      const idx = state.data.students.findIndex(s => s.id === payload.new.id);
      if (idx >= 0) state.data.students[idx] = payload.new;
    } else if (payload.eventType === 'DELETE') {
      state.data.students = state.data.students.filter(s => s.id !== payload.old.id);
    }
    saveStoredData();
    renderApp();
  }

  function handleManifestRealtimeChange(payload) {
    if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
      const idx = state.data.manifestLogs.findIndex(l => l.id === payload.new.id);
      if (idx >= 0) state.data.manifestLogs[idx] = payload.new;
      else state.data.manifestLogs.push(payload.new);
    } else if (payload.eventType === 'DELETE') {
      state.data.manifestLogs = state.data.manifestLogs.filter(l => l.id !== payload.old.id);
    }
    saveStoredData();
    renderApp();
  }

  function handleProfileRealtimeChange(payload) {
    if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
      const idx = state.data.staff.findIndex(s => s.id === payload.new.id);
      if (idx >= 0) state.data.staff[idx] = payload.new;
      else state.data.staff.push(payload.new);
    }
    saveStoredData();
    renderApp();
  }

  function handleFeePaymentRealtimeChange(payload) {
    if (payload.eventType === 'INSERT') {
      if (!state.data.feePayments.some(p => p.id === payload.new.id)) {
        state.data.feePayments.unshift(payload.new);
      }
    } else if (payload.eventType === 'UPDATE') {
      const idx = state.data.feePayments.findIndex(p => p.id === payload.new.id);
      if (idx >= 0) state.data.feePayments[idx] = payload.new;
    } else if (payload.eventType === 'DELETE') {
      state.data.feePayments = state.data.feePayments.filter(p => p.id !== payload.old.id);
    }
    saveStoredData();
    renderApp();
  }

  // ============================================================================
  // 3. INSTITUTIONAL AUDIT TRAIL LOGGING
  // ============================================================================

  async function logAuditAction(action, entityType, entityId, details = {}) {
    const user = state.currentUser || { id: null, email: 'system@eldohub.co.ke', role: 'system' };
    const logEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : 'audit_' + Date.now(),
      user_id: user.id,
      user_email: user.email,
      user_role: user.role,
      action: action,
      entity_type: entityType,
      entity_id: String(entityId || ''),
      details: details,
      created_at: new Date().toISOString()
    };

    state.data.auditLogs.unshift(logEntry);
    if (state.data.auditLogs.length > 300) state.data.auditLogs.pop();
    saveStoredData();

    if (state.supabaseClient && user.id && navigator.onLine) {
      try {
        await state.supabaseClient.from('audit_logs').insert([logEntry]);
      } catch (err) {
        enqueueOutbox('INSERT_AUDIT_LOG', logEntry);
      }
    } else if (user.id) {
      enqueueOutbox('INSERT_AUDIT_LOG', logEntry);
    }
  }

  // ============================================================================
  // 4. AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
  // ============================================================================

  function initPasswordToggles() {
    document.querySelectorAll('.btn-toggle-password').forEach(btn => {
      if (btn._hasToggleListener) return;
      btn._hasToggleListener = true;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        btn.innerHTML = isPassword 
          ? '<i data-lucide="eye-off" class="w-4 h-4 text-sky-600"></i>' 
          : '<i data-lucide="eye" class="w-4 h-4 text-slate-400"></i>';

        if (window.lucide) window.lucide.createIcons();
      });
    });
  }

  // ============================================================================
  // BRAND WELCOME CONFETTI MICRO-INTERACTION (NATIVE, ACCESSIBLE, OFFLINE)
  // ============================================================================

  function triggerWelcomeConfetti() {
    if (typeof window === 'undefined' || !document.body) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const authCard = document.querySelector('.auth-card') || document.getElementById('auth-gateway');
    const rect = authCard ? authCard.getBoundingClientRect() : null;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    const width = (canvas.width = window.innerWidth || 800);
    const height = (canvas.height = window.innerHeight || 600);

    // Anchor origin directly over the sign-in card
    const cardCenterX = rect ? (rect.left + rect.width / 2) : width / 2;
    const cardCenterY = rect ? (rect.top + rect.height * 0.45) : height / 2;

    // EldoHub Academy brand palette
    const colors = ['#008E80', '#D4AF37', '#5EEAD4', '#10B981', '#F59E0B', '#0C3B2E', '#F2D36B'];
    const particleCount = 60;
    const particles = [];

    // Burst particles radiating outward directly from the sign-in card
    for (let i = 0; i < particleCount; i++) {
      const angle = -Math.PI * 0.85 + Math.random() * Math.PI * 0.7;
      const speed = 4 + Math.random() * 8.5;

      particles.push({
        x: cardCenterX + (Math.random() - 0.5) * (rect ? Math.min(rect.width * 0.65, 240) : 100),
        y: cardCenterY + (Math.random() - 0.5) * 35,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 5,
        isRound: Math.random() > 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.1 + Math.random() * 0.1,
        opacity: 1,
        gravity: 0.28,
        drag: 0.95
      });
    }

    let animationFrame;
    const startTime = performance.now();
    const duration = 1900;

    function render(currentTime) {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.wobble += p.wobbleSpeed;

        if (elapsed > 900) {
          p.opacity = Math.max(0, 1 - (elapsed - 900) / 1000);
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        const w = p.size * Math.cos(p.wobble);
        const h = p.size;

        if (p.isRound) {
          ctx.beginPath();
          ctx.arc(0, 0, Math.abs(w) / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-w / 2, -h / 2, w, h);
        }
        ctx.restore();
      });

      if (elapsed < duration) {
        animationFrame = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrame);
        if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    }

    animationFrame = requestAnimationFrame(render);
  }

  function initAuthSystem() {
    const authGateway = document.getElementById('auth-gateway');
    const loginForm = document.getElementById('auth-login-form');
    const resetForm = document.getElementById('auth-reset-form');
    const tabSignIn = document.getElementById('auth-tab-signin');
    const tabReset = document.getElementById('auth-tab-reset');
    const tabsBar = document.getElementById('auth-tabs-bar');
    const updatePasswordForm = document.getElementById('auth-update-password-form');
    const roleSimulator = document.getElementById('auth-role-simulator');
    const btnSignoutHeader = document.getElementById('btn-header-signout');
    const btnSignoutSidebar = document.getElementById('btn-sidebar-signout');
    const btnSignoutDock = document.getElementById('dock-btn-signout');

    // Initialize password eye toggles
    initPasswordToggles();

    // Inline Auth Error Alert Controls (Sharp foreground alert above submit button)
    function showAuthError(message) {
      const alertBox = document.getElementById('auth-error-alert');
      const alertText = document.getElementById('auth-error-text');
      if (alertBox && alertText) {
        alertText.textContent = message;
        alertBox.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      }
    }

    function clearAuthError() {
      const alertBox = document.getElementById('auth-error-alert');
      if (alertBox) alertBox.classList.add('hidden');
    }

    function showResetError(message) {
      const alertBox = document.getElementById('auth-reset-error-alert');
      const alertText = document.getElementById('auth-reset-error-text');
      if (alertBox && alertText) {
        alertText.textContent = message;
        alertBox.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      }
    }

    function clearResetError() {
      const alertBox = document.getElementById('auth-reset-error-alert');
      if (alertBox) alertBox.classList.add('hidden');
    }

    function showUpdateError(message) {
      const alertBox = document.getElementById('auth-update-error-alert');
      const alertText = document.getElementById('auth-update-error-text');
      if (alertBox && alertText) {
        alertText.textContent = message;
        alertBox.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      }
    }

    function clearUpdateError() {
      const alertBox = document.getElementById('auth-update-error-alert');
      if (alertBox) alertBox.classList.add('hidden');
    }

    document.getElementById('auth-email')?.addEventListener('input', clearAuthError);
    document.getElementById('auth-password')?.addEventListener('input', clearAuthError);
    document.getElementById('auth-reset-email')?.addEventListener('input', clearResetError);
    document.getElementById('new-permanent-password')?.addEventListener('input', clearUpdateError);
    document.getElementById('confirm-permanent-password')?.addEventListener('input', clearUpdateError);

    // Display password setup form ONLY when arriving from email invitation/recovery
    function showPasswordRecoveryMode() {
      state.isPasswordRecoveryActive = true;
      if (authGateway) authGateway.classList.remove('hidden');
      if (tabsBar) tabsBar.classList.add('hidden');
      if (loginForm) loginForm.classList.add('hidden');
      if (resetForm) resetForm.classList.add('hidden');
      if (roleSimulator) roleSimulator.classList.add('hidden');
      if (updatePasswordForm) updatePasswordForm.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }
    window.showPasswordRecoveryModeGlobal = showPasswordRecoveryMode;

    // Tab switcher (2 tabs: Sign In & Forgot Password)
    tabSignIn?.addEventListener('click', () => {
      clearAuthError();
      clearResetError();
      tabSignIn.className = 'flex-1 py-2 rounded-lg bg-white text-slate-900 shadow-sm';
      tabReset.className = 'flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900';
      loginForm?.classList.remove('hidden');
      resetForm?.classList.add('hidden');
      updatePasswordForm?.classList.add('hidden');
      roleSimulator?.classList.remove('hidden');
      state.isPasswordRecoveryActive = false;
    });

    tabReset?.addEventListener('click', () => {
      clearAuthError();
      clearResetError();
      tabReset.className = 'flex-1 py-2 rounded-lg bg-white text-slate-900 shadow-sm';
      tabSignIn.className = 'flex-1 py-2 rounded-lg text-slate-600 hover:text-slate-900';
      resetForm?.classList.remove('hidden');
      loginForm?.classList.add('hidden');
      updatePasswordForm?.classList.add('hidden');
      roleSimulator?.classList.remove('hidden');
      state.isPasswordRecoveryActive = false;
    });

    // Check URL parameters: ONLY activate if arriving via email invite/recovery token
    if (state.isPasswordRecoveryActive) {
      showPasswordRecoveryMode();
    }

    // Check existing stored session and verify token validity with Supabase Auth
    try {
      const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedSession) {
        state.currentUser = JSON.parse(storedSession);
      }
      if (state.supabaseClient) {
        state.supabaseClient.auth.getSession().then(({ data: { session } }) => {
          if (!session && !state.isPasswordRecoveryActive) {
            state.currentUser = null;
            localStorage.removeItem(AUTH_STORAGE_KEY);
            renderApp();
          }
        }).catch(() => {});
      }
    } catch (e) {}

    // Form submission: Standard Sign In
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAuthError();
      const email = document.getElementById('auth-email').value.trim();
      const password = document.getElementById('auth-password').value;
      const submitBtn = document.getElementById('btn-auth-submit');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Authenticating...</span>';
      if (window.lucide) window.lucide.createIcons();

      let authenticatedStaff = null;

      // 1. Authenticate with Supabase Auth
      if (state.supabaseClient) {
        try {
          const { data, error } = await state.supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
          });

          if (error) {
            console.warn('Supabase login error:', error);
            showAuthError(`Supabase Login Failed: ${error.message}`);
            notify(`Supabase Login Failed: ${error.message}`, 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="log-in" class="w-4 h-4"></i><span>Sign In to Academy System</span>';
            if (window.lucide) window.lucide.createIcons();
            return;
          }

          if (data?.user) {
            // Fetch profile
            const { data: prof } = await state.supabaseClient
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (prof) {
              authenticatedStaff = prof;
            } else {
              authenticatedStaff = {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || email.split('@')[0],
                role: data.user.user_metadata?.role || 'super_admin',
                assigned_tracks: [],
                is_active: true,
                is_first_login: false
              };
              state.supabaseClient.from('profiles').upsert([authenticatedStaff], { onConflict: 'id' }).then(() => {}).catch(() => {});
            }
          }
        } catch (err) {
          console.warn('Supabase auth check:', err);
          showAuthError(`Authentication Error: ${err.message || 'Check network connection'}`);
          notify(`Authentication Error: ${err.message || 'Check network connection'}`, 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i data-lucide="log-in" class="w-4 h-4"></i><span>Sign In to Academy System</span>';
          if (window.lucide) window.lucide.createIcons();
          return;
        }
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="log-in" class="w-4 h-4"></i><span>Sign In to Academy System</span>';
      if (window.lucide) window.lucide.createIcons();

      if (authenticatedStaff) {
        if (!authenticatedStaff.is_active) {
          showAuthError('Account is deactivated. Please contact the Super Administrator.');
          notify('Account is deactivated. Please contact the Super Administrator.', 'error');
          return;
        }

        // Super Admin account NEVER enters password recovery loop
        if (authenticatedStaff.role === 'super_admin') {
          authenticatedStaff.is_first_login = false;
        }

        // Only first-time invited users with is_first_login true are prompted to set password
        if (authenticatedStaff.role !== 'super_admin' && authenticatedStaff.is_first_login === true) {
          showPasswordRecoveryMode();
          notify('First-time login: Please create your permanent password.', 'info');
          return;
        }

        // Standard user or Super Admin: route directly to role dashboard
        clearAuthError();
        state.isPasswordRecoveryActive = false;
        state.currentUser = authenticatedStaff;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedStaff));
        logAuditAction('STAFF_SIGN_IN', 'auth', authenticatedStaff.id, { email: authenticatedStaff.email });
        notify(`Welcome, ${authenticatedStaff.full_name} (${formatRoleName(authenticatedStaff.role)})!`, 'success');

        const submitBtn = document.getElementById('btn-auth-submit');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i><span>Authenticated!</span>';
          if (window.lucide) window.lucide.createIcons();
        }

        triggerWelcomeConfetti();

        setTimeout(async () => {
          applyRolePermissions();
          renderApp();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Authenticate & Enter</span><i data-lucide="arrow-right" class="w-4 h-4"></i>';
            if (window.lucide) window.lucide.createIcons();
          }
          await flushOutboxQueue();
          await fetchSupabaseData(true);
          renderApp();
        }, 600);
      } else {
        showAuthError('Invalid credentials or unregistered staff account.');
        notify('Invalid credentials or unregistered staff account.', 'error');
      }
    });

    // Form submission: Reset Password
    resetForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearResetError();
      const resetEmail = document.getElementById('auth-reset-email').value.trim();
      if (!resetEmail) return;

      if (state.supabaseClient) {
        try {
          const { error } = await state.supabaseClient.auth.resetPasswordForEmail(resetEmail);
          if (error) {
            showResetError(error.message);
            notify(`Password Reset Error: ${error.message}`, 'error');
            return;
          }
        } catch (err) {
          showResetError(err.message || 'Error sending password reset email');
          notify(`Password Reset Error: ${err.message || 'Error sending password reset email'}`, 'error');
          return;
        }
      }
      notify(`Password reset link dispatched to ${resetEmail}.`, 'info');
      tabSignIn.click();
    });

    // Sign out handlers
    const handleSignOut = async () => {
      if (confirm('Sign out of EldoHub Tech & AI Academy?')) {
        if (state.supabaseClient) {
          try {
            await state.supabaseClient.auth.signOut();
          } catch (e) {}
        }
        if (state.currentUser) {
          logAuditAction('STAFF_SIGN_OUT', 'auth', state.currentUser.id, { email: state.currentUser.email });
        }
        state.currentUser = null;
        localStorage.removeItem(AUTH_STORAGE_KEY);
        notify('Signed out successfully.', 'info');
        renderApp();
      }
    };

    btnSignoutHeader?.addEventListener('click', handleSignOut);
    btnSignoutSidebar?.addEventListener('click', handleSignOut);
    btnSignoutDock?.addEventListener('click', handleSignOut);

    // Automated Password Setup Handler (when user clicks invitation link in email)
    if (state.supabaseClient) {
      state.supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          showPasswordRecoveryMode();
        }
      });
    }

    updatePasswordForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearUpdateError();
      const p1 = document.getElementById('new-permanent-password').value;
      const p2 = document.getElementById('confirm-permanent-password').value;
      const submitBtn = document.getElementById('btn-submit-new-password');

      if (p1 !== p2) {
        showUpdateError('Passwords do not match. Please verify.');
        notify('Passwords do not match. Please verify.', 'error');
        return;
      }
      if (p1.length < 6) {
        showUpdateError('Password must be at least 6 characters.');
        notify('Password must be at least 6 characters.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Saving Password...</span>';
      if (window.lucide) window.lucide.createIcons();

      try {
        if (state.supabaseClient) {
          const { data, error } = await state.supabaseClient.auth.updateUser({ password: p1 });
          if (error) throw error;

          // Clear recovery tokens from the URL
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, document.title, window.location.pathname);
          }

          const user = data.user;
          let userProfile = null;
          if (user) {
            // Immediately sync is_first_login = false to database
            await state.supabaseClient
              .from('profiles')
              .update({ is_first_login: false, updated_at: new Date().toISOString() })
              .eq('id', user.id);

            const { data: prof } = await state.supabaseClient
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            userProfile = prof || {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email.split('@')[0],
              role: user.user_metadata?.role || 'instructor',
              assigned_tracks: [],
              is_active: true,
              is_first_login: false
            };
            userProfile.is_first_login = false;
          }

          state.isPasswordRecoveryActive = false;
          state.currentUser = userProfile;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));

          // Also sync local cache
          if (userProfile) {
            const localIdx = state.data.staff.findIndex(s => s.id === userProfile.id || s.email.toLowerCase() === userProfile.email.toLowerCase());
            if (localIdx >= 0) {
              state.data.staff[localIdx].is_first_login = false;
              saveStoredData();
            }
          }

          notify('Password successfully created! Welcome to EldoHub Academy.', 'success');
          triggerWelcomeConfetti();
          setTimeout(() => {
            applyRolePermissions();
            renderApp();
          }, 600);
        }
      } catch (err) {
        showUpdateError(`Password setup notice: ${err.message || 'Please retry'}`);
        notify(`Password setup notice: ${err.message || 'Please retry'}`, 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i data-lucide="check-circle-2" class="w-4 h-4"></i><span>Save Password & Enter Academy</span>';
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  function formatRoleName(role) {
    if (role === 'super_admin') return 'Super Admin';
    if (role === 'instructor') return 'Instructor';
    if (role === 'receptionist') return 'Receptionist';
    if (role === 'transport_officer') return 'Transport Officer';
    return role || 'Staff';
  }

  function applyRolePermissions() {
    const user = state.currentUser;
    if (!user) return;

    const role = user.role || 'staff';
    const isSuperAdmin = role === 'super_admin';
    const isInstructor = role === 'instructor';
    const isReceptionist = role === 'receptionist';
    const isTransport = role === 'transport_officer';

    // Set default active tab based on role
    if (isInstructor) {
      if (state.activeManifestType !== 'class_attendance') {
        state.activeManifestType = 'class_attendance';
      }
      if (user.assigned_tracks && user.assigned_tracks.length > 0 && (!state.activeTrack || state.activeTrack === 'all')) {
        state.activeTrack = user.assigned_tracks[0];
      }
    } else if (isTransport) {
      if (state.activeManifestType === 'class_attendance') {
        state.activeManifestType = 'morning_pickup';
      }
    }

    // Role-based visibility
    const navLogistics = document.getElementById('nav-section-logistics');
    const navReception = document.getElementById('nav-section-reception');
    const navAdmin = document.getElementById('nav-section-admin');
    const tabMorning = document.getElementById('tab-logistics-morning');
    const tabEvening = document.getElementById('tab-logistics-evening');
    const tabGate = document.getElementById('tab-logistics-gate');
    const tabClass = document.getElementById('tab-logistics-class');
    const btnOpenOnboard = document.getElementById('btn-open-onboarding');
    const headerBtnOnboard = document.getElementById('header-btn-onboard');
    const btnEmptyOnboard = document.getElementById('btn-empty-onboard');
    const dockBtnAdd = document.getElementById('dock-btn-add');
    const thRemoveCol = document.getElementById('th-remove-col');

    // 1. Institutional Admin Section (Staff & Permissions, Security & Audit Logs, Cloud Sync & Backups)
    // Strictly restricted to Super Admin only
    if (navAdmin) {
      navAdmin.style.display = isSuperAdmin ? 'block' : 'none';
    }

    // If a non-super-admin is currently on an administrative view, reset to operational manifests
    if (!isSuperAdmin && (state.activeViewModule === 'staff_management' || state.activeViewModule === 'audit_logs')) {
      state.activeViewModule = 'manifest_operations';
    }

    // 2. Finance & Fee Management (Super Admin & Receptionist only)
    const canAccessFees = isSuperAdmin || isReceptionist;
    const navFinance = document.getElementById('nav-section-finance');
    const dockBtnFees = document.getElementById('dock-btn-fees');
    if (navFinance) navFinance.style.display = canAccessFees ? 'block' : 'none';
    if (dockBtnFees) dockBtnFees.style.display = canAccessFees ? 'flex' : 'none';
    if (!canAccessFees && state.activeViewModule === 'fees_payments') {
      state.activeViewModule = 'manifest_operations';
    }

    // 3. Admissions & Records (New Student Admission Desk & Bulk CSV Import)
    // Only Super Admin and Receptionist have admissions privileges
    const canAdmitStudents = isSuperAdmin || isReceptionist;
    const headerBtnBulkImport = document.getElementById('header-btn-bulk-import');
    const toolbarBtnBulkImport = document.getElementById('toolbar-btn-bulk-import');
    const sidebarBtnBulkImport = document.getElementById('btn-sidebar-bulk-import');

    if (btnOpenOnboard) btnOpenOnboard.style.display = canAdmitStudents ? 'flex' : 'none';
    if (headerBtnOnboard) headerBtnOnboard.style.display = canAdmitStudents ? 'inline-flex' : 'none';
    if (btnEmptyOnboard) btnEmptyOnboard.style.display = canAdmitStudents ? 'inline-flex' : 'none';
    if (dockBtnAdd) dockBtnAdd.style.display = canAdmitStudents ? 'flex' : 'none';
    if (headerBtnBulkImport) headerBtnBulkImport.style.display = canAdmitStudents ? 'inline-flex' : 'none';
    if (toolbarBtnBulkImport) toolbarBtnBulkImport.style.display = canAdmitStudents ? 'inline-flex' : 'none';
    if (sidebarBtnBulkImport) sidebarBtnBulkImport.style.display = canAdmitStudents ? 'flex' : 'none';

    // Student record deletion: Super Admin only
    if (thRemoveCol) thRemoveCol.style.display = isSuperAdmin ? 'table-cell' : 'none';

    // 3. Daily Operations & Fleet (Logistics manifests)
    if (navLogistics) navLogistics.style.display = 'block';

    if (isInstructor) {
      // Instructors: Class Attendance only
      if (tabMorning) tabMorning.style.display = 'none';
      if (tabEvening) tabEvening.style.display = 'none';
      if (tabGate) tabGate.style.display = 'none';
      if (tabClass) tabClass.style.display = 'flex';
    } else if (isTransport) {
      // Transport Officers: Morning bus, Evening bus, and Gate / Parent Carline
      if (tabMorning) tabMorning.style.display = 'flex';
      if (tabEvening) tabEvening.style.display = 'flex';
      if (tabGate) tabGate.style.display = 'flex';
      if (tabClass) tabClass.style.display = 'none';
    } else if (isReceptionist || isSuperAdmin) {
      // Receptionist & Super Admin: Access to all operational items
      if (tabMorning) tabMorning.style.display = 'flex';
      if (tabEvening) tabEvening.style.display = 'flex';
      if (tabGate) tabGate.style.display = 'flex';
      if (tabClass) tabClass.style.display = 'flex';
    } else {
      // Standard Staff / Regular Users: Permitted operational items
      if (tabMorning) tabMorning.style.display = 'flex';
      if (tabEvening) tabEvening.style.display = 'flex';
      if (tabGate) tabGate.style.display = 'flex';
      if (tabClass) tabClass.style.display = 'flex';
    }
  }

  // ============================================================================
  // 5. SLIDESHOW (3-SECOND KEN BURNS CYCLE)
  // ============================================================================

  function initBackgroundSlideshow() {
    const slides = document.querySelectorAll('.slide-item');
    if (!slides || slides.length === 0) return;

    let currentIndex = 0;
    setInterval(() => {
      slides[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add('active');
    }, 3000);
  }

  // ============================================================================
  // 6. UI RENDERING & COMPONENT ORCHESTRATION
  // ============================================================================

  function renderApp() {
    const authGateway = document.getElementById('auth-gateway');
    const appShell = document.getElementById('app-shell');

    // If password recovery is active, ensure the recovery form remains visible!
    if (state.isPasswordRecoveryActive) {
      if (authGateway) authGateway.classList.remove('hidden');
      if (appShell) appShell.style.display = 'none';
      if (typeof window.showPasswordRecoveryModeGlobal === 'function') {
        window.showPasswordRecoveryModeGlobal();
      }
      return;
    }

    // Authentication Guard
    if (!state.currentUser) {
      if (authGateway) authGateway.classList.remove('hidden');
      if (appShell) appShell.style.display = 'none';
      return;
    }

    if (authGateway) authGateway.classList.add('hidden');
    if (appShell) appShell.style.display = 'flex';

    applyRolePermissions();
    updateUserProfileUI();
    renderNavigation();
    renderBranchControls();

    const viewManifest = document.getElementById('view-manifest-operations');
    const viewStaff = document.getElementById('view-staff-management');
    const viewAudit = document.getElementById('view-audit-logs');
    const viewFees = document.getElementById('view-fees-payments');

    if (state.activeViewModule === 'staff_management') {
      if (viewManifest) viewManifest.classList.add('hidden');
      if (viewStaff) viewStaff.classList.remove('hidden');
      if (viewAudit) viewAudit.classList.add('hidden');
      if (viewFees) viewFees.classList.add('hidden');
      renderStaffTable();
    } else if (state.activeViewModule === 'audit_logs') {
      if (viewManifest) viewManifest.classList.add('hidden');
      if (viewStaff) viewStaff.classList.add('hidden');
      if (viewAudit) viewAudit.classList.remove('hidden');
      if (viewFees) viewFees.classList.add('hidden');
      renderAuditLogsTable();
    } else if (state.activeViewModule === 'fees_payments') {
      if (viewManifest) viewManifest.classList.add('hidden');
      if (viewStaff) viewStaff.classList.add('hidden');
      if (viewAudit) viewAudit.classList.add('hidden');
      if (viewFees) viewFees.classList.remove('hidden');
      renderFeesDashboard();
    } else {
      if (viewManifest) viewManifest.classList.remove('hidden');
      if (viewStaff) viewStaff.classList.add('hidden');
      if (viewAudit) viewAudit.classList.add('hidden');
      if (viewFees) viewFees.classList.add('hidden');
      renderManifestTable();
      updateKPIs();
      updateSidebarBadges();
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
    initPasswordToggles();
  }

  function updateUserProfileUI() {
    const user = state.currentUser;
    if (!user) return;

    const initial = (user.full_name || user.email || 'A').charAt(0).toUpperCase();
    const formattedRole = formatRoleName(user.role);

    const hAvatar = document.getElementById('header-staff-avatar');
    const hName = document.getElementById('header-staff-name');
    const hBadge = document.getElementById('header-staff-badge');
    const sAvatar = document.getElementById('sidebar-staff-avatar');
    const sName = document.getElementById('sidebar-staff-name');
    const sRole = document.getElementById('sidebar-staff-role');

    if (hAvatar) hAvatar.textContent = initial;
    if (hName) hName.textContent = user.full_name;
    if (hBadge) {
      hBadge.textContent = formattedRole;
      hBadge.className = `role-badge ${user.role} text-[9px] py-0 px-1.5`;
    }

    if (sAvatar) sAvatar.textContent = initial;
    if (sName) sName.textContent = user.full_name;
    if (sRole) sRole.textContent = formattedRole;
  }

  function renderNavigation() {
    const dockBootcamp = document.getElementById('dock-btn-bootcamp');
    const dockFees = document.getElementById('dock-btn-fees');

    if (state.activeViewModule === 'fees_payments') {
      dockFees?.classList.add('text-emerald-600');
      dockFees?.classList.remove('text-slate-500');
      dockBootcamp?.classList.remove('text-sky-600');
      dockBootcamp?.classList.add('text-slate-500');
    } else {
      dockBootcamp?.classList.add('text-sky-600');
      dockBootcamp?.classList.remove('text-slate-500');
      dockFees?.classList.remove('text-emerald-600');
      dockFees?.classList.add('text-slate-500');
    }

    const topTitle = document.getElementById('top-view-title');
    const topBranchPill = document.getElementById('top-branch-pill');

    if (topBranchPill) {
      topBranchPill.textContent = 'Tech & AI Bootcamps';
    }

    if (topTitle) {
      if (state.activeViewModule === 'fees_payments') {
        topTitle.textContent = 'Bootcamp Fees & Revenue Operations';
      } else if (state.activeViewModule === 'staff_management') {
        topTitle.textContent = 'Staff & Authorization Management';
      } else if (state.activeViewModule === 'audit_logs') {
        topTitle.textContent = 'Institutional Security & Audit Trail';
      } else {
        if (state.activeManifestType === 'morning_pickup') topTitle.textContent = 'Morning Pick-up Bus Manifest';
        else if (state.activeManifestType === 'evening_dropoff') topTitle.textContent = 'Evening Drop-off Bus Manifest';
        else if (state.activeManifestType === 'gate_pickup') topTitle.textContent = 'Gate / Parent Carline Register';
        else topTitle.textContent = 'Class Attendance Register';
      }
    }

    const navItems = [
      { id: 'tab-logistics-morning', type: 'morning_pickup' },
      { id: 'tab-logistics-evening', type: 'evening_dropoff' },
      { id: 'tab-logistics-gate', type: 'gate_pickup' },
      { id: 'tab-logistics-class', type: 'class_attendance' }
    ];

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        if (state.activeViewModule === 'manifest_operations' && state.activeManifestType === item.type) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    });

    const staffTab = document.getElementById('tab-nav-staff');
    const auditTab = document.getElementById('tab-nav-audit');
    const feesTab = document.getElementById('tab-nav-fees');

    if (feesTab) {
      if (state.activeViewModule === 'fees_payments') feesTab.classList.add('active');
      else feesTab.classList.remove('active');
    }
    if (staffTab) {
      if (state.activeViewModule === 'staff_management') staffTab.classList.add('active');
      else staffTab.classList.remove('active');
    }
    if (auditTab) {
      if (state.activeViewModule === 'audit_logs') auditTab.classList.add('active');
      else auditTab.classList.remove('active');
    }
  }

  function updateSidebarBadges() {
    const students = state.data.students.filter(s => !state.activeCohort || s.cohort === state.activeCohort);

    const morningCount = students.filter(s => s.transport_mode === 'morning_bus' || s.transport_mode === 'both').length;
    const eveningCount = students.filter(s => s.transport_mode === 'evening_bus' || s.transport_mode === 'both').length;
    const gateCount = students.filter(s => s.transport_mode === 'parent_pickup' || s.transport_mode === 'self_arrival').length;
    const classCount = students.length;

    const bMorning = document.getElementById('badge-nav-morning');
    const bEvening = document.getElementById('badge-nav-evening');
    const bGate = document.getElementById('badge-nav-gate');
    const bClass = document.getElementById('badge-nav-class');
    const bFees = document.getElementById('badge-nav-fees');

    if (bMorning) bMorning.textContent = morningCount;
    if (bEvening) bEvening.textContent = eveningCount;
    if (bGate) bGate.textContent = gateCount;
    if (bClass) bClass.textContent = classCount;

    if (bFees) {
      const unpaidCount = state.data.students.filter(s => (s.balance_due || 0) > 0).length;
      bFees.textContent = unpaidCount > 0 ? `${unpaidCount} Due` : 'KES';
    }
  }

  function getActiveVehicles() {
    if (!state.data.vehicles || !Array.isArray(state.data.vehicles)) {
      state.data.vehicles = JSON.parse(JSON.stringify(DEFAULT_STATE.vehicles));
    }
    return state.data.vehicles.filter(v => v.is_active !== false);
  }

  function renderBranchControls() {
    const isAttendance = state.activeManifestType === 'class_attendance';
    const isTransportManifest = !isAttendance && (state.activeManifestType === 'morning_pickup' || state.activeManifestType === 'evening_dropoff');

    // Cohorts
    const cohortContainer = document.getElementById('cohort-switcher-container');
    if (cohortContainer) {
      cohortContainer.innerHTML = '';
      const cohorts = state.data.cohorts.bootcamp || [];
      cohorts.forEach(cohort => {
        const isActive = state.activeCohort === cohort;
        const btn = document.createElement('button');
        btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          isActive
            ? 'bg-sky-600 text-white shadow-sm'
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

    // Tracks
    const trackContainer = document.getElementById('track-pills-container');
    if (trackContainer) {
      trackContainer.innerHTML = '';
      
      const allBtn = document.createElement('button');
      allBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
        state.activeTrack === 'all'
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
      }`;
      allBtn.textContent = 'All Tracks';
      allBtn.onclick = () => {
        state.activeTrack = 'all';
        renderApp();
      };
      trackContainer.appendChild(allBtn);

      const tracks = state.data.tracks.bootcamp || [];
      tracks.forEach(track => {
        const isActive = state.activeTrack === track;
        const btn = document.createElement('button');
        btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
          isActive
            ? 'bg-indigo-600 text-white shadow-sm'
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

    // Fleet Vehicles (Prominently rendered for Transport Pick-up & Drop-off manifests)
    const vehicleControls = document.getElementById('manifest-vehicle-controls');
    const vehicleDivider = document.getElementById('manifest-vehicle-divider');
    const vehicleContainer = document.getElementById('vehicle-pills-container');

    if (vehicleControls && vehicleDivider) {
      if (isTransportManifest) {
        vehicleControls.classList.remove('hidden');
        vehicleDivider.classList.remove('hidden');
      } else {
        vehicleControls.classList.add('hidden');
        vehicleDivider.classList.add('hidden');
      }
    }

    if (vehicleContainer) {
      vehicleContainer.innerHTML = '';
      const activeVehicles = getActiveVehicles();

      // "All Vehicles" Pill
      const allVehBtn = document.createElement('button');
      allVehBtn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all ${
        state.activeVehicle === 'all'
          ? 'bg-amber-600 text-white shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
      }`;
      allVehBtn.textContent = 'All Vehicles';
      allVehBtn.onclick = () => {
        state.activeVehicle = 'all';
        renderApp();
      };
      vehicleContainer.appendChild(allVehBtn);

      activeVehicles.forEach(veh => {
        const isActive = state.activeVehicle === veh.name;
        // Count how many students assigned to this vehicle in this cohort
        const assignedCount = state.data.students.filter(s => 
          (!state.activeCohort || s.cohort === state.activeCohort) &&
          (s.assigned_vehicle === veh.name) &&
          (s.transport_mode === 'both' || s.transport_mode === 'morning_bus' || s.transport_mode === 'evening_bus')
        ).length;

        const btn = document.createElement('button');
        btn.className = `touch-btn h-8 px-3 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
          isActive
            ? 'bg-amber-600 text-white shadow-sm'
            : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
        }`;
        btn.innerHTML = `<span>${escapeHTML(veh.name)}</span><span class="px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-amber-700 text-amber-100' : 'bg-slate-200 text-slate-700'}">${assignedCount}</span>`;
        btn.onclick = () => {
          state.activeVehicle = veh.name;
          renderApp();
        };
        vehicleContainer.appendChild(btn);
      });
    }

    const dateInput = document.getElementById('manifest-date-input');
    if (dateInput) dateInput.value = state.activeDate;
  }

  function getFilteredStudents() {
    const isAttendance = state.activeManifestType === 'class_attendance';
    const isTransportManifest = !isAttendance && (state.activeManifestType === 'morning_pickup' || state.activeManifestType === 'evening_dropoff');
    const user = state.currentUser;

    return state.data.students
      .filter(s => {
        if (state.activeCohort && s.cohort !== state.activeCohort) return false;
        if (state.activeTrack !== 'all' && s.track !== state.activeTrack) return false;

        // Instructor scope restriction
        if (user && user.role === 'instructor' && user.assigned_tracks && user.assigned_tracks.length > 0) {
          if (!user.assigned_tracks.includes(s.track)) return false;
        }

        if (state.activeManifestType === 'morning_pickup') {
          if (s.transport_mode !== 'morning_bus' && s.transport_mode !== 'both') return false;
        } else if (state.activeManifestType === 'evening_dropoff') {
          if (s.transport_mode !== 'evening_bus' && s.transport_mode !== 'both') return false;
        } else if (state.activeManifestType === 'gate_pickup') {
          if (s.transport_mode !== 'parent_pickup' && s.transport_mode !== 'self_arrival') return false;
        }

        // Vehicle Filter on Transport Manifests
        if (isTransportManifest && state.activeVehicle && state.activeVehicle !== 'all') {
          if ((s.assigned_vehicle || '') !== state.activeVehicle) return false;
        }

        if (state.searchQuery.trim()) {
          const q = state.searchQuery.toLowerCase().trim();
          const matchName = (s.name || '').toLowerCase().includes(q);
          const matchPhone = (s.phone || '').toLowerCase().includes(q);
          const matchRes = (s.residence || '').toLowerCase().includes(q);
          const matchTrack = (s.track || '').toLowerCase().includes(q);
          const matchVeh = (s.assigned_vehicle || '').toLowerCase().includes(q);
          if (!matchName && !matchPhone && !matchRes && !matchTrack && !matchVeh) return false;
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

  async function setStudentManifestStatus(studentId, targetStatus) {
    const user = state.currentUser;
    if (!user) return;

    // RBAC Permissions Check
    if (user.role === 'receptionist') {
      notify('Receptionist role cannot record attendance or transport changes.', 'error');
      return;
    }
    if (user.role === 'transport_officer' && state.activeManifestType === 'class_attendance') {
      notify('Transport officers cannot modify class attendance.', 'error');
      return;
    }
    if (user.role === 'instructor' && state.activeManifestType !== 'class_attendance') {
      notify('Instructors cannot modify transport manifests.', 'error');
      return;
    }

    const existingIndex = state.data.manifestLogs.findIndex(
      l => l.student_id === studentId && l.date === state.activeDate && l.type === state.activeManifestType
    );

    const logRecord = {
      id: (existingIndex >= 0 ? state.data.manifestLogs[existingIndex].id : crypto.randomUUID ? crypto.randomUUID() : 'log_' + Date.now()),
      student_id: studentId,
      date: state.activeDate,
      type: state.activeManifestType,
      status: targetStatus,
      recorded_by: user.id,
      recorded_by_name: user.full_name,
      logged_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      notes: ''
    };

    if (existingIndex >= 0) {
      state.data.manifestLogs[existingIndex] = logRecord;
    } else {
      state.data.manifestLogs.push(logRecord);
    }

    saveStoredData();

    // Audit logging
    const actionType = state.activeManifestType === 'class_attendance' ? 'MARK_ATTENDANCE' : 'MARK_TRANSPORT';
    const student = state.data.students.find(s => s.id === studentId);
    logAuditAction(actionType, 'manifest_log', studentId, {
      student_name: student ? student.name : '',
      manifest: state.activeManifestType,
      status: targetStatus,
      date: state.activeDate
    });

    enqueueOutbox('UPSERT_MANIFEST_LOG', logRecord);
    flushOutboxQueue();

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
    const thRemoveCol = document.getElementById('th-remove-col');

    const isAttendance = state.activeManifestType === 'class_attendance';
    const students = getFilteredStudents();
    const user = state.currentUser;
    const canDelete = user && user.role === 'super_admin';
    const canManageFleet = user && (user.role === 'super_admin' || user.role === 'transport_officer');
    const activeVehicles = getActiveVehicles();

    if (thRemoveCol) {
      thRemoveCol.style.display = canDelete ? 'table-cell' : 'none';
    }

    transportHeaderCols.forEach(col => {
      if (!isAttendance) {
        col.classList.remove('hidden');
      } else {
        col.classList.add('hidden');
      }
    });

    if (state.activeManifestType === 'morning_pickup') {
      headingText.textContent = 'Morning Pick-up Bus Manifest';
      headingIcon.innerHTML = '<i data-lucide="bus" class="w-5 h-5 text-sky-600"></i>';
      subheadingText.textContent = 'EldoHub Fleet Operations • Alphabetical (A"“Z) Checklist';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Picked Up';
      if (thChecklistCol) thChecklistCol.textContent = 'Pick-up Checklist';
    } else if (state.activeManifestType === 'evening_dropoff') {
      headingText.textContent = 'Evening Drop-off Bus Manifest';
      headingIcon.innerHTML = '<i data-lucide="bus-front" class="w-5 h-5 text-blue-600"></i>';
      subheadingText.textContent = 'EldoHub Dismissal Boarding • Alphabetical (A"“Z) Checklist';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Dropped Off';
      if (thChecklistCol) thChecklistCol.textContent = 'Drop-off Checklist';
    } else if (state.activeManifestType === 'gate_pickup') {
      headingText.textContent = 'Gate / Parent Carline Register';
      headingIcon.innerHTML = '<i data-lucide="shield-check" class="w-5 h-5 text-emerald-600"></i>';
      subheadingText.textContent = 'Gate Arrival & Dismissal Checklist \u2022 Alphabetical (A\u2013Z)';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Checked In';
      if (thChecklistCol) thChecklistCol.textContent = 'Gate Check-in';
    } else {
      headingText.textContent = 'Bootcamp Class Attendance Register';
      headingIcon.innerHTML = '<i data-lucide="clipboard-check" class="w-5 h-5 text-purple-600"></i>';
      subheadingText.textContent = 'Daily Bootcamp Class Attendance \u2022 Two-Box Checklist (Present / Absent)';
      if (batchActionLabel) batchActionLabel.textContent = 'Mark All Present';
      if (thChecklistCol) thChecklistCol.textContent = 'Attendance (Present / Absent)';
    }

    if (countPill) {
      countPill.textContent = `${students.length} Student${students.length === 1 ? '' : 's'}`;
    }

    if (students.length === 0) {
      if (tbody) tbody.innerHTML = '';
      emptyState?.classList.remove('hidden');

      const emptyTitle = emptyState?.querySelector('h4');
      const emptyDesc = emptyState?.querySelector('p');
      if (state.data.students.length > 0) {
        if (state.activeManifestType === 'morning_pickup' || state.activeManifestType === 'evening_dropoff') {
          if (emptyTitle) emptyTitle.textContent = 'No Students on this Bus Manifest';
          if (emptyDesc) {
            emptyDesc.innerHTML = `You have <strong class="text-white">${state.data.students.length}</strong> total enrolled student(s). If they arrive by walk-in or parent drop-off, view them on <a href="#" id="link-switch-attendance" class="text-teal-300 font-bold underline">Class Attendance</a> or <a href="#" id="link-switch-gate" class="text-teal-300 font-bold underline">Gate Register</a>.`;
            document.getElementById('link-switch-attendance')?.addEventListener('click', (e) => {
              e.preventDefault();
              state.activeManifestType = 'class_attendance';
              renderApp();
            });
            document.getElementById('link-switch-gate')?.addEventListener('click', (e) => {
              e.preventDefault();
              state.activeManifestType = 'gate_pickup';
              renderApp();
            });
          }
        } else {
          if (emptyTitle) emptyTitle.textContent = 'No Students in this View';
          if (emptyDesc) emptyDesc.textContent = 'Try adjusting your track or cohort filters above.';
        }
      } else {
        if (emptyTitle) emptyTitle.textContent = 'No Students in this Manifest';
        if (emptyDesc) emptyDesc.textContent = 'All rosters start completely clean. Use the Admission Desk or Bulk CSV to register students.';
      }
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

      // Inline Fee Status Badge
      const feeStatus = student.payment_status || ((student.amount_paid || 0) >= (student.total_fee || 0) ? 'Paid' : ((student.amount_paid || 0) > 0 ? 'Partial' : 'Unpaid'));
      let feeBadgeHTML = '';
      if (feeStatus === 'Paid') {
        feeBadgeHTML = '<span class="badge-fee-paid text-[10px] px-2 py-0.5 rounded-full font-bold">Paid</span>';
      } else if (feeStatus === 'Partial') {
        feeBadgeHTML = `<span class="badge-fee-partial text-[10px] px-2 py-0.5 rounded-full font-bold">Bal KES ${(student.balance_due || 0).toLocaleString()}</span>`;
      } else {
        feeBadgeHTML = '<span class="badge-fee-unpaid text-[10px] px-2 py-0.5 rounded-full font-bold">Unpaid</span>';
      }

      if (tbody) {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';

        let actionCellHTML = '';

        if (isAttendance) {
          const isPresent = currentStatus === 'present';
          const isAbsent = currentStatus === 'absent';

          actionCellHTML = `
            <div class="flex items-center justify-center gap-2">
              <button data-student-id="${student.id}" data-status="present" class="checklist-btn touch-btn ${
                isPresent
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
              }" title="Mark Present">
                <span class="text-sm font-black">${isPresent ? '✓' : '✓'}</span>
                <span>Present</span>
              </button>

              <button data-student-id="${student.id}" data-status="absent" class="checklist-btn touch-btn ${
                isAbsent
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-600'
                  : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-rose-500 hover:text-rose-700'
              }" title="Mark Absent">
                <span class="text-sm font-black">✗</span>
                <span>Absent</span>
              </button>
            </div>
          `;
        } else if (state.activeManifestType === 'morning_pickup') {
          const isPickedUp = currentStatus === 'picked_up';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="morning" class="single-check-btn touch-btn ${
                isPickedUp
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Pick-up state">
                <span class="text-base font-black">${isPickedUp ? '✓' : '✗'}</span>
                <span>${isPickedUp ? 'Picked Up' : 'Not Picked Up'}</span>
              </button>
            </div>
          `;
        } else if (state.activeManifestType === 'evening_dropoff') {
          const isDroppedOff = currentStatus === 'dropped_off';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="evening" class="single-check-btn touch-btn ${
                isDroppedOff
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Drop-off state">
                <span class="text-base font-black">${isDroppedOff ? '✓' : '✗'}</span>
                <span>${isDroppedOff ? 'Dropped Off' : 'Not Dropped Off'}</span>
              </button>
            </div>
          `;
        } else {
          const isCheckedIn = currentStatus === 'checked_in';

          actionCellHTML = `
            <div class="flex items-center justify-center">
              <button data-student-id="${student.id}" data-toggle-type="gate" class="single-check-btn touch-btn ${
                isCheckedIn
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-600'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300'
              }" title="Click to toggle Gate Check-in state">
                <span class="text-base font-black">${isCheckedIn ? '✓' : '✗'}</span>
                <span>${isCheckedIn ? 'Checked In' : 'Not Checked In'}</span>
              </button>
            </div>
          `;
        }

        tr.innerHTML = `
          <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-bold">${index + 1}</td>
          
          <td class="py-3.5 px-4">
            <div class="font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
              <span class="student-clickable-name text-slate-900 hover:text-sky-600 cursor-pointer transition-colors underline-offset-2 hover:underline" data-profile-id="${student.id}" title="View Student Profile & Fee Ledger">${escapeHTML(student.name)}</span>
              ${feeBadgeHTML}
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

          ${!isAttendance ? `
            <td class="py-3.5 px-4 text-xs text-slate-700 th-transport-col">
              <div class="flex items-center gap-1.5">
                ${canManageFleet ? `
                  <select data-student-id="${student.id}" class="select-assigned-vehicle text-xs font-bold py-1 px-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-sm" title="Reassign Vehicle / Route">
                    <option value="">Unassigned</option>
                    ${activeVehicles.map(v => `<option value="${escapeHTML(v.name)}" ${(student.assigned_vehicle === v.name) ? 'selected' : ''}>${escapeHTML(v.name)} (${v.type.toUpperCase()})</option>`).join('')}
                  </select>
                ` : `
                  <span class="route-badge ${student.assigned_vehicle ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}">
                    <i data-lucide="bus" class="w-3 h-3 inline mr-1 text-amber-600"></i>
                    ${escapeHTML(student.assigned_vehicle || routeCode)}
                  </span>
                `}
              </div>
            </td>
          ` : ''}

          <td class="py-3.5 px-4 text-center">
            ${actionCellHTML}
          </td>

          ${canDelete ? `
            <td class="py-3.5 px-4 text-right">
              <button data-delete-id="${student.id}" class="delete-student-btn touch-btn w-9 h-9 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center justify-center" title="Remove student">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </td>
          ` : ''}
        `;
        tbody.appendChild(tr);
      }
    });

    // Wire student profile click handlers
    document.querySelectorAll('.student-clickable-name').forEach(el => {
      el.addEventListener('click', () => {
        const studentId = el.getAttribute('data-profile-id');
        openStudentProfileDrawer(studentId);
      });
    });

    // Wire assigned vehicle selectors
    document.querySelectorAll('.select-assigned-vehicle').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const studentId = sel.getAttribute('data-student-id');
        assignStudentVehicle(studentId, e.target.value);
      });
    });

    // Wire checklist buttons
    document.querySelectorAll('.checklist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        const targetStatus = btn.getAttribute('data-status');
        setStudentManifestStatus(studentId, targetStatus);
      });
    });

    document.querySelectorAll('.single-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-student-id');
        const toggleType = btn.getAttribute('data-toggle-type');
        const current = getStudentStatus(studentId);
        let next;
        if (toggleType === 'morning') next = current === 'picked_up' ? 'absent' : 'picked_up';
        else if (toggleType === 'evening') next = current === 'dropped_off' ? 'absent' : 'dropped_off';
        else next = current === 'checked_in' ? 'absent' : 'checked_in';
        setStudentManifestStatus(studentId, next);
      });
    });

    document.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-delete-id');
        deleteStudent(studentId);
      });
    });
  }

  async function assignStudentVehicle(studentId, vehicleName) {
    const user = state.currentUser;
    if (!user || (user.role !== 'super_admin' && user.role !== 'transport_officer')) {
      notify('Only Transport Officers and Super Administrators can assign vehicles.', 'error');
      return;
    }

    const student = state.data.students.find(s => s.id === studentId);
    if (!student) return;

    student.assigned_vehicle = vehicleName;
    saveStoredData();

    logAuditAction('ASSIGN_VEHICLE', 'transport', studentId, {
      student_name: student.name,
      assigned_vehicle: vehicleName || 'Unassigned'
    });

    enqueueOutbox('ASSIGN_VEHICLE', { studentId, vehicleName });
    flushOutboxQueue();

    notify(`${student.name} assigned to ${vehicleName || 'Unassigned route'}`, 'success');
    renderManifestTable();
    renderBranchControls();
    updateKPIs();
  }

  function deleteStudent(studentId) {
    const user = state.currentUser;
    if (!user || user.role !== 'super_admin') {
      notify('Access Denied: Only Super Administrators can delete student records.', 'error');
      return;
    }

    const student = state.data.students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Permanently remove student "${student.name}" from EldoHub Academy records?`)) {
      state.data.students = state.data.students.filter(s => s.id !== studentId);
      state.data.manifestLogs = state.data.manifestLogs.filter(l => l.student_id !== studentId);
      saveStoredData();

      logAuditAction('DELETE_STUDENT', 'student', studentId, { name: student.name });

      enqueueOutbox('DELETE_STUDENT', { id: studentId });
      flushOutboxQueue();

      notify(`Student ${student.name} permanently removed.`, 'info');
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

    students.forEach(s => {
      const st = getStudentStatus(s.id);
      if (isAttendance && st === 'present') completed++;
      else if (isMorning && st === 'picked_up') completed++;
      else if (isEvening && st === 'dropped_off') completed++;
      else if (!isAttendance && !isMorning && !isEvening && st === 'checked_in') completed++;
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
      if (elCompletedLabel) elCompletedLabel.textContent = 'Present (✓)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Marked Present';
      if (elPendingLabel) elPendingLabel.textContent = 'Absent (✗)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Marked Absent';
    } else if (isMorning) {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Picked Up (✓)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Bus Boarded';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Picked Up (✗)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Pick-up';
    } else if (isEvening) {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Dropped Off (✓)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Safely Disembarked';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Dropped Off (✗)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Drop-off';
    } else {
      if (elCompletedLabel) elCompletedLabel.textContent = 'Checked In (✓)';
      if (elCompletedSublabel) elCompletedSublabel.textContent = 'Gate Verified';
      if (elPendingLabel) elPendingLabel.textContent = 'Not Checked In (✗)';
      if (elPendingSublabel) elPendingSublabel.textContent = 'Pending Arrival';
    }
  }

  // ============================================================================
  // 7. STAFF MANAGEMENT ENGINE (SUPER ADMIN ONLY)
  // ============================================================================

  function renderStaffTable() {
    const tbody = document.getElementById('staff-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const staffList = state.data.staff || [];
    staffList.forEach((st, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';

      const tracksList = (st.assigned_tracks && st.assigned_tracks.length > 0)
        ? st.assigned_tracks.join(', ')
        : (st.role === 'instructor' ? 'All Assigned Classes' : 'Universal Campus Access');

      tr.innerHTML = `
        <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-bold">${idx + 1}</td>
        <td class="py-3.5 px-4">
          <div class="font-extrabold text-slate-900">${escapeHTML(st.full_name)}</div>
          <div class="text-xs font-mono text-slate-500 font-medium">${escapeHTML(st.email)}</div>
        </td>
        <td class="py-3.5 px-4">
          <span class="role-badge ${st.role}">${formatRoleName(st.role)}</span>
        </td>
        <td class="py-3.5 px-4 text-xs text-slate-600 font-medium max-w-xs truncate">
          ${escapeHTML(tracksList)}
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
            st.is_active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }">
            <span class="w-1.5 h-1.5 rounded-full ${st.is_active ? 'bg-emerald-500' : 'bg-slate-400'}"></span>
            ${st.is_active ? 'Active' : 'Deactivated'}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right space-x-2">
          <button data-resend-link="${escapeHTML(st.email)}" class="touch-btn h-8 px-2.5 rounded-lg text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 inline-flex items-center gap-1.5" title="Send or resend automated password setup link">
            <i data-lucide="mail" class="w-3.5 h-3.5 text-sky-600"></i>
            <span>Email Link</span>
          </button>
          <button data-toggle-staff="${st.id}" class="touch-btn h-8 px-2.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200">
            ${st.is_active ? 'Deactivate' : 'Activate'}
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire Resend Password Link buttons
    tbody.querySelectorAll('[data-resend-link]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const email = btn.getAttribute('data-resend-link');
        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Sending...</span>';
        if (window.lucide) window.lucide.createIcons();

        try {
          if (state.supabaseClient) {
            const { error } = await state.supabaseClient.auth.resetPasswordForEmail(email, {
              redirectTo: window.location.origin
            });
            if (error) throw error;
          }
          notify(`Automated password setup link dispatched to ${email}!`, 'success');
        } catch (err) {
          notify(`Notice: ${err.message || 'Could not dispatch email'}`, 'warning');
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });

    // Wire deactivate/activate buttons
    tbody.querySelectorAll('[data-toggle-staff]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-toggle-staff');
        const st = state.data.staff.find(s => s.id === id);
        if (!st) return;
        if (st.email === state.currentUser?.email) {
          notify('Cannot deactivate your own administrator account.', 'error');
          return;
        }

        st.is_active = !st.is_active;
        saveStoredData();
        logAuditAction('STAFF_STATUS_CHANGE', 'profile', st.id, { email: st.email, is_active: st.is_active });

        if (state.supabaseClient) {
          state.supabaseClient.from('profiles').update({ is_active: st.is_active }).eq('id', st.id).then(() => {});
        }

        notify(`Staff account for ${st.full_name} ${st.is_active ? 'activated' : 'deactivated'}.`, 'info');
        renderStaffTable();
      });
    });
  }

  function initStaffManagement() {
    const modalAddStaff = document.getElementById('modal-add-staff');
    const openAddStaffBtn = document.getElementById('btn-open-add-staff');
    const closeAddStaffBtn = document.getElementById('btn-close-add-staff');
    const formAddStaff = document.getElementById('form-add-staff');

    openAddStaffBtn?.addEventListener('click', () => {
      modalAddStaff?.classList.remove('hidden');
    });

    closeAddStaffBtn?.addEventListener('click', () => {
      modalAddStaff?.classList.add('hidden');
    });

    formAddStaff?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('staff-name').value.trim();
      const email = document.getElementById('staff-email').value.trim();
      const role = document.getElementById('staff-role').value;
      const customPassword = document.getElementById('staff-password')?.value.trim();
      const initialPassword = customPassword || generateSecureTempPassword();
      const submitBtn = document.getElementById('btn-submit-staff');

      if (!navigator.onLine || !state.supabaseClient) {
        notify('Staff provisioning requires an active internet connection to securely initialize authentication credentials without caching passwords in browser storage.', 'error');
        return;
      }

      const checkedTracks = [];
      document.querySelectorAll('input[name="staff-track-assign"]:checked').forEach(cb => {
        checkedTracks.push(cb.value);
      });

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Creating Account...</span>';
      if (window.lucide) window.lucide.createIcons();

      let createdAuthUserId = null;
      let emailDispatched = false;
      let signUpErrorMessage = null;

      // 1. Provision Auth user in Supabase
      if (state.supabaseClient) {
        try {
          // Use isolated client so Super Admin's active session is never disturbed
          const clientConfig = {
            url: state.supabaseClient.supabaseUrl || DEFAULT_SUPABASE_CONFIG.url,
            key: state.supabaseClient.supabaseKey || DEFAULT_SUPABASE_CONFIG.key
          };
          const tempClient = window.supabase.createClient(clientConfig.url, clientConfig.key, {
            auth: { persistSession: false, autoRefreshToken: false }
          });

          const isFirstLogin = role !== 'super_admin';
          const { data: signUpData, error: signUpError } = await tempClient.auth.signUp({
            email: email,
            password: initialPassword,
            options: {
              data: {
                full_name: name,
                role: role,
                is_first_login: isFirstLogin
              }
            }
          });

          if (signUpError) {
            console.warn('Supabase signUp notice:', signUpError);
            if (!signUpError.message?.includes('already registered')) {
              signUpErrorMessage = signUpError.message;
            }
          }

          if (signUpData?.user) {
            createdAuthUserId = signUpData.user.id;
          }

          // Also attempt email recovery dispatch (if email limits allow)
          try {
            const { error: resetErr } = await state.supabaseClient.auth.resetPasswordForEmail(email, {
              redirectTo: window.location.origin
            });
            if (!resetErr) emailDispatched = true;
          } catch (mErr) {}
        } catch (err) {
          console.warn('Staff auth dispatch notice:', err);
        }
      }

      const isFirstLogin = role !== 'super_admin';
      const newStaff = {
        id: createdAuthUserId || (crypto.randomUUID ? crypto.randomUUID() : 'staff_' + Date.now()),
        full_name: name,
        email: email,
        role: role,
        assigned_tracks: checkedTracks,
        is_active: true,
        is_first_login: isFirstLogin,
        created_at: new Date().toISOString()
      };

      // Add to local state (or update existing)
      const existingIdx = state.data.staff.findIndex(s => s.email.toLowerCase() === email.toLowerCase());
      if (existingIdx >= 0) {
        state.data.staff[existingIdx] = newStaff;
      } else {
        state.data.staff.push(newStaff);
      }
      saveStoredData();

      // Upsert profile in Supabase database
      if (state.supabaseClient && createdAuthUserId && navigator.onLine) {
        try {
          await state.supabaseClient.from('profiles').upsert({
            id: newStaff.id,
            email: email,
            full_name: name,
            role: role,
            assigned_tracks: checkedTracks,
            is_active: true,
            is_first_login: isFirstLogin
          });
        } catch (e) {
          console.warn('Failed to upsert profile to Supabase:', e);
        }
      }

      logAuditAction('STAFF_INVITE_SENT', 'profile', newStaff.id, {
        name: name,
        email: email,
        role: role,
        assigned_tracks: checkedTracks,
        email_sent: emailDispatched
      });

      if (!createdAuthUserId) {
        notify(`Staff account saved locally on device. Will finalize cloud setup when connected. Initial password: ${initialPassword}`, 'info');
      } else if (emailDispatched) {
        notify(`Staff account created & email dispatched to ${email}!`, 'success');
      } else {
        notify(`Staff account registered for ${name}! Password: ${initialPassword}`, 'success');
      }

      modalAddStaff?.classList.add('hidden');
      formAddStaff.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="user-check" class="w-4 h-4"></i><span>Create & Authorize Staff Member</span>';
      if (window.lucide) window.lucide.createIcons();
      renderStaffTable();
    });
  }

  // ============================================================================
  // 8. AUDIT LOGS ENGINE (SUPER ADMIN ONLY)
  // ============================================================================

  function renderAuditLogsTable() {
    const tbody = document.getElementById('audit-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const logs = state.data.auditLogs || [];
    if (logs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="p-8 text-center text-slate-400 font-medium">No audit entries recorded yet.</td></tr>';
      return;
    }

    logs.forEach(log => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100 text-xs';

      const timeStr = new Date(log.created_at).toLocaleString('en-KE', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const detailsStr = typeof log.details === 'object' ? JSON.stringify(log.details) : String(log.details || '');

      tr.innerHTML = `
        <td class="py-3 px-4 font-mono text-slate-500 font-medium">${timeStr}</td>
        <td class="py-3 px-4 font-bold text-slate-900">${escapeHTML(log.user_email || 'System')}</td>
        <td class="py-3 px-4"><span class="role-badge ${log.user_role || 'staff'}">${escapeHTML(log.user_role || 'Staff')}</span></td>
        <td class="py-3 px-4 font-extrabold text-indigo-700">${escapeHTML(log.action)}</td>
        <td class="py-3 px-4 font-mono text-slate-600">${escapeHTML(log.entity_type)}:${escapeHTML(log.entity_id || '')}</td>
        <td class="py-3 px-4 font-mono text-slate-500 max-w-xs truncate" title="${escapeHTML(detailsStr)}">${escapeHTML(detailsStr)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ============================================================================
  // 9. SINGLE-ENTRY ONBOARDING DESK
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
    const cohortSelect = document.getElementById('onboard-cohort');
    const trackSelect = document.getElementById('onboard-track');
    const transportGroup = document.getElementById('onboard-transport-group');
    const openBulkBtn = document.getElementById('btn-onboard-bulk-csv-link') || document.getElementById('btn-onboard-open-bulk');

    function openModal() {
      const user = state.currentUser;
      if (user && user.role !== 'super_admin' && user.role !== 'receptionist') {
        notify('Access Denied: Only Receptionists and Super Administrators can register students.', 'error');
        return;
      }

      updateSelectOptions();
      modal?.classList.remove('hidden');
    }

    function closeModal() {
      modal?.classList.add('hidden');
    }

    function updateSelectOptions() {
      if (cohortSelect) {
        cohortSelect.innerHTML = '';
        const cohorts = state.data.cohorts.bootcamp || ['August Bootcamp', 'December Bootcamp', 'April Bootcamp'];
        cohorts.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c;
          opt.textContent = c;
          if (c === state.activeCohort) opt.selected = true;
          cohortSelect.appendChild(opt);
        });
      }

      if (trackSelect) {
        trackSelect.innerHTML = '';
        const tracks = state.data.tracks.bootcamp || ['Junior Robotics', 'Web Development', 'AI & Coding', 'Mobile App Dev', 'Data Science & AI'];
        tracks.forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          trackSelect.appendChild(opt);
        });
      }

      if (transportGroup) {
        transportGroup.classList.remove('hidden');
        const vehSelect = document.getElementById('onboard-vehicle');
        if (vehSelect) {
          vehSelect.innerHTML = '<option value="">Select Transport Unit / Vehicle (Optional)</option>';
          const activeVehicles = getActiveVehicles();
          activeVehicles.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.name;
            opt.textContent = `${v.name} (${v.type.toUpperCase()}${v.capacity ? ' • ' + v.capacity + ' seats' : ''})`;
            vehSelect.appendChild(opt);
          });
        }
      }
    }

    openBtns.forEach(b => b?.addEventListener('click', openModal));
    closeBtn?.addEventListener('click', closeModal);

    openBulkBtn?.addEventListener('click', () => {
      closeModal();
      openBulkImportModal();
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = state.currentUser;
      const name = document.getElementById('onboard-name').value.trim();
      const phone = document.getElementById('onboard-phone').value.trim();
      const residence = document.getElementById('onboard-residence').value.trim();
      const cohort = cohortSelect.value;
      const track = trackSelect.value;
      const transport = document.getElementById('onboard-transport').value;
      const assignedVehicle = (transport === 'both' || transport === 'morning_bus' || transport === 'evening_bus')
        ? (document.getElementById('onboard-vehicle')?.value || '')
        : '';
      const notes = document.getElementById('onboard-notes').value.trim();

      const totalFee = Math.max(0, parseFloat(document.getElementById('onboard-total-fee')?.value || 0));
      const amountPaid = Math.max(0, parseFloat(document.getElementById('onboard-amount-paid')?.value || 0));
      const balanceDue = Math.max(0, totalFee - amountPaid);
      const paymentStatus = amountPaid >= totalFee && totalFee > 0 ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid');

      const studentId = generateUUID();

      const newStudent = {
        id: studentId,
        name: name,
        phone: phone,
        residence: residence,
        branch: 'bootcamp',
        cohort: cohort,
        track: track,
        transport_mode: transport,
        assigned_vehicle: assignedVehicle,
        total_fee: totalFee,
        amount_paid: amountPaid,
        balance_due: balanceDue,
        payment_status: paymentStatus,
        notes: notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      state.data.students.push(newStudent);

      // If initial payment was made during registration, record a payment transaction
      let initialPayment = null;
      if (amountPaid > 0) {
        initialPayment = {
          id: generateUUID(),
          student_id: studentId,
          student_name: name,
          amount: amountPaid,
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'M-Pesa',
          reference_code: 'INIT-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          notes: 'Initial fee payment during student registration',
          recorded_by: user ? user.id : null,
          recorded_by_name: user ? user.full_name : 'Reception Desk',
          created_at: new Date().toISOString()
        };
        state.data.feePayments.unshift(initialPayment);
        enqueueOutbox('INSERT_PAYMENT', initialPayment);
      }

      saveStoredData();

      logAuditAction('REGISTER_STUDENT', 'student', newStudent.id, {
        name: name,
        cohort: cohort,
        track: track,
        total_fee: totalFee,
        amount_paid: amountPaid,
        balance_due: balanceDue
      });

      enqueueOutbox('INSERT_STUDENT', newStudent);
      flushOutboxQueue();

      notify(`Student "${name}" successfully registered for ${cohort} (${track})!`, 'success');
      form.reset();
      closeModal();
      state.activeCohort = cohort;
      state.activeTrack = track;
      renderApp();
    });
  }

  // ============================================================================
  // 10. EXPORT & PRINT ENGINE
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
      document.getElementById('print-doc-branch').textContent = 'Tech & AI Bootcamps';
      document.getElementById('print-doc-cohort').textContent = state.activeCohort;
      document.getElementById('print-doc-track').textContent = state.activeTrack === 'all' ? 'All Tracks' : state.activeTrack;

      let completed = 0;
      students.forEach(s => {
        const st = getStudentStatus(s.id);
        if (st === 'present' || st === 'picked_up' || st === 'dropped_off' || st === 'checked_in') completed++;
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
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px; color: #64748b;">No students registered for this manifest.</td></tr>';
      } else {
        students.forEach((s, i) => {
          const st = getStudentStatus(s.id);
          const isDone = st === 'present' || st === 'picked_up' || st === 'dropped_off' || st === 'checked_in';
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td style="text-align: center; font-weight: bold;">${i + 1}</td>
            <td><strong>${escapeHTML(s.name)}</strong></td>
            <td>${escapeHTML(s.phone)}</td>
            <td>${escapeHTML(s.residence)}</td>
            <td>${escapeHTML(s.track)}</td>
            <td style="text-align: center; font-weight: bold; color: #b45309;">${escapeHTML(s.assigned_vehicle || (s.transport_mode === 'both' ? 'Bus' : '-'))}</td>
            <td style="text-align: center;">
              <span class="print-badge" style="${isDone ? 'background-color: #dcfce7; border-color: #10b981; color: #166534;' : 'background-color: #fee2e2; border-color: #ef4444; color: #991b1b;'}">
                ${isDone ? '✓ ' + (st.toUpperCase().replace('_', ' ')) : '✗ NOT VERIFIED'}
              </span>
            </td>
            <td style="border-bottom: 1px dashed #94a3b8;"></td>
          `;
          tbody.appendChild(tr);
        });
      }

      window.print();
    }

    printBtns.forEach(b => b?.addEventListener('click', triggerPrint));

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

        const sanitizeCSVCell = (val) => {
          if (val === null || val === undefined) return '""';
          let str = String(val);
          // Mitigate CSV Formula / DDE Injection in Excel / Calc:
          // If string begins with =, +, -, @, \t, or \r, prepend a single quote
          if (/^[=+\-@\t\r]/.test(str)) {
            str = "'" + str;
          }
          return `"${str.replace(/"/g, '""')}"`;
        };

        const headers = ['Serial', 'Student Name', 'Parent Phone', 'Residence', 'Branch', 'Cohort', 'Track', 'Transport Mode', 'Assigned Vehicle', 'Daily Status', 'Date', 'Notes'];
        const rows = students.map((s, idx) => {
          const status = getStudentStatus(s.id);
          return [
            idx + 1,
            sanitizeCSVCell(s.name),
            sanitizeCSVCell(s.phone),
            sanitizeCSVCell(s.residence),
            sanitizeCSVCell(s.branch),
            sanitizeCSVCell(s.cohort),
            sanitizeCSVCell(s.track),
            sanitizeCSVCell(s.transport_mode),
            sanitizeCSVCell(s.assigned_vehicle || ''),
            sanitizeCSVCell(status),
            sanitizeCSVCell(state.activeDate),
            sanitizeCSVCell(s.notes || '')
          ];
        });

        const csvContent = 'ï»¿' + [
          'EldoHub Tech & AI Academy - Operations & Fleet Management',
          `Manifest: ${manifestName.replace(/_/g, ' ')} | Date: ${state.activeDate} | Branch: ${state.activeBranch}`,
          headers.join(','),
          ...rows.map(r => r.join(','))
        ].join('\r\n');

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

        // Header Banner with Official EldoHub Branding
        doc.setFillColor(12, 59, 46);
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
        doc.setTextColor(0, 142, 128);
        doc.text('OPERATIONS, ATTENDANCE & FLEET LOGISTICS', 64, 18);

        doc.setFontSize(8.5);
        doc.setTextColor(203, 213, 225);
        doc.text(`Date: ${state.activeDate} | Generated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`, 196, 15, { align: 'right' });

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
          if (status === 'present') displayStatus = '[✓] PRESENT';
          else if (status === 'absent') displayStatus = '[✗] ABSENT';
          else if (status === 'picked_up') displayStatus = '[✓] PICKED UP';
          else if (status === 'dropped_off') displayStatus = '[✓] DROPPED OFF';
          else if (status === 'checked_in') displayStatus = '[✓] CHECKED IN';
          return [
            idx + 1,
            s.name,
            s.phone,
            s.residence,
            s.assigned_vehicle || (s.transport_mode === 'both' ? 'Bus' : '-'),
            displayStatus,
            ''
          ];
        });

        doc.autoTable({
          startY: 60,
          head: [['#', 'Student Full Name', 'Contact Phone', 'Residence', 'Vehicle / Route', 'Status', 'Sign-off']],
          body: tableRows,
          theme: 'striped',
          headStyles: {
            fillColor: [12, 59, 46],
            textColor: [255, 255, 255],
            fontSize: 9,
            fontStyle: 'bold'
          },
          bodyStyles: {
            fontSize: 8.5,
            textColor: [30, 41, 59]
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252]
          },
          margin: { left: 14, right: 14 }
        });

        const finalY = doc.lastAutoTable.finalY || 180;
        if (finalY < 250) {
          doc.setDrawColor(148, 163, 184);
          doc.line(14, finalY + 20, 95, finalY + 20);
          doc.line(115, finalY + 20, 196, finalY + 20);

          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.text('Driver / Chaperone Signature', 14, finalY + 25);
          doc.text('Academy Supervisor Signature', 115, finalY + 25);
        }

        doc.save(`EldoHub_Tech_AI_Academy_${manifestTitle.replace(/\s+/g, '_')}_${state.activeDate}.pdf`);
        notify('Official PDF Document generated successfully!', 'success');
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
        setStudentManifestStatus(s.id, targetStatus);
      });

      notify(`Marked all ${students.length} students as ${targetStatus.toUpperCase()}!`, 'success');
    });

    // Reset Manifest for current date
    const resetBtn = document.getElementById('btn-reset-manifest');
    resetBtn?.addEventListener('click', () => {
      if (confirm(`Reset status for all students in current manifest today (${state.activeDate})?`)) {
        const studentIds = getFilteredStudents().map(s => s.id);
        state.data.manifestLogs = state.data.manifestLogs.filter(
          l => !(studentIds.includes(l.student_id) && l.date === state.activeDate && l.type === state.activeManifestType)
        );
        saveStoredData();
        renderApp();
        notify('Manifest status reset.', 'info');
      }
    });
  }

  // ============================================================================
  // 11. FEES & REVENUE MANAGEMENT MODULE
  // ============================================================================

  function initFeesManagement() {
    const searchInput = document.getElementById('fees-search-input');
    const cohortFilter = document.getElementById('fees-cohort-filter');
    const statusFilter = document.getElementById('fees-status-filter');
    const btnOpenRecord = document.getElementById('btn-record-payment-open');
    const btnExportCSV = document.getElementById('btn-fees-export-csv');
    const btnExportPDF = document.getElementById('btn-fees-export-pdf');

    searchInput?.addEventListener('input', (e) => {
      state.feesFilter.query = e.target.value;
      renderFeesDashboard();
    });

    cohortFilter?.addEventListener('change', (e) => {
      state.feesFilter.cohort = e.target.value;
      renderFeesDashboard();
    });

    statusFilter?.addEventListener('change', (e) => {
      state.feesFilter.status = e.target.value;
      renderFeesDashboard();
    });

    btnOpenRecord?.addEventListener('click', () => {
      openRecordPaymentModal();
    });

    // CSV Export for Fees
    btnExportCSV?.addEventListener('click', () => {
      const students = state.data.students || [];
      if (students.length === 0) {
        notify('No student fee records to export.', 'info');
        return;
      }

      const sanitizeCSVCell = (val) => {
        if (val === null || val === undefined) return '""';
        let str = String(val);
        if (/^[=+\-@\t\r]/.test(str)) str = "'" + str;
        return `"${str.replace(/"/g, '""')}"`;
      };

      const headers = ['Serial', 'Student Name', 'Parent Phone', 'Residence', 'Bootcamp Cohort', 'Track', 'Total Fee (KES)', 'Amount Paid (KES)', 'Balance Due (KES)', 'Payment Status'];
      const rows = students.map((s, idx) => {
        const totalFee = Number(s.total_fee !== undefined ? s.total_fee : 0);
        const amountPaid = Number(s.amount_paid !== undefined ? s.amount_paid : 0);
        const balanceDue = Number(s.balance_due !== undefined ? s.balance_due : Math.max(0, totalFee - amountPaid));
        const status = s.payment_status || (amountPaid >= totalFee && totalFee > 0 ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid'));

        return [
          idx + 1,
          sanitizeCSVCell(s.name),
          sanitizeCSVCell(s.phone),
          sanitizeCSVCell(s.residence),
          sanitizeCSVCell(s.cohort),
          sanitizeCSVCell(s.track),
          totalFee,
          amountPaid,
          balanceDue,
          sanitizeCSVCell(status)
        ];
      });

      const csvContent = '\uFEFF' + [
        'EldoHub Tech & AI Academy - Student Fees & Accounts Receivable Ledger',
        `Generated: ${new Date().toLocaleString('en-KE')} | Academic Term: Bootcamps`,
        headers.join(','),
        ...rows.map(r => r.join(','))
      ].join('\r\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `EldoHub_Fees_Ledger_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notify('Student fee ledger exported as CSV successfully!', 'success');
    });

    // PDF Export for Fees Ledger
    btnExportPDF?.addEventListener('click', () => {
      const students = state.data.students || [];
      if (students.length === 0) {
        notify('No student fee records to export.', 'info');
        return;
      }

      if (!window.jspdf || !window.jspdf.jsPDF) {
        notify('PDF engine initializing, please retry...', 'info');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      // Header Banner
      doc.setFillColor(12, 59, 46);
      doc.rect(0, 0, 210, 26, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('ELDOHUB TECH & AI ACADEMY', 14, 11);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 142, 128);
      doc.text('BOOTCAMP FEES & ACCOUNTS RECEIVABLE REPORT', 14, 18);

      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225);
      doc.text(`Generated: ${new Date().toLocaleString('en-KE')}`, 196, 15, { align: 'right' });

      // Financial Summary Box
      let totalExp = 0, totalCol = 0;
      students.forEach(s => {
        totalExp += Number(s.total_fee || 0);
        totalCol += Number(s.amount_paid || 0);
      });
      const totalBal = Math.max(0, totalExp - totalCol);
      const pct = totalExp > 0 ? Math.round((totalCol / totalExp) * 100) : 0;

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, 30, 182, 16, 2, 2, 'FD');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text(`TOTAL EXPECTED: KES ${totalExp.toLocaleString()}`, 20, 40);
      doc.setTextColor(5, 150, 105);
      doc.text(`COLLECTED: KES ${totalCol.toLocaleString()} (${pct}%)`, 80, 40);
      doc.setTextColor(225, 29, 72);
      doc.text(`BALANCE DUE: KES ${totalBal.toLocaleString()}`, 145, 40);

      // AutoTable
      const tableData = students.map((s, i) => {
        const fee = Number(s.total_fee || 0);
        const paid = Number(s.amount_paid || 0);
        const bal = Number(s.balance_due !== undefined ? s.balance_due : Math.max(0, fee - paid));
        const st = s.payment_status || (paid >= fee && fee > 0 ? 'Paid' : (paid > 0 ? 'Partial' : 'Unpaid'));
        return [
          i + 1,
          s.name,
          `${s.cohort}\n${s.track}`,
          `KES ${fee.toLocaleString()}`,
          `KES ${paid.toLocaleString()}`,
          `KES ${bal.toLocaleString()}`,
          st
        ];
      });

      doc.autoTable({
        startY: 50,
        head: [['#', 'Student Name', 'Cohort & Track', 'Total Fee', 'Paid', 'Balance', 'Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [12, 59, 46],
          textColor: [255, 255, 255],
          fontSize: 8.5,
          fontStyle: 'bold'
        },
        bodyStyles: {
          fontSize: 8,
          textColor: [30, 41, 59]
        },
        margin: { left: 14, right: 14 }
      });

      doc.save(`EldoHub_Bootcamp_Fees_Ledger_${new Date().toISOString().split('T')[0]}.pdf`);
      notify('Student fee ledger PDF generated successfully!', 'success');
    });
  }

  function renderFeesDashboard() {
    const user = state.currentUser;
    const canAccess = user && (user.role === 'super_admin' || user.role === 'receptionist');
    if (!canAccess) {
      notify('Access Denied: Fees & Payments view is restricted to Super Admin and Receptionist.', 'error');
      state.activeViewModule = 'manifest_operations';
      renderApp();
      return;
    }

    const students = state.data.students || [];

    // Cohort filter selector population
    const cohortFilter = document.getElementById('fees-cohort-filter');
    if (cohortFilter && cohortFilter.options.length <= 1) {
      cohortFilter.innerHTML = '<option value="all">All Bootcamp Cohorts</option>';
      const cohorts = state.data.cohorts.bootcamp || ['August Bootcamp', 'December Bootcamp', 'April Bootcamp'];
      cohorts.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        if (state.feesFilter.cohort === c) opt.selected = true;
        cohortFilter.appendChild(opt);
      });
    }

    // Filter students based on state.feesFilter
    const filtered = students.filter(s => {
      if (state.feesFilter.cohort !== 'all' && s.cohort !== state.feesFilter.cohort) return false;
      if (state.feesFilter.status !== 'all') {
        const status = s.payment_status || (s.amount_paid >= s.total_fee && s.total_fee > 0 ? 'Paid' : (s.amount_paid > 0 ? 'Partial' : 'Unpaid'));
        if (status.toLowerCase() !== state.feesFilter.status.toLowerCase()) return false;
      }
      if (state.feesFilter.query && state.feesFilter.query.trim()) {
        const q = state.feesFilter.query.toLowerCase().trim();
        const matchName = (s.name || '').toLowerCase().includes(q);
        const matchPhone = (s.phone || '').toLowerCase().includes(q);
        const matchRes = (s.residence || '').toLowerCase().includes(q);
        const matchTrack = (s.track || '').toLowerCase().includes(q);
        const matchCohort = (s.cohort || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchRes && !matchTrack && !matchCohort) return false;
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    // Overall KPI calculation (using current cohort filter or all students)
    const kpiSource = state.feesFilter.cohort !== 'all' 
      ? students.filter(s => s.cohort === state.feesFilter.cohort)
      : students;

    let totalExpected = 0;
    let totalCollected = 0;
    let unpaidOrPartialCount = 0;

    kpiSource.forEach(s => {
      const fee = Number(s.total_fee !== undefined ? s.total_fee : 0);
      const paid = Number(s.amount_paid !== undefined ? s.amount_paid : 0);
      totalExpected += fee;
      totalCollected += paid;
      if ((fee - paid) > 0) unpaidOrPartialCount++;
    });

    const totalBalance = Math.max(0, totalExpected - totalCollected);
    const collectedPct = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

    // Update KPI Elements
    const elExp = document.getElementById('kpi-fees-expected');
    const elCol = document.getElementById('kpi-fees-collected');
    const elPct = document.getElementById('kpi-fees-collected-pct');
    const elBal = document.getElementById('kpi-fees-balance');
    const elUnpaid = document.getElementById('kpi-fees-unpaid-count');
    const countPill = document.getElementById('fees-count-pill');
    const emptyState = document.getElementById('fees-empty-state');
    const tbody = document.getElementById('fees-table-body');

    if (elExp) elExp.textContent = `KES ${totalExpected.toLocaleString()}`;
    if (elCol) elCol.textContent = `KES ${totalCollected.toLocaleString()}`;
    if (elPct) elPct.textContent = `${collectedPct}% Collection Rate`;
    if (elBal) elBal.textContent = `KES ${totalBalance.toLocaleString()}`;
    if (elUnpaid) elUnpaid.textContent = `${unpaidOrPartialCount} Student${unpaidOrPartialCount === 1 ? '' : 's'} with Outstanding Balance`;
    if (countPill) countPill.textContent = `${filtered.length} Student${filtered.length === 1 ? '' : 's'}`;

    if (!tbody) return;
    tbody.innerHTML = '';

    if (filtered.length === 0) {
      emptyState?.classList.remove('hidden');
      return;
    }
    emptyState?.classList.add('hidden');

    filtered.forEach((s, idx) => {
      const totalFee = Number(s.total_fee !== undefined ? s.total_fee : 0);
      const amountPaid = Number(s.amount_paid !== undefined ? s.amount_paid : 0);
      const balanceDue = Number(s.balance_due !== undefined ? s.balance_due : Math.max(0, totalFee - amountPaid));
      const status = s.payment_status || (amountPaid >= totalFee && totalFee > 0 ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid'));

      let statusBadge = '';
      if (status === 'Paid') {
        statusBadge = '<span class="badge-fee-paid inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"><i data-lucide="check-circle" class="w-3 h-3"></i>Paid</span>';
      } else if (status === 'Partial') {
        statusBadge = '<span class="badge-fee-partial inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"><i data-lucide="clock" class="w-3 h-3"></i>Partial</span>';
      } else {
        statusBadge = '<span class="badge-fee-unpaid inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"><i data-lucide="alert-circle" class="w-3 h-3"></i>Unpaid</span>';
      }

      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors border-b border-slate-100';

      tr.innerHTML = `
        <td class="py-3.5 px-4 text-center font-mono text-xs text-slate-400 font-bold">${idx + 1}</td>
        
        <td class="py-3.5 px-4">
          <div class="font-extrabold text-slate-900">
            <span class="student-clickable-name text-slate-900 hover:text-sky-600 cursor-pointer transition-colors underline-offset-2 hover:underline" data-profile-id="${s.id}" title="View Student Profile">${escapeHTML(s.name)}</span>
          </div>
          <div class="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
            <a href="tel:${escapeHTML(s.phone)}" class="text-sky-600 hover:underline font-mono">${escapeHTML(s.phone)}</a>
            <span>•</span>
            <span class="truncate max-w-[120px]">${escapeHTML(s.residence || 'Campus')}</span>
          </div>
        </td>

        <td class="py-3.5 px-4">
          <div class="font-bold text-xs text-slate-800">${escapeHTML(s.cohort)}</div>
          <div class="text-[11px] text-indigo-600 font-semibold mt-0.5">${escapeHTML(s.track)}</div>
        </td>

        <td class="py-3.5 px-4 font-mono text-xs font-bold text-slate-700">
          KES ${totalFee.toLocaleString()}
        </td>

        <td class="py-3.5 px-4 font-mono text-xs font-extrabold text-emerald-700">
          KES ${amountPaid.toLocaleString()}
        </td>

        <td class="py-3.5 px-4 font-mono text-xs font-black ${balanceDue > 0 ? 'text-rose-600' : 'text-slate-400'}">
          KES ${balanceDue.toLocaleString()}
        </td>

        <td class="py-3.5 px-4 text-center">
          ${statusBadge}
        </td>

        <td class="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
          <button data-pay-student-id="${s.id}" class="btn-table-pay touch-btn h-8 px-2.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors inline-flex items-center gap-1 shadow-sm" title="Record New Payment">
            <i data-lucide="credit-card" class="w-3.5 h-3.5"></i>
            <span>Pay</span>
          </button>
          <button data-receipt-student-id="${s.id}" class="btn-table-receipt touch-btn h-8 px-2.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors inline-flex items-center gap-1 shadow-sm" title="View Fee Receipt">
            <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
            <span>Receipt</span>
          </button>
          <button data-profile-id="${s.id}" class="student-clickable-name touch-btn h-8 px-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors inline-flex items-center" title="Student Dossier">
            <i data-lucide="user" class="w-3.5 h-3.5"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Wire button events in table
    tbody.querySelectorAll('.btn-table-pay').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-pay-student-id');
        openRecordPaymentModal(studentId);
      });
    });

    tbody.querySelectorAll('.btn-table-receipt').forEach(btn => {
      btn.addEventListener('click', () => {
        const studentId = btn.getAttribute('data-receipt-student-id');
        openReceiptModal(studentId);
      });
    });

    tbody.querySelectorAll('.student-clickable-name').forEach(el => {
      el.addEventListener('click', () => {
        const studentId = el.getAttribute('data-profile-id');
        openStudentProfileDrawer(studentId);
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // ============================================================================
  // 11B. RECORD PAYMENT MODAL ENGINE
  // ============================================================================

  function initRecordPaymentModal() {
    const modal = document.getElementById('modal-record-payment');
    const closeBtn = document.getElementById('btn-close-record-payment');
    const cancelBtn = document.getElementById('btn-cancel-record-payment');
    const form = document.getElementById('record-payment-form');
    const studentSelect = document.getElementById('pay-student-select');

    closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));
    cancelBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

    studentSelect?.addEventListener('change', (e) => {
      updatePaymentSummaryCard(e.target.value);
    });

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = state.currentUser;
      const studentId = studentSelect?.value;
      const amount = Math.max(0, parseFloat(document.getElementById('pay-amount')?.value || 0));
      const paymentDate = document.getElementById('pay-date')?.value || new Date().toISOString().split('T')[0];
      const paymentMethod = document.getElementById('pay-method')?.value || 'M-Pesa';
      const referenceCode = (document.getElementById('pay-reference')?.value || '').trim() || ('MP-' + Math.random().toString(36).substring(2, 8).toUpperCase());
      const notes = (document.getElementById('pay-notes')?.value || '').trim();

      if (!studentId) {
        notify('Please select a student.', 'error');
        return;
      }

      if (amount <= 0) {
        notify('Please enter a valid payment amount greater than zero.', 'error');
        return;
      }

      const student = state.data.students.find(s => s.id === studentId);
      if (!student) {
        notify('Selected student not found in academy records.', 'error');
        return;
      }

      // Update student financial ledger
      const currentPaid = Number(student.amount_paid || 0);
      const totalFee = Number(student.total_fee || 0);
      const newPaid = currentPaid + amount;
      const newBalance = Math.max(0, totalFee - newPaid);
      const newStatus = newPaid >= totalFee && totalFee > 0 ? 'Paid' : (newPaid > 0 ? 'Partial' : 'Unpaid');

      student.amount_paid = newPaid;
      student.balance_due = newBalance;
      student.payment_status = newStatus;
      student.updated_at = new Date().toISOString();

      // Create payment transaction log
      const paymentId = generateUUID();
      const paymentRecord = {
        id: paymentId,
        student_id: student.id,
        student_name: student.name,
        amount: amount,
        payment_date: paymentDate,
        payment_method: paymentMethod,
        reference_code: referenceCode.toUpperCase(),
        notes: notes,
        recorded_by: user ? user.id : null,
        recorded_by_name: user ? user.full_name : 'Staff',
        created_at: new Date().toISOString()
      };

      if (!state.data.feePayments) state.data.feePayments = [];
      state.data.feePayments.unshift(paymentRecord);

      saveStoredData();

      // Enqueue sync tasks
      enqueueOutbox('INSERT_PAYMENT', paymentRecord);
      enqueueOutbox('INSERT_STUDENT', student);
      flushOutboxQueue();

      logAuditAction('RECORD_PAYMENT', 'fee_payment', paymentId, {
        student_name: student.name,
        amount: amount,
        reference_code: referenceCode,
        payment_method: paymentMethod,
        balance_remaining: newBalance
      });

      notify(`Payment of KES ${amount.toLocaleString()} recorded for ${student.name}!`, 'success');
      form.reset();
      modal?.classList.add('hidden');

      // Refresh UI
      renderApp();

      // Offer immediate receipt view
      openReceiptModal(student.id, paymentId);
    });
  }

  function updatePaymentSummaryCard(studentId) {
    const card = document.getElementById('pay-student-summary-card');
    const elName = document.getElementById('pay-summary-name');
    const elCohortTrack = document.getElementById('pay-summary-cohort-track');
    const elTotal = document.getElementById('pay-summary-total');
    const elPaid = document.getElementById('pay-summary-paid');
    const elBal = document.getElementById('pay-summary-balance');
    const amountInput = document.getElementById('pay-amount');

    if (!studentId) {
      card?.classList.add('hidden');
      return;
    }

    const student = state.data.students.find(s => s.id === studentId);
    if (!student) {
      card?.classList.add('hidden');
      return;
    }

    const totalFee = Number(student.total_fee !== undefined ? student.total_fee : 0);
    const amountPaid = Number(student.amount_paid !== undefined ? student.amount_paid : 0);
    const balanceDue = Number(student.balance_due !== undefined ? student.balance_due : Math.max(0, totalFee - amountPaid));

    if (elName) elName.textContent = student.name;
    if (elCohortTrack) elCohortTrack.textContent = `${student.cohort} • ${student.track}`;
    if (elTotal) elTotal.textContent = `KES ${totalFee.toLocaleString()}`;
    if (elPaid) elPaid.textContent = `KES ${amountPaid.toLocaleString()}`;
    if (elBal) elBal.textContent = `KES ${balanceDue.toLocaleString()}`;

    // Suggest remaining balance as payment amount
    if (amountInput) {
      amountInput.value = balanceDue > 0 ? balanceDue : '';
    }

    card?.classList.remove('hidden');
  }

  function openRecordPaymentModal(studentId = null) {
    const user = state.currentUser;
    if (user && user.role !== 'super_admin' && user.role !== 'receptionist') {
      notify('Access Denied: Only Super Admin and Receptionist can record fee payments.', 'error');
      return;
    }

    const modal = document.getElementById('modal-record-payment');
    const studentSelect = document.getElementById('pay-student-select');
    const dateInput = document.getElementById('pay-date');
    const refInput = document.getElementById('pay-reference');

    if (studentSelect) {
      studentSelect.innerHTML = '<option value="">-- Choose Student to Record Payment --</option>';
      const students = (state.data.students || []).slice().sort((a, b) => a.name.localeCompare(b.name));
      students.forEach(s => {
        const bal = Number(s.balance_due !== undefined ? s.balance_due : Math.max(0, (s.total_fee || 0) - (s.amount_paid || 0)));
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.name} (${s.cohort} - ${s.track}) • Due: KES ${bal.toLocaleString()}`;
        if (studentId && s.id === studentId) opt.selected = true;
        studentSelect.appendChild(opt);
      });
    }

    if (dateInput) {
      dateInput.value = state.activeDate || new Date().toISOString().split('T')[0];
    }

    if (refInput) {
      refInput.value = 'MP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    updatePaymentSummaryCard(studentId || studentSelect?.value);
    modal?.classList.remove('hidden');
  }

  // ============================================================================
  // 11C. OFFICIAL FEE RECEIPT ENGINE (MODAL, PRINT & PDF)
  // ============================================================================

  function initReceiptModal() {
    const modal = document.getElementById('modal-receipt');
    const closeBtn = document.getElementById('btn-close-receipt');
    const doneBtn = document.getElementById('btn-done-receipt');
    const printBtn = document.getElementById('btn-print-receipt');
    const downloadBtn = document.getElementById('btn-download-receipt-pdf');

    closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));
    doneBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

    printBtn?.addEventListener('click', () => {
      document.body.classList.add('printing-receipt');
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing-receipt');
      }, 1000);
    });

    downloadBtn?.addEventListener('click', () => {
      generateReceiptPDFFromActiveState();
    });
  }

  let activeReceiptContext = null;

  function openReceiptModal(studentId, paymentId = null) {
    const student = state.data.students.find(s => s.id === studentId);
    if (!student) {
      notify('Student record not found.', 'error');
      return;
    }

    let payment = null;
    if (paymentId) {
      payment = (state.data.feePayments || []).find(p => p.id === paymentId);
    }
    if (!payment) {
      payment = (state.data.feePayments || []).find(p => p.student_id === studentId);
    }

    activeReceiptContext = { student, payment };

    const modal = document.getElementById('modal-receipt');
    const totalFee = Number(student.total_fee !== undefined ? student.total_fee : 0);
    const amountPaidCumulative = Number(student.amount_paid !== undefined ? student.amount_paid : 0);
    const balanceDue = Number(student.balance_due !== undefined ? student.balance_due : Math.max(0, totalFee - amountPaidCumulative));

    const receiptAmount = payment ? Number(payment.amount) : amountPaidCumulative;
    const refCode = payment ? payment.reference_code : ('REC-' + student.id.substring(0, 8).toUpperCase());
    const payDate = payment ? payment.payment_date : (state.activeDate || new Date().toISOString().split('T')[0]);
    const payMethod = payment ? payment.payment_method : 'M-Pesa / Bank';
    const recordedBy = payment ? payment.recorded_by_name : (state.currentUser?.full_name || 'Accounts Desk');

    // Populate Modal Preview
    const elNum = document.getElementById('receipt-number');
    const elDate = document.getElementById('receipt-date');
    const elStudent = document.getElementById('receipt-student-name');
    const elPhone = document.getElementById('receipt-parent-phone');
    const elCohort = document.getElementById('receipt-cohort-track');
    const elAmt = document.getElementById('receipt-amount-paid');
    const elMethod = document.getElementById('receipt-payment-method');
    const elRef = document.getElementById('receipt-reference-code');
    const elTotal = document.getElementById('receipt-total-fee');
    const elBal = document.getElementById('receipt-balance-due');
    const elBy = document.getElementById('receipt-recorded-by');

    if (elNum) elNum.textContent = refCode;
    if (elDate) elDate.textContent = payDate;
    if (elStudent) elStudent.textContent = student.name;
    if (elPhone) elPhone.textContent = student.phone;
    if (elCohort) elCohort.textContent = `${student.cohort} • ${student.track}`;
    if (elAmt) elAmt.textContent = `KES ${receiptAmount.toLocaleString()}`;
    if (elMethod) elMethod.textContent = payMethod;
    if (elRef) elRef.textContent = refCode;
    if (elTotal) elTotal.textContent = `KES ${totalFee.toLocaleString()}`;
    if (elBal) elBal.textContent = `KES ${balanceDue.toLocaleString()}`;
    if (elBy) elBy.textContent = recordedBy;

    // Populate Hidden Native Print Document Layout (#print-receipt-document)
    const pNum = document.getElementById('print-rec-number');
    const pDate = document.getElementById('print-rec-date');
    const pStudent = document.getElementById('print-rec-student');
    const pPhone = document.getElementById('print-rec-phone');
    const pCohort = document.getElementById('print-rec-cohort');
    const pTrack = document.getElementById('print-rec-track');
    const pMethod = document.getElementById('print-rec-method');
    const pRef = document.getElementById('print-rec-ref');
    const pAmt = document.getElementById('print-rec-amount');
    const pTotal = document.getElementById('print-rec-total-fee');
    const pPaid = document.getElementById('print-rec-cumulative-paid');
    const pBal = document.getElementById('print-rec-balance-due');
    const pCashier = document.getElementById('print-rec-cashier');

    if (pNum) pNum.textContent = refCode;
    if (pDate) pDate.textContent = payDate;
    if (pStudent) pStudent.textContent = student.name;
    if (pPhone) pPhone.textContent = student.phone;
    if (pCohort) pCohort.textContent = student.cohort;
    if (pTrack) pTrack.textContent = student.track;
    if (pMethod) pMethod.textContent = payMethod;
    if (pRef) pRef.textContent = refCode;
    if (pAmt) pAmt.textContent = `KES ${receiptAmount.toLocaleString()}`;
    if (pTotal) pTotal.textContent = `KES ${totalFee.toLocaleString()}`;
    if (pPaid) pPaid.textContent = `KES ${amountPaidCumulative.toLocaleString()}`;
    if (pBal) pBal.textContent = `KES ${balanceDue.toLocaleString()}`;
    if (pCashier) pCashier.textContent = recordedBy;

    modal?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function generateReceiptPDFFromActiveState() {
    if (!activeReceiptContext || !activeReceiptContext.student) {
      notify('No active receipt loaded.', 'error');
      return;
    }

    if (!window.jspdf || !window.jspdf.jsPDF) {
      notify('PDF engine initializing, please retry...', 'info');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a5'); // 148mm x 210mm
    const student = activeReceiptContext.student;
    const payment = activeReceiptContext.payment;

    const totalFee = Number(student.total_fee || 0);
    const amountPaidCumulative = Number(student.amount_paid || 0);
    const balanceDue = Number(student.balance_due !== undefined ? student.balance_due : Math.max(0, totalFee - amountPaidCumulative));
    const receiptAmount = payment ? Number(payment.amount) : amountPaidCumulative;
    const refCode = payment ? payment.reference_code : ('REC-' + student.id.substring(0, 8).toUpperCase());
    const payDate = payment ? payment.payment_date : new Date().toISOString().split('T')[0];
    const payMethod = payment ? payment.payment_method : 'M-Pesa / Bank';
    const recordedBy = payment ? payment.recorded_by_name : (state.currentUser?.full_name || 'Accounts Desk');

    // Header Band
    doc.setFillColor(12, 59, 46);
    doc.rect(0, 0, 148, 24, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text('ELDOHUB TECH & AI ACADEMY', 12, 11);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 142, 128);
    doc.text('OFFICIAL STUDENT FEE PAYMENT RECEIPT', 12, 17);

    doc.setTextColor(203, 213, 225);
    doc.text(`Receipt #: ${refCode}`, 136, 11, { align: 'right' });
    doc.text(`Date: ${payDate}`, 136, 17, { align: 'right' });

    // Student & Program Details Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(12, 28, 124, 26, 2, 2, 'FD');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('STUDENT:', 16, 36);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(student.name, 45, 36);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('GUARDIAN PHONE:', 16, 42);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(student.phone, 45, 42);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text('BOOTCAMP PROGRAM:', 16, 48);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(12, 59, 46);
    doc.text(`${student.cohort} • ${student.track}`, 45, 48);

    // Payment Item Table
    doc.autoTable({
      startY: 58,
      head: [['Description', 'Payment Mode', 'Reference', 'Amount Paid']],
      body: [
        [
          `Bootcamp Tuition & Materials Fee\n(${student.track})`,
          payMethod,
          refCode,
          `KES ${receiptAmount.toLocaleString()}`
        ]
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [12, 59, 46],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold'
      },
      bodyStyles: {
        fontSize: 8,
        textColor: [15, 23, 42]
      },
      margin: { left: 12, right: 12 }
    });

    const finalY = doc.lastAutoTable.finalY || 80;

    // Financial Balances Summary
    doc.setFillColor(241, 245, 249);
    doc.rect(70, finalY + 4, 66, 28, 'F');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text('Total Course Fee:', 74, finalY + 11);
    doc.text(`KES ${totalFee.toLocaleString()}`, 132, finalY + 11, { align: 'right' });

    doc.text('Cumulative Paid:', 74, finalY + 18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(5, 150, 105);
    doc.text(`KES ${amountPaidCumulative.toLocaleString()}`, 132, finalY + 18, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(225, 29, 72);
    doc.text('Remaining Balance:', 74, finalY + 25);
    doc.text(`KES ${balanceDue.toLocaleString()}`, 132, finalY + 25, { align: 'right' });

    // Official Stamp & Signature Lines
    doc.setDrawColor(203, 213, 225);
    doc.line(12, finalY + 45, 60, finalY + 45);
    doc.line(86, finalY + 45, 136, finalY + 45);

    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`Issued By: ${recordedBy}`, 12, finalY + 49);
    doc.text('Authorized Finance Stamp', 86, finalY + 49);

    doc.setFontSize(6.5);
    doc.text('This is an official computer-generated receipt from EldoHub Academy.', 74, 202, { align: 'center' });

    doc.save(`EldoHub_Fee_Receipt_${refCode}_${student.name.replace(/\s+/g, '_')}.pdf`);
    notify('Official fee receipt PDF generated successfully!', 'success');
  }

  // ============================================================================
  // 11D. STUDENT PROFILE DOSSIER DRAWER
  // ============================================================================

  function initStudentProfileDrawer() {
    const drawer = document.getElementById('drawer-student-profile');
    const closeBtn = document.getElementById('btn-close-student-drawer');
    const btnRecordPay = document.getElementById('drawer-btn-record-payment');

    closeBtn?.addEventListener('click', () => drawer?.classList.add('hidden'));

    // Click on the dark backdrop (not inner panel) closes the drawer
    drawer?.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.add('hidden');
    });

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && !drawer.classList.contains('hidden')) {
        drawer.classList.add('hidden');
      }
    });

    btnRecordPay?.addEventListener('click', () => {
      const studentId = btnRecordPay.getAttribute('data-student-id');
      drawer?.classList.add('hidden');
      if (studentId) openRecordPaymentModal(studentId);
    });
  }

  function openStudentProfileDrawer(studentId) {
    const student = state.data.students.find(s => s.id === studentId);
    if (!student) {
      notify('Student profile not found.', 'error');
      return;
    }

    const drawer = document.getElementById('drawer-student-profile');
    const initial = (student.name || 'S').charAt(0).toUpperCase();

    const totalFee = Number(student.total_fee !== undefined ? student.total_fee : 0);
    const amountPaid = Number(student.amount_paid !== undefined ? student.amount_paid : 0);
    const balanceDue = Number(student.balance_due !== undefined ? student.balance_due : Math.max(0, totalFee - amountPaid));
    const status = student.payment_status || (amountPaid >= totalFee && totalFee > 0 ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid'));

    // Populate Dossier
    const elInit = document.getElementById('drawer-student-avatar');
    const elName = document.getElementById('drawer-student-name');
    const elTrack = document.getElementById('drawer-student-track');
    const elBadge = document.getElementById('drawer-student-status-badge');
    const elTotal = document.getElementById('drawer-student-total-fee');
    const elPaid = document.getElementById('drawer-student-amount-paid');
    const elBal = document.getElementById('drawer-student-balance-due');
    const elPhone = document.getElementById('drawer-student-phone');
    const elRes = document.getElementById('drawer-student-residence');
    const elCohort = document.getElementById('drawer-student-cohort');
    const elMode = document.getElementById('drawer-student-transport');
    const elVeh = document.getElementById('drawer-student-transport');
    const btnRecordPay = document.getElementById('drawer-btn-record-payment');

    if (elInit) elInit.textContent = initial;
    if (elName) elName.textContent = student.name;
    if (elCohort) elCohort.textContent = `${student.cohort || 'August Bootcamp'} \u2022 ${student.track || 'General'}`;
    if (elTrack) elTrack.textContent = student.track || 'General Track';

    if (elBadge) {
      if (status === 'Paid') {
        elBadge.className = 'badge-fee-paid inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold';
        elBadge.innerHTML = '<i data-lucide="check-circle" class="w-3.5 h-3.5"></i><span>Paid in Full</span>';
      } else if (status === 'Partial') {
        elBadge.className = 'badge-fee-partial inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold';
        elBadge.innerHTML = `<i data-lucide="clock" class="w-3.5 h-3.5"></i><span>Partial (Due KES ${balanceDue.toLocaleString()})</span>`;
      } else {
        elBadge.className = 'badge-fee-unpaid inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold';
        elBadge.innerHTML = '<i data-lucide="alert-circle" class="w-3.5 h-3.5"></i><span>Unpaid</span>';
      }
    }

    if (elTotal) elTotal.textContent = `KES ${totalFee.toLocaleString()}`;
    if (elPaid) elPaid.textContent = `KES ${amountPaid.toLocaleString()}`;
    if (elBal) elBal.textContent = `KES ${balanceDue.toLocaleString()}`;

    if (elPhone) {
      elPhone.textContent = student.phone || 'N/A';
      elPhone.href = student.phone ? `tel:${student.phone}` : '#';
    }
    if (elRes) elRes.textContent = student.residence || 'Campus / Walk-in';
    const transportLabel = (student.transport_mode || 'self_arrival').replace(/_/g, ' ').toUpperCase();
    const vehLabel = student.assigned_vehicle ? ` (${student.assigned_vehicle})` : '';
    if (elMode) elMode.textContent = `${transportLabel}${vehLabel}`;

    const notesBox = document.getElementById('drawer-student-notes-box');
    const notesEl = document.getElementById('drawer-student-notes');
    if (student.notes && student.notes.trim()) {
      if (notesEl) notesEl.textContent = student.notes;
      notesBox?.classList.remove('hidden');
    } else {
      notesBox?.classList.add('hidden');
    }

    if (btnRecordPay) {
      btnRecordPay.setAttribute('data-student-id', student.id);
      const user = state.currentUser;
      btnRecordPay.style.display = (user && (user.role === 'super_admin' || user.role === 'receptionist')) ? 'flex' : 'none';
    }

    // Populate Payment History List
    const historyBody = document.getElementById('drawer-payments-list');
    const noMsg = document.getElementById('drawer-no-payments-msg');
    const studentPayments = (state.data.feePayments || []).filter(p => p.student_id === student.id);
    const payCountEl = document.getElementById('drawer-payment-count');
    if (payCountEl) payCountEl.textContent = `${studentPayments.length} Payment${studentPayments.length === 1 ? '' : 's'}`;

    if (historyBody) {
      historyBody.innerHTML = '';
      if (studentPayments.length === 0) {
        historyBody.innerHTML = '<div class="p-4 text-center text-xs text-slate-400 font-medium">No payment records yet.</div>';
        noMsg?.classList.remove('hidden');
      } else {
        noMsg?.classList.add('hidden');
        studentPayments.forEach(p => {
          const div = document.createElement('div');
          div.className = 'flex items-center justify-between p-3 border-b border-slate-100 text-xs hover:bg-slate-50 transition-colors';
          div.innerHTML = `
            <div>
              <div class="font-mono font-bold text-slate-700">${escapeHTML(p.payment_date || '')}</div>
              <div class="text-slate-500">${escapeHTML(p.payment_method || 'M-Pesa')} &bull; <span class="font-mono text-slate-600">${escapeHTML(p.reference_code || 'N/A')}</span></div>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-extrabold text-emerald-700">KES ${Number(p.amount || 0).toLocaleString()}</span>
              <button data-receipt-payment-id="${p.id}" class="btn-profile-receipt p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 transition-colors" title="View Receipt">
                <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          `;
          historyBody.appendChild(div);
        });

        historyBody.querySelectorAll('.btn-profile-receipt').forEach(btn => {
          btn.addEventListener('click', () => {
            const payId = btn.getAttribute('data-receipt-payment-id');
            openReceiptModal(student.id, payId);
          });
        });
      }
    }

    drawer?.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  // ============================================================================
  // 12. BULK CSV UPLOAD FOR STUDENT ONBOARDING & FEES (PAPAPARSE)
  // ============================================================================

  let parsedBulkData = [];

  function initBulkCSVImport() {
    const modal = document.getElementById('modal-bulk-import');
    const closeBtn = document.getElementById('btn-close-bulk-import');
    const cancelBtn = document.getElementById('btn-cancel-bulk-import');
    const sampleBtn = document.getElementById('btn-download-sample-csv');
    const dropzone = document.getElementById('csv-dropzone');
    const fileInput = document.getElementById('csv-file-input');
    const reselectBtn = document.getElementById('btn-reselect-csv');
    const confirmBtn = document.getElementById('btn-confirm-bulk-import');

    closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));
    cancelBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

    // Download Sample Template
    sampleBtn?.addEventListener('click', () => {
      const sampleCSV = `student_name,parent_name,parent_phone,track,pickup_location,requires_transport,total_fee,amount_paid
Student Full Name,Parent / Guardian Name,+254 700 000 000,Web Development,Eldoret Campus,No,0,0
Another Student,Another Guardian,+254 711 111 111,Junior Robotics,Elgon View,Yes,15000,5000`;

      const blob = new Blob([sampleCSV], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'eldohub_bootcamp_students_sample.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      notify('Sample CSV template downloaded!', 'success');
    });

    // Reselect file button
    reselectBtn?.addEventListener('click', () => {
      if (fileInput) fileInput.value = '';
      parsedBulkData = [];
      document.getElementById('csv-preview-container')?.classList.add('hidden');
      document.getElementById('csv-dropzone')?.classList.remove('hidden');
      fileInput?.click();
    });

    // Clicking anywhere on dropzone triggers file picker
    dropzone?.addEventListener('click', () => {
      fileInput?.click();
    });

    // Drag and drop event listeners on dropzone
    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('border-emerald-500', 'bg-emerald-50/50');
      });
    });

    ['dragleave', 'dragend'].forEach(eventName => {
      dropzone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/50');
      });
    });

    dropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/50');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleBulkCSVFile(e.dataTransfer.files[0]);
      }
    });

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleBulkCSVFile(e.target.files[0]);
      }
    });

    confirmBtn?.addEventListener('click', async () => {
      await executeBulkImportCommit();
    });
  }

  function handleBulkCSVFile(file) {
    if (!file || !file.name.toLowerCase().endsWith('.csv')) {
      notify('Please select a valid .csv file.', 'error');
      return;
    }

    if (!window.Papa) {
      notify('CSV parsing engine loading, please retry in a moment...', 'error');
      return;
    }

    const fileNameLabel = document.getElementById('csv-file-name-label');
    if (fileNameLabel) fileNameLabel.textContent = file.name;

    window.Papa.parse(file, {
      header: true,
      skipEmptyLines: 'greedy',
      transformHeader: h => h.trim().toLowerCase().replace(/\s+/g, '_'),
      complete: function(results) {
        if (!results.data || results.data.length === 0) {
          notify('The selected CSV file appears to be empty.', 'error');
          return;
        }
        processParsedCSVRows(results.data);
      },
      error: function(err) {
        notify('Failed to parse CSV file: ' + err.message, 'error');
      }
    });
  }

  function processParsedCSVRows(rows) {
    parsedBulkData = [];
    let validCount = 0;
    let invalidCount = 0;

    const defaultTrack = (state.data.tracks && state.data.tracks.bootcamp && state.data.tracks.bootcamp.length > 0)
      ? state.data.tracks.bootcamp[0]
      : 'General Track';

    rows.forEach((row, idx) => {
      // Lenient column matching for student name
      const name = (
        row.full_name || row.student_name || row.name || row.student || 
        row.learner || row.learner_name || row.pupil || row.child_name || 
        row.first_name || ''
      ).trim();

      // Lenient column matching for parent/guardian
      const parentName = (
        row.parent_name || row.guardian_name || row.parent || row.guardian || 
        row.mother || row.father || row.parents_name || row.parent_guardian || ''
      ).trim();

      // Lenient column matching for parent/guardian contact
      const phone = (
        row.parent_phone_number || row.parent_phone || row.phone || row.phone_number || row.mobile || 
        row.mobile_number || row.contact || row.parent_contact || 
        row.guardian_phone || row.tel || row.telephone || ''
      ).trim();

      // Lenient column matching for track / course / bootcamp
      let bootcamp = (
        row.bootcamp_name || row.bootcamp || row.track || row.course || 
        row.bootcamp_track || row.course_track || row.class || row.stream || 
        row.program || ''
      ).trim();

      // If track is omitted, default to system track instead of rejecting
      if (!bootcamp) {
        bootcamp = defaultTrack;
      }

      // Determine transport mode and location
      const pickupRaw = (
        row.pickup_location || row.pickup || row.location || row.residence || 
        row.stop || row.stage || row.estate || ''
      ).trim();
      const pickupLower = pickupRaw.toLowerCase();
      const reqTransport = (
        row.requires_transport || row.transport || row.transport_mode || 
        row.bus || row.van || ''
      ).trim().toLowerCase();

      let transportMode, location;
      if (row.transport_mode && ['both', 'morning_bus', 'evening_bus', 'parent_pickup', 'self_arrival'].includes(row.transport_mode)) {
        transportMode = row.transport_mode;
        location = pickupRaw || (transportMode === 'self_arrival' ? 'Campus / Walk-in' : 'Eldoret');
      } else if (reqTransport === 'no' || reqTransport === 'false' || reqTransport === 'none' || pickupLower === 'self arrival' || pickupLower === 'self' || pickupLower === 'walk in' || pickupLower === 'walk-in') {
        transportMode = 'self_arrival';
        location = pickupRaw || 'Campus / Walk-in';
      } else if (reqTransport === 'both' || pickupLower.includes('both')) {
        transportMode = 'both';
        location = pickupRaw || 'Eldoret';
      } else if (pickupLower === 'parent pickup' || pickupLower === 'parent' || pickupLower === 'parent drop' || pickupLower === 'parent drop-off') {
        transportMode = 'parent_pickup';
        location = pickupRaw;
      } else if (pickupRaw && pickupRaw !== '') {
        // Any specific location name defaults to morning bus pickup
        transportMode = 'morning_bus';
        location = pickupRaw;
      } else {
        transportMode = 'self_arrival';
        location = 'Campus / Walk-in';
      }

      const totalFee = Math.max(0, parseFloat(
        row.total_fee || row.fee || row.fees || row.tuition || row.amount || row.total || 0
      ) || 0);

      const amountPaid = Math.max(0, parseFloat(
        row.amount_paid || row.paid || row.deposit || row.initial_payment || 0
      ) || 0);

      const balanceDue = Math.max(0, totalFee - amountPaid);
      const paymentStatus = totalFee > 0
        ? (amountPaid >= totalFee ? 'Paid' : (amountPaid > 0 ? 'Partial' : 'Unpaid'))
        : (amountPaid > 0 ? 'Paid' : 'Cleared');

      // Validation: Only student name is strictly required
      const errors = [];
      if (!name || name.length < 2) errors.push('Missing Student Name');
      if (phone && phone.length < 5) errors.push('Invalid Parent Phone');

      const isValid = errors.length === 0;
      if (isValid) validCount++;
      else invalidCount++;

      parsedBulkData.push({
        index: idx + 1,
        name,
        parentName,
        phone,
        bootcamp,
        location,
        transportMode,
        totalFee,
        amountPaid,
        balanceDue,
        paymentStatus,
        isValid,
        errors
      });
    });

    renderBulkPreviewTable(validCount, invalidCount);
  }

  function renderBulkPreviewTable(validCount, invalidCount) {
    const previewContainer = document.getElementById('csv-preview-container');
    const dropzone = document.getElementById('csv-dropzone');
    const tbody = document.getElementById('csv-preview-tbody');
    const elValid = document.getElementById('csv-valid-rows-badge');
    const elInvalid = document.getElementById('csv-invalid-rows-badge');
    const elTotal = document.getElementById('csv-total-rows-badge');
    const validationWarning = document.getElementById('csv-validation-warning');
    const confirmBtn = document.getElementById('btn-confirm-bulk-import');
    const confirmBtnText = document.getElementById('btn-confirm-bulk-import-text');

    if (elValid) elValid.textContent = `${validCount} Valid`;
    if (elInvalid) {
      elInvalid.textContent = `${invalidCount} Issue${invalidCount === 1 ? '' : 's'}`;
      elInvalid.classList.toggle('hidden', invalidCount === 0);
    }
    if (elTotal) elTotal.textContent = `${parsedBulkData.length} Row${parsedBulkData.length === 1 ? '' : 's'}`;

    if (validationWarning) {
      validationWarning.classList.toggle('hidden', invalidCount === 0);
    }

    if (confirmBtn) {
      confirmBtn.disabled = validCount === 0;
    }
    if (confirmBtnText) {
      confirmBtnText.textContent = validCount > 0 
        ? `Import ${validCount} Valid Student${validCount === 1 ? '' : 's'}`
        : 'No Valid Records to Import';
    }

    if (!tbody) return;
    tbody.innerHTML = '';

    parsedBulkData.forEach(item => {
      const tr = document.createElement('tr');
      tr.className = item.isValid ? 'hover:bg-slate-50 transition-colors border-b border-slate-100 text-xs' : 'bg-rose-50/50 hover:bg-rose-50 transition-colors border-b border-rose-100 text-xs';

      const validationBadge = item.isValid
        ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"><i data-lucide="check" class="w-3 h-3"></i>Valid</span>'
        : `<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800" title="${item.errors.join(', ')}"><i data-lucide="alert-circle" class="w-3 h-3"></i>${item.errors.join(', ')}</span>`;

      tr.innerHTML = `
        <td class="py-2.5 px-3 font-mono text-center text-slate-400 font-bold">${item.index}</td>
        <td class="py-2.5 px-3 text-center">${validationBadge}</td>
        <td class="py-2.5 px-3 font-bold text-slate-900">${escapeHTML(item.name || '"”')}</td>
        <td class="py-2.5 px-3 text-slate-600 font-mono">${escapeHTML(item.phone || '"”')}</td>
        <td class="py-2.5 px-3 font-semibold text-indigo-700">${escapeHTML(item.bootcamp || '"”')}</td>
        <td class="py-2.5 px-3 text-slate-600">${escapeHTML(item.location || 'Campus')}</td>
        <td class="py-2.5 px-3 font-medium text-slate-700">${
          item.transportMode === 'both'
            ? `<span class="text-teal-700 font-bold">Both Pick-up & Drop-off</span>`
            : item.transportMode === 'morning_bus'
              ? `<span class="text-amber-700 font-bold">Morning Bus</span>`
              : item.transportMode === 'evening_bus'
                ? `<span class="text-indigo-700 font-bold">Evening Drop-off</span>`
                : item.transportMode === 'parent_pickup'
                  ? 'Parent Pickup'
                  : 'Self Arrival'
        }</td>
        <td class="py-2.5 px-3 font-mono font-bold text-right text-slate-700">KES ${item.totalFee.toLocaleString()}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-right text-emerald-700">KES ${item.amountPaid.toLocaleString()}</td>
        <td class="py-2.5 px-3 font-mono font-bold text-right ${item.balanceDue > 0 ? 'text-rose-600' : 'text-slate-500'}">KES ${item.balanceDue.toLocaleString()}</td>
      `;
      tbody.appendChild(tr);
    });

    previewContainer?.classList.remove('hidden');
    dropzone?.classList.add('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  async function executeBulkImportCommit() {
    const user = state.currentUser;
    const validRows = parsedBulkData.filter(d => d.isValid);
    if (validRows.length === 0) {
      notify('No valid student rows to import.', 'error');
      return;
    }

    const confirmBtn = document.getElementById('btn-confirm-bulk-import');
    if (confirmBtn) {
      confirmBtn.disabled = true;
      confirmBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Importing Students & Fees...</span>';
      if (window.lucide) window.lucide.createIcons();
    }

    const activeVehicles = getActiveVehicles();
    const defaultVehicle = activeVehicles.length > 0 ? activeVehicles[0].name : 'Bus 01';
    const activeCohort = state.activeCohort || 'August Bootcamp';

    const newStudents = [];
    const newPayments = [];

    validRows.forEach(row => {
      // Ensure track exists in state
      if (!state.data.tracks.bootcamp.includes(row.bootcamp)) {
        state.data.tracks.bootcamp.push(row.bootcamp);
      }

      const studentId = generateUUID();
      const student = {
        id: studentId,
        name: row.name,
        phone: row.phone,
        residence: row.location || 'Eldoret Campus',
        branch: 'bootcamp',
        cohort: activeCohort,
        track: row.bootcamp,
        transport_mode: row.transportMode,
        assigned_vehicle: (row.transportMode === 'morning_bus' || row.transportMode === 'both' || row.transportMode === 'evening_bus') ? defaultVehicle : '',
        total_fee: row.totalFee,
        amount_paid: row.amountPaid,
        balance_due: row.balanceDue,
        payment_status: row.paymentStatus,
        notes: row.parentName ? `Parent: ${row.parentName}` : '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      newStudents.push(student);
      state.data.students.push(student);

      // If initial fee was paid, create transaction
      if (row.amountPaid > 0) {
        const paymentRecord = {
          id: generateUUID(),
          student_id: studentId,
          student_name: row.name,
          amount: row.amountPaid,
          payment_date: new Date().toISOString().split('T')[0],
          payment_method: 'M-Pesa / Initial',
          reference_code: 'BULK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          notes: 'Bulk onboarding enrollment initial fee',
          recorded_by: user ? user.id : null,
          recorded_by_name: user ? user.full_name : 'Bulk Importer',
          created_at: new Date().toISOString()
        };
        newPayments.push(paymentRecord);
        if (!state.data.feePayments) state.data.feePayments = [];
        state.data.feePayments.unshift(paymentRecord);
      }
    });

    saveStoredData();

    // Outbox & Realtime Sync
    enqueueOutbox('BULK_IMPORT_STUDENTS', { students: newStudents, payments: newPayments });
    flushOutboxQueue();

    logAuditAction('BULK_IMPORT_STUDENTS', 'student_batch', 'batch_' + Date.now(), {
      count: newStudents.length,
      total_fees_expected: newStudents.reduce((sum, s) => sum + s.total_fee, 0),
      total_fees_collected: newPayments.reduce((sum, p) => sum + p.amount, 0),
      cohort: activeCohort
    });

    notify(`Successfully imported ${newStudents.length} students into ${activeCohort}!`, 'success');

    // Reset Modal
    parsedBulkData = [];
    const modal = document.getElementById('modal-bulk-import');
    const previewContainer = document.getElementById('csv-preview-container');
    const dropzone = document.getElementById('csv-dropzone');
    const fileInput = document.getElementById('csv-file-input');
    if (fileInput) fileInput.value = '';
    previewContainer?.classList.add('hidden');
    dropzone?.classList.remove('hidden');
    modal?.classList.add('hidden');

    state.activeCohort = activeCohort;
    // If imported students are self arrival and currently on bus manifest, switch to class attendance
    const hasBusTransport = newStudents.some(s => s.transport_mode === 'morning_bus' || s.transport_mode === 'both');
    if (!hasBusTransport && (state.activeManifestType === 'morning_pickup' || state.activeManifestType === 'evening_dropoff')) {
      state.activeManifestType = 'class_attendance';
    }

    renderApp();
  }

  function openBulkImportModal() {
    const user = state.currentUser;
    if (user && user.role !== 'super_admin' && user.role !== 'receptionist') {
      notify('Access Denied: Only Super Admin and Receptionist can perform bulk CSV student onboarding.', 'error');
      return;
    }

    const modal = document.getElementById('modal-bulk-import');
    const previewContainer = document.getElementById('csv-preview-container');
    const dropzone = document.getElementById('csv-dropzone');
    const fileInput = document.getElementById('csv-file-input');
    const tbody = document.getElementById('csv-preview-tbody');
    const validationWarning = document.getElementById('csv-validation-warning');

    if (fileInput) fileInput.value = '';
    if (tbody) tbody.innerHTML = '';
    previewContainer?.classList.add('hidden');
    validationWarning?.classList.add('hidden');
    dropzone?.classList.remove('hidden');
    parsedBulkData = [];
    modal?.classList.remove('hidden');
  }

  // ============================================================================
  // 13. GENERAL LISTENERS & SETTINGS MODAL
  // ============================================================================

  function initGeneralListeners() {
    // Sidebar toggle
    const toggleBtn = document.getElementById('btn-toggle-sidebar');
    const closeSidebarMobile = document.getElementById('btn-close-sidebar-mobile');
    const backdrop = document.getElementById('sidebar-backdrop');
    const sidebar = document.getElementById('app-sidebar');

    function syncSidebarToggleState() {
      if (!toggleBtn || !sidebar) return;
      let isOpen = false;
      if (window.innerWidth <= 1024) {
        isOpen = sidebar.classList.contains('mobile-open');
      } else {
        isOpen = !sidebar.classList.contains('collapsed');
      }
      if (isOpen) {
        toggleBtn.classList.add('is-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        toggleBtn.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }

    function closeMobileDrawer() {
      if (window.innerWidth <= 1024) {
        sidebar?.classList.remove('mobile-open');
        backdrop?.classList.add('hidden');
        syncSidebarToggleState();
      }
    }

    function toggleSidebar() {
      if (window.innerWidth <= 1024) {
        sidebar?.classList.remove('collapsed');
        sidebar?.classList.toggle('mobile-open');
        backdrop?.classList.toggle('hidden');
      } else {
        sidebar?.classList.remove('mobile-open');
        backdrop?.classList.add('hidden');
        sidebar?.classList.toggle('collapsed');
      }
      syncSidebarToggleState();
    }

    toggleBtn?.addEventListener('click', toggleSidebar);
    closeSidebarMobile?.addEventListener('click', closeMobileDrawer);
    backdrop?.addEventListener('click', closeMobileDrawer);
    window.addEventListener('resize', syncSidebarToggleState);

    // Sync initial hamburger button & sidebar state
    syncSidebarToggleState();

    // Primary Top Navigation & Views
    document.getElementById('tab-nav-fees')?.addEventListener('click', () => {
      const user = state.currentUser;
      if (user && user.role !== 'super_admin' && user.role !== 'receptionist') {
        notify('Access Denied: Fees & Payments view is restricted to Super Admin and Receptionist.', 'error');
        return;
      }
      state.activeViewModule = 'fees_payments';
      closeMobileDrawer();
      renderApp();
    });

    document.getElementById('dock-btn-fees')?.addEventListener('click', () => {
      const user = state.currentUser;
      if (user && user.role !== 'super_admin' && user.role !== 'receptionist') {
        notify('Access Denied: Fees & Payments view is restricted to Super Admin and Receptionist.', 'error');
        return;
      }
      state.activeViewModule = 'fees_payments';
      renderApp();
    });

    document.getElementById('dock-btn-bootcamp')?.addEventListener('click', () => {
      state.activeBranch = 'bootcamp';
      state.activeViewModule = 'manifest_operations';
      renderApp();
    });

    // Bulk Import Triggers
    const bulkImportTriggers = [
      document.getElementById('header-btn-bulk-import'),
      document.getElementById('toolbar-btn-bulk-import'),
      document.getElementById('btn-sidebar-bulk-import')
    ];
    bulkImportTriggers.forEach(btn => {
      btn?.addEventListener('click', () => {
        closeMobileDrawer();
        openBulkImportModal();
      });
    });

    // Manifest Tab buttons
    const navItems = [
      { id: 'tab-logistics-morning', type: 'morning_pickup' },
      { id: 'tab-logistics-evening', type: 'evening_dropoff' },
      { id: 'tab-logistics-gate', type: 'gate_pickup' },
      { id: 'tab-logistics-class', type: 'class_attendance' }
    ];

    navItems.forEach(item => {
      document.getElementById(item.id)?.addEventListener('click', () => {
        state.activeManifestType = item.type;
        state.activeViewModule = 'manifest_operations';
        closeMobileDrawer();
        renderApp();
      });
    });

    // Super Admin Navigation Tabs
    document.getElementById('tab-nav-staff')?.addEventListener('click', () => {
      if (state.currentUser?.role !== 'super_admin') {
        notify('Access Denied: Super Administrator access required.', 'error');
        return;
      }
      state.activeViewModule = 'staff_management';
      closeMobileDrawer();
      renderApp();
    });

    document.getElementById('tab-nav-audit')?.addEventListener('click', () => {
      if (state.currentUser?.role !== 'super_admin') {
        notify('Access Denied: Super Administrator access required.', 'error');
        return;
      }
      state.activeViewModule = 'audit_logs';
      closeMobileDrawer();
      renderApp();
    });

    // Additional sidebar action buttons auto-close mobile drawer
    document.getElementById('btn-open-settings')?.addEventListener('click', () => {
      closeMobileDrawer();
    });
    document.getElementById('btn-open-onboarding')?.addEventListener('click', () => {
      closeMobileDrawer();
    });
    document.getElementById('btn-trigger-print')?.addEventListener('click', () => {
      closeMobileDrawer();
    });
    document.getElementById('btn-export-csv')?.addEventListener('click', () => {
      closeMobileDrawer();
    });
    document.getElementById('btn-export-pdf')?.addEventListener('click', () => {
      closeMobileDrawer();
    });

    // Refresh audit button
    document.getElementById('btn-refresh-audit')?.addEventListener('click', () => {
      fetchSupabaseData();
      renderAuditLogsTable();
      notify('Audit log entries refreshed.', 'info');
    });

    // Search bar
    const searchInput = document.getElementById('manifest-search-input');
    searchInput?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderManifestTable();
      updateKPIs();
      if (window.lucide) window.lucide.createIcons();
    });

    // Date selector
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
  }

  function initSettingsModal() {
    const modal = document.getElementById('modal-settings');
    const openBtn = document.getElementById('btn-open-settings');
    const closeBtn = document.getElementById('btn-close-settings');
    const syncModalBtn = document.getElementById('btn-sync-modal-now');
    const exportBackupBtn = document.getElementById('btn-export-backup-json');
    const sidebarSyncBtn = document.getElementById('sidebar-sync-now');

    openBtn?.addEventListener('click', () => modal?.classList.remove('hidden'));
    closeBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

    const triggerSync = async (btn) => {
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4 animate-spin"></i><span>Syncing...</span>';
        if (window.lucide) window.lucide.createIcons();
      }
      if (state.data.students && state.data.students.length > 0) {
        enqueueOutbox('BULK_IMPORT_STUDENTS', {
          students: state.data.students,
          payments: state.data.feePayments || []
        });
      }
      await flushOutboxQueue();
      await fetchSupabaseData(true);
      renderApp();
      const remaining = getOutboxQueue();
      if (btn) {
        btn.disabled = false;
        if (remaining.length === 0) {
          btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Synchronized!</span>';
          notify('Cloud synchronization complete! All records backed up.', 'success');
        } else {
          btn.innerHTML = '<i data-lucide="alert-circle" class="w-4 h-4"></i><span>Sync Failed</span>';
          notify(`Sync pending: ${remaining.length} item(s) could not be written to cloud.`, 'error');
        }
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => {
          btn.innerHTML = '<i data-lucide="refresh-cw" class="w-4 h-4"></i><span>Synchronize Now</span>';
          if (window.lucide) window.lucide.createIcons();
        }, 2500);
      }
    };

    syncModalBtn?.addEventListener('click', () => triggerSync(syncModalBtn));
    sidebarSyncBtn?.addEventListener('click', () => triggerSync(sidebarSyncBtn));

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

    // --- Logo Upload & Reset ---
    const logoInput = document.getElementById('input-custom-logo');
    const logoPreview = document.getElementById('settings-logo-preview');
    const resetLogoBtn = document.getElementById('btn-reset-default-logo');
    const DEFAULT_LOGO_SRC = './images/eldohub-academy-logo.png';

    function applyLogo(src) {
      document.querySelectorAll('#academy-logo-img, .app-brand-logo, #print-document img[alt]').forEach(img => img.src = src);
      if (logoPreview) logoPreview.src = src;
    }

    // Restore saved logo on load
    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo) applyLogo(savedLogo);

    logoInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        notify('Please select a valid image file (PNG, JPG, SVG).', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
        applyLogo(dataUrl);
        notify('Institution logo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    });

    resetLogoBtn?.addEventListener('click', () => {
      localStorage.removeItem(LOGO_STORAGE_KEY);
      applyLogo(DEFAULT_LOGO_SRC);
      notify('Logo restored to default.', 'info');
    });
  }

  // ============================================================================
  // 10B. DYNAMIC FLEET & VEHICLE MANAGEMENT
  // ============================================================================

  function initFleetManagement() {
    const modal = document.getElementById('modal-manage-fleet');
    const openBtn = document.getElementById('btn-open-fleet-modal');
    const closeBtn = document.getElementById('btn-close-fleet-modal');
    const form = document.getElementById('form-add-vehicle');
    const listContainer = document.getElementById('fleet-list-container');
    const totalCountBadge = document.getElementById('fleet-total-count-badge');

    function openModal() {
      const user = state.currentUser;
      if (user && user.role !== 'super_admin' && user.role !== 'transport_officer') {
        notify('Access Denied: Only Transport Officers and Super Administrators can manage fleet units.', 'error');
        return;
      }
      renderFleetList();
      modal?.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }

    function closeModal() {
      modal?.classList.add('hidden');
    }

    openBtn?.addEventListener('click', openModal);
    closeBtn?.addEventListener('click', closeModal);

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = state.currentUser;
      if (user && user.role !== 'super_admin' && user.role !== 'transport_officer') {
        notify('Unauthorized action.', 'error');
        return;
      }

      const name = document.getElementById('new-veh-name').value.trim();
      const type = document.getElementById('new-veh-type').value;
      const plate = document.getElementById('new-veh-plate').value.trim().toUpperCase();
      const capacity = parseInt(document.getElementById('new-veh-capacity').value, 10) || 30;

      if (!name) return;

      const activeVehicles = getActiveVehicles();
      if (activeVehicles.some(v => v.name.toLowerCase() === name.toLowerCase())) {
        notify(`A vehicle named "${name}" already exists in the fleet!`, 'error');
        return;
      }

      const newVehicle = {
        id: crypto.randomUUID ? crypto.randomUUID() : 'veh_' + Date.now(),
        name: name,
        type: type,
        plate: plate,
        capacity: capacity,
        is_active: true,
        created_at: new Date().toISOString()
      };

      if (!Array.isArray(state.data.vehicles)) {
        state.data.vehicles = [];
      }
      state.data.vehicles.push(newVehicle);
      saveStoredData();

      enqueueOutbox('INSERT_VEHICLE', newVehicle);
      await flushOutboxQueue();

      logAuditAction('ADD_VEHICLE', 'transport', newVehicle.id, {
        name: name,
        type: type,
        plate: plate,
        capacity: capacity
      });

      notify(`Transport unit "${name}" added to fleet!`, 'success');
      form.reset();
      renderFleetList();
      renderBranchControls();
      renderManifestTable();
    });

    function renderFleetList() {
      if (!listContainer) return;
      const vehicles = state.data.vehicles || [];

      if (totalCountBadge) {
        totalCountBadge.textContent = `${vehicles.length} Vehicle${vehicles.length === 1 ? '' : 's'}`;
      }

      if (vehicles.length === 0) {
        listContainer.innerHTML = '<div class="p-6 text-center text-xs text-slate-500 font-medium">No vehicles registered yet. Use the form above to add a bus or van.</div>';
        return;
      }

      listContainer.innerHTML = '';
      vehicles.forEach(veh => {
        const assignedStudents = state.data.students.filter(s => s.assigned_vehicle === veh.name);
        const item = document.createElement('div');
        item.className = 'p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors';
        const isBus = veh.type === 'bus';

        item.innerHTML = `
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl ${isBus ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-sky-100 text-sky-700 border border-sky-200'} flex items-center justify-center shrink-0">
              <i data-lucide="${isBus ? 'bus' : 'truck'}" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-sm text-slate-900">${escapeHTML(veh.name)}</span>
                <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isBus ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-sky-50 text-sky-700 border border-sky-200'}">
                  ${escapeHTML(veh.type)}
                </span>
                ${veh.plate ? `<span class="text-[11px] font-mono text-slate-500 font-bold">${escapeHTML(veh.plate)}</span>` : ''}
              </div>
              <div class="text-xs text-slate-500 flex items-center gap-3 mt-0.5 font-medium">
                <span>Capacity: <strong>${veh.capacity || 30} seats</strong></span>
                <span>Assigned: <strong>${assignedStudents.length} students</strong></span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button data-delete-veh="${veh.id}" class="btn-delete-veh touch-btn p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Remove vehicle from fleet">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        `;
        listContainer.appendChild(item);
      });

      if (window.lucide) window.lucide.createIcons();

      // Wire delete handlers
      listContainer.querySelectorAll('.btn-delete-veh').forEach(btn => {
        btn.addEventListener('click', async () => {
          const vehId = btn.getAttribute('data-delete-veh');
          const targetVeh = state.data.vehicles.find(v => v.id === vehId);
          if (!targetVeh) return;

          const assignedCount = state.data.students.filter(s => s.assigned_vehicle === targetVeh.name).length;
          const confirmMsg = assignedCount > 0
            ? `Vehicle "${targetVeh.name}" currently has ${assignedCount} student(s) assigned. Removing it will unassign them. Proceed?`
            : `Remove vehicle "${targetVeh.name}" from fleet?`;

          if (confirm(confirmMsg)) {
            // Unassign students
            state.data.students.forEach(s => {
              if (s.assigned_vehicle === targetVeh.name) s.assigned_vehicle = '';
            });
            // Remove vehicle
            state.data.vehicles = state.data.vehicles.filter(v => v.id !== vehId);
            saveStoredData();

            enqueueOutbox('DELETE_VEHICLE', { id: vehId });
            await flushOutboxQueue();

            logAuditAction('REMOVE_VEHICLE', 'transport', vehId, { name: targetVeh.name });
            notify(`Vehicle "${targetVeh.name}" removed from fleet.`, 'info');
            renderFleetList();
            renderBranchControls();
            renderManifestTable();
          }
        });
      });
    }
  }

  function initDynamicItemCreator() {
    const modal = document.getElementById('modal-add-item');
    const title = document.getElementById('modal-add-item-title');
    const label = document.getElementById('modal-add-item-label');
    const inputName = document.getElementById('input-new-item-name');
    const confirmBtn = document.getElementById('btn-confirm-add-item');
    const cancelBtn = document.getElementById('btn-cancel-add-item');
    const closeBtn = document.getElementById('btn-close-add-item');

    let currentMode = 'track';

    function openModal(mode) {
      if (state.currentUser?.role !== 'super_admin') {
        notify('Only Super Administrators can create cohorts and tracks.', 'error');
        return;
      }
      currentMode = mode;
      title.textContent = mode === 'track' ? 'Add New Curriculum Track' : 'Add New Intake Cohort';
      label.textContent = mode === 'track' ? 'Track Name' : 'Cohort Name';
      inputName.value = '';
      modal?.classList.remove('hidden');
      inputName.focus();
    }

    function closeModal() {
      modal?.classList.add('hidden');
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
          logAuditAction('ADD_TRACK', 'track', name, { branch, name });
          notify(`New track "${name}" added!`, 'success');
        }
      } else {
        if (!state.data.cohorts[branch].includes(name)) {
          state.data.cohorts[branch].push(name);
          state.activeCohort = name;
          saveStoredData();
          logAuditAction('ADD_COHORT', 'cohort', name, { branch, name });
          notify(`New cohort "${name}" added!`, 'success');
        }
      }
      closeModal();
      renderApp();
    });
  }


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

    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    }, 4000);
  }

  function generateSecureTempPassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    const array = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < 16; i++) array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array, byte => chars[byte % chars.length]).join('');
  }

  function escapeHTML(str) {
    if (typeof str !== 'string') return str || '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ============================================================================
  // 12. BOOTSTRAP INITIALIZATION
  // ============================================================================

  // PWA Install Prompt
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const btn = document.getElementById('btn-install-pwa');
    if (btn) btn.classList.remove('hidden');
  });
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const btn = document.getElementById('btn-install-pwa');
    if (btn) btn.classList.add('hidden');
  });

  document.addEventListener('DOMContentLoaded', () => {
    initBackgroundSlideshow();
    initGeneralListeners();
    initOnboarding();
    initDynamicItemCreator();
    initFleetManagement();
    initExportEngine();
    initFeesManagement();
    initRecordPaymentModal();
    initReceiptModal();
    initStudentProfileDrawer();
    initBulkCSVImport();
    initSettingsModal();
    initStaffManagement();
    initSupabase();
    initAuthSystem();
    initPasswordToggles();
    setupOfflineNetworkListeners();
    updateSyncIndicator();

    // Wire header sync pill click -> manual flush & cloud reconciliation
    document.getElementById('header-sync-status-btn')?.addEventListener('click', async () => {
      if (!navigator.onLine) {
        notify('No internet connection. Changes are safely stored on this device.', 'info');
        return;
      }
      notify('Synchronizing with Cloud Database...', 'info');
      if (state.data.students && state.data.students.length > 0) {
        enqueueOutbox('BULK_IMPORT_STUDENTS', {
          students: state.data.students,
          payments: state.data.feePayments || []
        });
      }
      await flushOutboxQueue();
      await fetchSupabaseData(true);
      renderApp();
      const remaining = getOutboxQueue();
      if (remaining.length === 0) {
        notify('Cloud synchronization complete! All records backed up.', 'success');
      } else {
        notify(`Sync pending: ${remaining.length} item(s) could not be written to cloud database. Check database permissions.`, 'error');
      }
    });

    // Wire PWA install button
    document.getElementById('btn-install-pwa')?.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') notify('Application installed successfully!', 'success');
      deferredPrompt = null;
      document.getElementById('btn-install-pwa')?.classList.add('hidden');
    });

    applyRolePermissions();
    renderApp();
  });

})();



