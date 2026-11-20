-- ==============================================================================
-- EldoHub Tech & AI Academy - Institutional RBAC & Database Security Migration
-- Supabase PostgreSQL 15+ compatible with Row Level Security (RLS)
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. STAFF PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
-- ==============================================================================

-- Create user roles enumeration
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM (
        'super_admin',
        'instructor',
        'receptionist',
        'transport_officer'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- Staff Profiles table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    role public.app_role NOT NULL DEFAULT 'instructor',
    assigned_tracks TEXT[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_first_login BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_first_login BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles (role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles (email);

-- ==============================================================================
-- 3. AUDIT LOGGING TABLE (Append-Only Institutional Audit Trail)
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255) DEFAULT '',
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(100) DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON public.audit_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs (action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs (created_at DESC);

-- ==============================================================================
-- 4. UPDATE EXISTING TABLES FOR ATTENDANCE & AUDIT INTEGRITY
-- ==============================================================================

-- Ensure students table exists and has proper structure (Unified Bootcamps & Fees)
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    residence VARCHAR(255) NOT NULL,
    branch VARCHAR(50) NOT NULL DEFAULT 'bootcamp',
    cohort VARCHAR(100) NOT NULL,
    track VARCHAR(100) NOT NULL,
    transport_mode VARCHAR(50) NOT NULL DEFAULT 'none' CHECK (
        transport_mode IN ('morning_bus', 'evening_bus', 'both', 'parent_pickup', 'self_arrival', 'none')
    ),
    assigned_vehicle VARCHAR(100) DEFAULT '',
    total_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    balance_due NUMERIC(12, 2) GENERATED ALWAYS AS (total_fee - amount_paid) STORED,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'Unpaid' CHECK (
        payment_status IN ('Paid', 'Partial', 'Unpaid')
    ),
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='total_fee') THEN
        ALTER TABLE public.students ADD COLUMN total_fee NUMERIC(12, 2) NOT NULL DEFAULT 0.00;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='amount_paid') THEN
        ALTER TABLE public.students ADD COLUMN amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='balance_due') THEN
        ALTER TABLE public.students ADD COLUMN balance_due NUMERIC(12, 2) GENERATED ALWAYS AS (total_fee - amount_paid) STORED;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='students' AND column_name='payment_status') THEN
        ALTER TABLE public.students ADD COLUMN payment_status VARCHAR(20) NOT NULL DEFAULT 'Unpaid' CHECK (payment_status IN ('Paid', 'Partial', 'Unpaid'));
    END IF;
    ALTER TABLE public.students ALTER COLUMN branch SET DEFAULT 'bootcamp';
END $$;

-- Fee Payments Transaction Log Table
CREATE TABLE IF NOT EXISTS public.fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50) DEFAULT 'M-Pesa',
    reference_code VARCHAR(100) NOT NULL,
    notes TEXT DEFAULT '',
    recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    recorded_by_name VARCHAR(255) DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_fee_payments_student ON public.fee_payments (student_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_date ON public.fee_payments (payment_date DESC);
CREATE INDEX IF NOT EXISTS idx_fee_payments_ref ON public.fee_payments (reference_code);

-- Ensure manifest_logs has recorded_by and updated_at
CREATE TABLE IF NOT EXISTS public.manifest_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    type VARCHAR(50) NOT NULL CHECK (
        type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup', 'class_attendance')
    ),
    status VARCHAR(50) NOT NULL CHECK (
        status IN ('picked_up', 'dropped_off', 'checked_in', 'released', 'present', 'absent', 'pending')
    ),
    logged_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    notes TEXT DEFAULT '',
    recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    recorded_by_name VARCHAR(255) DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_student_date_manifest UNIQUE (student_id, date, type)
);

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='manifest_logs' AND column_name='recorded_by') THEN
        ALTER TABLE public.manifest_logs ADD COLUMN recorded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='manifest_logs' AND column_name='recorded_by_name') THEN
        ALTER TABLE public.manifest_logs ADD COLUMN recorded_by_name VARCHAR(255) DEFAULT '';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='manifest_logs' AND column_name='updated_at') THEN
        ALTER TABLE public.manifest_logs ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now());
    END IF;
END $$;

-- Dynamic Cohorts Table (Unified Bootcamps)
CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL DEFAULT 'bootcamp',
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_cohort UNIQUE (branch, name)
);

-- Dynamic Tracks Table (Unified Bootcamps)
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL DEFAULT 'bootcamp',
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_track UNIQUE (branch, name)
);

-- Dynamic Fleet & Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL DEFAULT 'bus',
    plate_number VARCHAR(50) DEFAULT '',
    capacity INT DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- 5. HELPER SECURITY FUNCTIONS (SECURITY DEFINER)
-- ==============================================================================

-- Returns current user's profile role
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true;
$$;

-- Checks if current user is active super administrator
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
    );
$$;

-- Checks if current user is active instructor
CREATE OR REPLACE FUNCTION public.is_instructor()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'instructor' AND is_active = true
    );
$$;

-- Checks if current user is active receptionist
CREATE OR REPLACE FUNCTION public.is_receptionist()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'receptionist' AND is_active = true
    );
$$;

-- Checks if current user is active transport officer
CREATE OR REPLACE FUNCTION public.is_transport_officer()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'transport_officer' AND is_active = true
    );
$$;

-- Checks if user is assigned to a specific track
CREATE OR REPLACE FUNCTION public.is_assigned_to_track(track_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_tracks TEXT[];
BEGIN
    SELECT assigned_tracks INTO user_tracks FROM public.profiles WHERE id = auth.uid() AND is_active = true;
    IF user_tracks IS NULL OR cardinality(user_tracks) = 0 THEN
        RETURN false; -- Strict RBAC: instructor must have explicit track assignment
    END IF;
    RETURN track_name = ANY(user_tracks);
END;
$$;

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifest_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow public read students" ON public.students;
DROP POLICY IF EXISTS "Allow public insert students" ON public.students;
DROP POLICY IF EXISTS "Allow public update students" ON public.students;
DROP POLICY IF EXISTS "Allow public delete students" ON public.students;

DROP POLICY IF EXISTS "Allow public read manifest_logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Allow public insert manifest_logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Allow public update manifest_logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Allow public delete manifest_logs" ON public.manifest_logs;

DROP POLICY IF EXISTS "Allow public read cohorts" ON public.cohorts;
DROP POLICY IF EXISTS "Allow public insert cohorts" ON public.cohorts;

DROP POLICY IF EXISTS "Allow public read tracks" ON public.tracks;
DROP POLICY IF EXISTS "Allow public insert tracks" ON public.tracks;

DROP POLICY IF EXISTS "Allow public read vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Allow public insert vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Allow public update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Allow public delete vehicles" ON public.vehicles;

-- ------------------------------------------------------------------------------
-- A. PROFILES TABLE POLICIES
-- ------------------------------------------------------------------------------

-- Staff can view all active profiles (for names, directory, sign-off)
DROP POLICY IF EXISTS "Staff can view profiles" ON public.profiles;
CREATE POLICY "Staff can view profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (is_active = true OR public.is_super_admin());

-- Only super administrators can insert profiles directly
DROP POLICY IF EXISTS "Super admins can insert profiles" ON public.profiles;
CREATE POLICY "Super admins can insert profiles" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (public.is_super_admin());

-- Super admins can update any profile; staff can only update their own profile while active
-- Staff CANNOT escalate their own role, reactivate themselves, or modify their assigned tracks
DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins and staff update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins update all, staff update only own display name" ON public.profiles;
CREATE POLICY "Super admins can update profiles" ON public.profiles
    FOR UPDATE TO authenticated
    USING (public.is_super_admin() OR (auth.uid() = id AND is_active = true))
    WITH CHECK (
        public.is_super_admin() OR (
            auth.uid() = id 
            AND is_active = true
            AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
            AND assigned_tracks = (SELECT assigned_tracks FROM public.profiles WHERE id = auth.uid())
        )
    );

DROP POLICY IF EXISTS "Super admins can delete profiles" ON public.profiles;
CREATE POLICY "Super admins can delete profiles" ON public.profiles
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- B. STUDENTS TABLE POLICIES
-- ------------------------------------------------------------------------------

-- All active authenticated staff can view student records
DROP POLICY IF EXISTS "Staff can view students" ON public.students;
CREATE POLICY "Staff can view students" ON public.students
    FOR SELECT TO authenticated
    USING (
        public.is_super_admin() OR 
        public.is_receptionist() OR 
        public.is_transport_officer() OR 
        (public.is_instructor() AND public.is_assigned_to_track(track))
    );

-- Super admin and Receptionist can register (INSERT) new students
DROP POLICY IF EXISTS "Admins and receptionists can insert students" ON public.students;
CREATE POLICY "Admins and receptionists can insert students" ON public.students
    FOR INSERT TO authenticated
    WITH CHECK (public.is_super_admin() OR public.is_receptionist());

-- Super admin, Receptionist and Transport Officers can edit student information (e.g. details, vehicle assignment)
DROP POLICY IF EXISTS "Admins, receptionists and transport officers can update students" ON public.students;
CREATE POLICY "Admins, receptionists and transport officers can update students" ON public.students
    FOR UPDATE TO authenticated
    USING (public.is_super_admin() OR public.is_receptionist() OR public.is_transport_officer())
    WITH CHECK (public.is_super_admin() OR public.is_receptionist() OR public.is_transport_officer());

-- ONLY Super Administrator can DELETE students
DROP POLICY IF EXISTS "Only super admins can delete students" ON public.students;
CREATE POLICY "Only super admins can delete students" ON public.students
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- C. MANIFEST & ATTENDANCE LOGS POLICIES
-- ------------------------------------------------------------------------------

-- Staff can view manifest logs
DROP POLICY IF EXISTS "Staff can view manifest logs" ON public.manifest_logs;
CREATE POLICY "Staff can view manifest logs" ON public.manifest_logs
    FOR SELECT TO authenticated
    USING (
        public.is_super_admin() OR 
        public.is_receptionist() OR 
        (public.is_transport_officer() AND type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup')) OR
        (public.is_instructor() AND type = 'class_attendance')
    );

-- INSERT Manifest Logs:
-- Super admin can insert any log.
-- Instructor can ONLY insert class_attendance logs for their assigned tracks.
-- Transport officer can ONLY insert morning_pickup, evening_dropoff, or gate_pickup logs.
DROP POLICY IF EXISTS "Authorized staff can insert manifest logs" ON public.manifest_logs;
CREATE POLICY "Authorized staff can insert manifest logs" ON public.manifest_logs
    FOR INSERT TO authenticated
    WITH CHECK (
        public.is_super_admin() OR
        (public.is_instructor() AND type = 'class_attendance') OR
        (public.is_transport_officer() AND type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup'))
    );

-- UPDATE Manifest Logs:
DROP POLICY IF EXISTS "Authorized staff can update manifest logs" ON public.manifest_logs;
CREATE POLICY "Authorized staff can update manifest logs" ON public.manifest_logs
    FOR UPDATE TO authenticated
    USING (
        public.is_super_admin() OR
        (public.is_instructor() AND type = 'class_attendance') OR
        (public.is_transport_officer() AND type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup'))
    )
    WITH CHECK (
        public.is_super_admin() OR
        (public.is_instructor() AND type = 'class_attendance') OR
        (public.is_transport_officer() AND type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup'))
    );

-- ONLY Super Admin can DELETE manifest logs
DROP POLICY IF EXISTS "Only super admins can delete manifest logs" ON public.manifest_logs;
CREATE POLICY "Only super admins can delete manifest logs" ON public.manifest_logs
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- D. COHORTS & TRACKS POLICIES
-- ------------------------------------------------------------------------------

-- All authenticated staff can read active cohorts & tracks
DROP POLICY IF EXISTS "Staff can view cohorts" ON public.cohorts;
CREATE POLICY "Staff can view cohorts" ON public.cohorts
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Only super admins can manage cohorts" ON public.cohorts;
CREATE POLICY "Only super admins can manage cohorts" ON public.cohorts
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Staff can view tracks" ON public.tracks;
CREATE POLICY "Staff can view tracks" ON public.tracks
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Only super admins can manage tracks" ON public.tracks;
CREATE POLICY "Only super admins can manage tracks" ON public.tracks
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can view vehicles" ON public.vehicles;
CREATE POLICY "Staff can view vehicles" ON public.vehicles
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Admins and transport officers can manage vehicles" ON public.vehicles;
CREATE POLICY "Admins and transport officers can manage vehicles" ON public.vehicles
    FOR ALL TO authenticated
    USING (public.is_super_admin() OR public.is_transport_officer())
    WITH CHECK (public.is_super_admin() OR public.is_transport_officer());

-- ------------------------------------------------------------------------------
-- D2. FEE PAYMENTS POLICIES (Super Admin & Receptionist Access)
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "Admins and receptionists can view fee payments" ON public.fee_payments;
CREATE POLICY "Admins and receptionists can view fee payments" ON public.fee_payments
    FOR SELECT TO authenticated
    USING (public.is_super_admin() OR public.is_receptionist());

DROP POLICY IF EXISTS "Admins and receptionists can insert fee payments" ON public.fee_payments;
CREATE POLICY "Admins and receptionists can insert fee payments" ON public.fee_payments
    FOR INSERT TO authenticated
    WITH CHECK (public.is_super_admin() OR public.is_receptionist());

DROP POLICY IF EXISTS "Only super admins can update fee payments" ON public.fee_payments;
CREATE POLICY "Only super admins can update fee payments" ON public.fee_payments
    FOR UPDATE TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

DROP POLICY IF EXISTS "Only super admins can delete fee payments" ON public.fee_payments;
CREATE POLICY "Only super admins can delete fee payments" ON public.fee_payments
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- Automatic Student Fee Sync Trigger on Payment Insertion
CREATE OR REPLACE FUNCTION public.sync_student_fee_on_payment()
RETURNS TRIGGER AS $$
DECLARE
    v_total_paid NUMERIC(12, 2);
    v_total_fee NUMERIC(12, 2);
    v_new_status VARCHAR(20);
BEGIN
    SELECT COALESCE(SUM(amount), 0) INTO v_total_paid
    FROM public.fee_payments
    WHERE student_id = NEW.student_id;

    SELECT total_fee INTO v_total_fee
    FROM public.students
    WHERE id = NEW.student_id;

    IF v_total_paid >= v_total_fee AND v_total_fee > 0 THEN
        v_new_status := 'Paid';
    ELSIF v_total_paid > 0 THEN
        v_new_status := 'Partial';
    ELSE
        v_new_status := 'Unpaid';
    END IF;

    UPDATE public.students
    SET amount_paid = v_total_paid,
        payment_status = v_new_status,
        updated_at = timezone('utc'::text, now())
    WHERE id = NEW.student_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_sync_fee_payments ON public.fee_payments;
CREATE TRIGGER trigger_sync_fee_payments
AFTER INSERT OR UPDATE OR DELETE ON public.fee_payments
FOR EACH ROW
EXECUTE FUNCTION public.sync_student_fee_on_payment();

-- ------------------------------------------------------------------------------
-- E. AUDIT LOGS POLICIES (Tamper-Proof)
-- ------------------------------------------------------------------------------

-- Authenticated staff can insert audit logs for actions they perform; role must match their real profile role
DROP POLICY IF EXISTS "Staff can insert audit logs" ON public.audit_logs;
CREATE POLICY "Staff can insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (
        auth.uid() = user_id 
        AND user_role = (SELECT role::text FROM public.profiles WHERE id = auth.uid())
    );

-- ONLY Super Administrator can VIEW audit logs
DROP POLICY IF EXISTS "Only super admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Only super admins can view audit logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (public.is_super_admin());

-- NO ONE can update or delete audit logs (IMMUTABLE AUDIT TRAIL)
DROP POLICY IF EXISTS "No one can update audit logs" ON public.audit_logs;
CREATE POLICY "No one can update audit logs" ON public.audit_logs
    FOR UPDATE TO authenticated
    USING (false);

DROP POLICY IF EXISTS "No one can delete audit logs" ON public.audit_logs;
CREATE POLICY "No one can delete audit logs" ON public.audit_logs
    FOR DELETE TO authenticated
    USING (false);

-- ==============================================================================
-- 7. AUTOMATIC PROFILE PROVISIONING TRIGGER (On New Auth User)
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_count INT;
    assigned_role public.app_role;
    user_name TEXT;
BEGIN
    SELECT count(*) INTO user_count FROM public.profiles;

    -- ONLY the first registered user in a completely empty system becomes Super Administrator
    IF user_count = 0 THEN
        assigned_role := 'super_admin'::public.app_role;
    ELSE
        -- HARDENED: Never trust raw_user_meta_data for role elevation!
        -- Any subsequent self-registration or invite defaults strictly to lowest-privilege 'instructor'
        -- Elevated roles can only be granted by an authenticated Super Administrator in the portal.
        assigned_role := 'instructor'::public.app_role;
    END IF;

    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

    INSERT INTO public.profiles (id, email, full_name, role, is_active, is_first_login)
    VALUES (NEW.id, NEW.email, user_name, assigned_role, true, (user_count > 0))
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_auth_user();

-- ==============================================================================
-- 8. REALTIME REPLICATION (Safe Idempotent Enrolment)
-- ==============================================================================
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_logs;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.vehicles;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.fee_payments;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
