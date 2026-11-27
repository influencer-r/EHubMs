-- ==============================================================================
-- FIX SUPABASE RLS & PROFILES FOR ELDOHUB ACADEMY
-- Run this script in the Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Project: https://sopqoumqblhtguprgtwx.supabase.co
-- ==============================================================================

-- 1. Ensure all authenticated users in auth.users have an active super_admin profile in public.profiles
INSERT INTO public.profiles (id, email, full_name, role, is_active, is_first_login)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'Staff Admin') AS full_name, 
    'super_admin'::public.app_role AS role, 
    true AS is_active, 
    false AS is_first_login
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
    role = 'super_admin'::public.app_role,
    is_active = true,
    is_first_login = false;

-- 2. Update automatic trigger so ANY new signup or login also gets super_admin role automatically
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, is_active, is_first_login)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1), 'Staff Admin'),
        'super_admin'::public.app_role,
        true,
        false
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        role = 'super_admin'::public.app_role,
        is_active = true;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_auth_user();

-- 3. Replace restrictive RLS policies with permissive policies for authenticated staff

-- STUDENTS
DROP POLICY IF EXISTS "Staff can view students" ON public.students;
DROP POLICY IF EXISTS "Admins and receptionists can insert students" ON public.students;
DROP POLICY IF EXISTS "Admins, receptionists and transport officers can update students" ON public.students;
DROP POLICY IF EXISTS "Only super admins can delete students" ON public.students;
DROP POLICY IF EXISTS "Authenticated staff can view students" ON public.students;
DROP POLICY IF EXISTS "Authenticated staff can insert students" ON public.students;
DROP POLICY IF EXISTS "Authenticated staff can update students" ON public.students;
DROP POLICY IF EXISTS "Authenticated staff can delete students" ON public.students;

CREATE POLICY "Authenticated staff can view students" ON public.students
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert students" ON public.students
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update students" ON public.students
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff can delete students" ON public.students
    FOR DELETE TO authenticated USING (true);

-- PROFILES
DROP POLICY IF EXISTS "Staff can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Super admins can delete profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated staff can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated staff can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated staff can update profiles" ON public.profiles;

CREATE POLICY "Authenticated staff can view profiles" ON public.profiles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert profiles" ON public.profiles
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update profiles" ON public.profiles
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- FEE PAYMENTS
DROP POLICY IF EXISTS "Admins and receptionists can view fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Admins and receptionists can insert fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Only super admins can update fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Only super admins can delete fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Authenticated staff can view fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Authenticated staff can insert fee payments" ON public.fee_payments;
DROP POLICY IF EXISTS "Authenticated staff can update fee payments" ON public.fee_payments;

CREATE POLICY "Authenticated staff can view fee payments" ON public.fee_payments
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert fee payments" ON public.fee_payments
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update fee payments" ON public.fee_payments
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- MANIFEST LOGS
DROP POLICY IF EXISTS "Staff can view manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Authorized staff can insert manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Authorized staff can update manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Only super admins can delete manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Authenticated staff can view manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Authenticated staff can insert manifest logs" ON public.manifest_logs;
DROP POLICY IF EXISTS "Authenticated staff can update manifest logs" ON public.manifest_logs;

CREATE POLICY "Authenticated staff can view manifest logs" ON public.manifest_logs
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated staff can insert manifest logs" ON public.manifest_logs
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can update manifest logs" ON public.manifest_logs
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- VEHICLES
DROP POLICY IF EXISTS "Staff can view vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Admins and transport officers can manage vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated staff can manage vehicles" ON public.vehicles;
CREATE POLICY "Authenticated staff can manage vehicles" ON public.vehicles
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- AUDIT LOGS
DROP POLICY IF EXISTS "Staff can insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Only super admins can view audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Authenticated staff can insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Authenticated staff can view audit logs" ON public.audit_logs;

CREATE POLICY "Authenticated staff can insert audit logs" ON public.audit_logs
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated staff can view audit logs" ON public.audit_logs
    FOR SELECT TO authenticated USING (true);

-- 8. Remove strict NOT NULL from phone and residence so records without phone/residence don't crash sync
ALTER TABLE public.students ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN residence DROP NOT NULL;
ALTER TABLE public.students ALTER COLUMN phone SET DEFAULT '';
ALTER TABLE public.students ALTER COLUMN residence SET DEFAULT '';
