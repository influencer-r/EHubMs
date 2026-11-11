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
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

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

-- Ensure students table exists and has proper structure
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    residence VARCHAR(255) NOT NULL,
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('bootcamp', 'regular')),
    cohort VARCHAR(100) NOT NULL,
    track VARCHAR(100) NOT NULL,
    transport_mode VARCHAR(50) NOT NULL DEFAULT 'none' CHECK (
        transport_mode IN ('morning_bus', 'evening_bus', 'both', 'parent_pickup', 'self_arrival', 'none')
    ),
    notes TEXT DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

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

-- Dynamic Cohorts Table
CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('bootcamp', 'regular')),
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_cohort UNIQUE (branch, name)
);

-- Dynamic Tracks Table
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('bootcamp', 'regular')),
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_track UNIQUE (branch, name)
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
    IF user_tracks IS NULL OR array_length(user_tracks, 1) IS NULL THEN
        RETURN true; -- Unrestricted instructor can access all tracks
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
ALTER TABLE public.manifest_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
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

-- ------------------------------------------------------------------------------
-- A. PROFILES TABLE POLICIES
-- ------------------------------------------------------------------------------

-- Staff can view all active profiles (for names, directory, sign-off)
CREATE POLICY "Staff can view profiles" ON public.profiles
    FOR SELECT TO authenticated
    USING (is_active = true OR public.is_super_admin());

-- Only super administrators can insert, update, or deactivate profiles
CREATE POLICY "Super admins can insert profiles" ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admins can update profiles" ON public.profiles
    FOR UPDATE TO authenticated
    USING (public.is_super_admin() OR auth.uid() = id)
    WITH CHECK (public.is_super_admin() OR (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())));

CREATE POLICY "Super admins can delete profiles" ON public.profiles
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- B. STUDENTS TABLE POLICIES
-- ------------------------------------------------------------------------------

-- All active authenticated staff can view student records
CREATE POLICY "Staff can view students" ON public.students
    FOR SELECT TO authenticated
    USING (
        public.is_super_admin() OR 
        public.is_receptionist() OR 
        public.is_transport_officer() OR 
        (public.is_instructor() AND public.is_assigned_to_track(track))
    );

-- Super admin and Receptionist can register (INSERT) new students
CREATE POLICY "Admins and receptionists can insert students" ON public.students
    FOR INSERT TO authenticated
    WITH CHECK (public.is_super_admin() OR public.is_receptionist());

-- Super admin and Receptionist can edit student information
CREATE POLICY "Admins and receptionists can update students" ON public.students
    FOR UPDATE TO authenticated
    USING (public.is_super_admin() OR public.is_receptionist())
    WITH CHECK (public.is_super_admin() OR public.is_receptionist());

-- ONLY Super Administrator can DELETE students
CREATE POLICY "Only super admins can delete students" ON public.students
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- C. MANIFEST & ATTENDANCE LOGS POLICIES
-- ------------------------------------------------------------------------------

-- Staff can view manifest logs
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
CREATE POLICY "Authorized staff can insert manifest logs" ON public.manifest_logs
    FOR INSERT TO authenticated
    WITH CHECK (
        public.is_super_admin() OR
        (public.is_instructor() AND type = 'class_attendance') OR
        (public.is_transport_officer() AND type IN ('morning_pickup', 'evening_dropoff', 'gate_pickup'))
    );

-- UPDATE Manifest Logs:
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
CREATE POLICY "Only super admins can delete manifest logs" ON public.manifest_logs
    FOR DELETE TO authenticated
    USING (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- D. COHORTS & TRACKS POLICIES
-- ------------------------------------------------------------------------------

-- All authenticated staff can read active cohorts & tracks
CREATE POLICY "Staff can view cohorts" ON public.cohorts
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Only super admins can manage cohorts" ON public.cohorts
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

CREATE POLICY "Staff can view tracks" ON public.tracks
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Only super admins can manage tracks" ON public.tracks
    FOR ALL TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- ------------------------------------------------------------------------------
-- E. AUDIT LOGS POLICIES (Tamper-Proof)
-- ------------------------------------------------------------------------------

-- All authenticated staff can insert audit logs for actions they perform
CREATE POLICY "Staff can insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- ONLY Super Administrator can VIEW audit logs
CREATE POLICY "Only super admins can view audit logs" ON public.audit_logs
    FOR SELECT TO authenticated
    USING (public.is_super_admin());

-- NO ONE can update or delete audit logs (IMMUTABLE AUDIT TRAIL)
CREATE POLICY "No one can update audit logs" ON public.audit_logs
    FOR UPDATE TO authenticated
    USING (false);

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

    -- First registered user in system automatically becomes Super Administrator!
    IF user_count = 0 THEN
        assigned_role := 'super_admin'::public.app_role;
    ELSE
        -- Default role from raw_user_meta_data or instructor
        assigned_role := COALESCE(
            (NEW.raw_user_meta_data->>'role')::public.app_role, 
            'instructor'::public.app_role
        );
    END IF;

    user_name := COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1));

    INSERT INTO public.profiles (id, email, full_name, role, is_active)
    VALUES (NEW.id, NEW.email, user_name, assigned_role, true)
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
-- 8. REALTIME REPLICATION
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.audit_logs;
