-- ==============================================================================
-- Tech & AI Academy - Operations & Attendance Portal Database Schema
-- Compatible with Supabase (PostgreSQL 15+)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Students Table
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

-- Indexing for high-speed search and filtering
CREATE INDEX IF NOT EXISTS idx_students_branch_cohort ON public.students (branch, cohort);
CREATE INDEX IF NOT EXISTS idx_students_name ON public.students (name text_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_students_transport ON public.students (transport_mode);

-- 3. Manifest & Attendance Logs Table (Tracks daily state per student & manifest type)
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
    CONSTRAINT unique_student_date_manifest UNIQUE (student_id, date, type)
);

CREATE INDEX IF NOT EXISTS idx_manifest_lookup ON public.manifest_logs (date, type, status);
CREATE INDEX IF NOT EXISTS idx_manifest_student ON public.manifest_logs (student_id);

-- 4. Dynamic Cohorts Table
CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('bootcamp', 'regular')),
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_cohort UNIQUE (branch, name)
);

-- 5. Dynamic Tracks Table
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL CHECK (branch IN ('bootcamp', 'regular')),
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_track UNIQUE (branch, name)
);

-- 6. Trigger for Updating `updated_at` on Students
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_students_updated_at ON public.students;
CREATE TRIGGER set_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 7. Seed Default Configuration Data
INSERT INTO public.cohorts (branch, name) VALUES
    ('bootcamp', 'August Intake'),
    ('bootcamp', 'November Intake'),
    ('regular', 'January Intake'),
    ('regular', 'February Intake'),
    ('regular', 'March Intake'),
    ('regular', 'April Intake'),
    ('regular', 'May Intake'),
    ('regular', 'June Intake')
ON CONFLICT (branch, name) DO NOTHING;

INSERT INTO public.tracks (branch, name) VALUES
    ('bootcamp', 'Junior Robotics'),
    ('bootcamp', 'Advanced Robotics'),
    ('bootcamp', 'Web Development'),
    ('regular', 'Full-Stack Web Development'),
    ('regular', 'Cybersecurity & Ethical Hacking'),
    ('regular', 'Data Science & Machine Learning'),
    ('regular', 'Cloud & DevOps Engineering'),
    ('regular', 'Mobile App Development')
ON CONFLICT (branch, name) DO NOTHING;

-- 8. Row Level Security (RLS) Configuration
-- Note: In a production portal with authenticated staff, you can restrict policies using auth.uid().
-- For direct portal client operations with the Supabase Anon key:
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifest_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Allow anon public read/write access (Academy Portal)
CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete students" ON public.students FOR DELETE USING (true);

CREATE POLICY "Allow public read manifest_logs" ON public.manifest_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert manifest_logs" ON public.manifest_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update manifest_logs" ON public.manifest_logs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete manifest_logs" ON public.manifest_logs FOR DELETE USING (true);

CREATE POLICY "Allow public read cohorts" ON public.cohorts FOR SELECT USING (true);
CREATE POLICY "Allow public insert cohorts" ON public.cohorts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Allow public insert tracks" ON public.tracks FOR INSERT WITH CHECK (true);

-- 9. Enable Realtime Replication
ALTER PUBLICATION supabase_realtime ADD TABLE public.students;
ALTER PUBLICATION supabase_realtime ADD TABLE public.manifest_logs;
