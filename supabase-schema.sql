-- ==============================================================================
-- Tech & AI Academy - Operations, Bootcamps & Fees Database Schema
-- 100% Unified Bootcamp System & Fees Management
-- Compatible with Supabase (PostgreSQL 15+)
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Students Table (Bootcamps & Fee Tracking)
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

-- Migration for existing students tables: add fee columns & adjust branch
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
    -- Drop old check constraint on branch if present
    ALTER TABLE public.students ALTER COLUMN branch SET DEFAULT 'bootcamp';
END $$;

-- Indexing for high-speed search and filtering
CREATE INDEX IF NOT EXISTS idx_students_cohort ON public.students (cohort);
CREATE INDEX IF NOT EXISTS idx_students_track ON public.students (track);
CREATE INDEX IF NOT EXISTS idx_students_payment_status ON public.students (payment_status);
CREATE INDEX IF NOT EXISTS idx_students_name ON public.students (name text_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_students_transport ON public.students (transport_mode);

-- 3. Fee Payments Transaction Log Table
CREATE TABLE IF NOT EXISTS public.fee_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50) DEFAULT 'M-Pesa',
    reference_code VARCHAR(100) NOT NULL,
    notes TEXT DEFAULT '',
    recorded_by UUID,
    recorded_by_name VARCHAR(255) DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_fee_payments_student ON public.fee_payments (student_id);
CREATE INDEX IF NOT EXISTS idx_fee_payments_date ON public.fee_payments (payment_date DESC);
CREATE INDEX IF NOT EXISTS idx_fee_payments_ref ON public.fee_payments (reference_code);

-- 4. Manifest & Attendance Logs Table
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
    recorded_by UUID,
    recorded_by_name VARCHAR(255) DEFAULT '',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_student_date_manifest UNIQUE (student_id, date, type)
);

CREATE INDEX IF NOT EXISTS idx_manifest_lookup ON public.manifest_logs (date, type, status);
CREATE INDEX IF NOT EXISTS idx_manifest_student ON public.manifest_logs (student_id);

-- 5. Dynamic Bootcamp Cohorts Table
CREATE TABLE IF NOT EXISTS public.cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL DEFAULT 'bootcamp',
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_cohort UNIQUE (branch, name)
);

-- 6. Dynamic Bootcamp Tracks Table
CREATE TABLE IF NOT EXISTS public.tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch VARCHAR(50) NOT NULL DEFAULT 'bootcamp',
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_branch_track UNIQUE (branch, name)
);

-- 7. Dynamic Fleet & Vehicles Table
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL DEFAULT 'bus',
    plate_number VARCHAR(50) DEFAULT '',
    capacity INT DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Trigger for Updating `updated_at` on Students
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

-- 9. Automatic Student Fee Sync Trigger on Payment Insertion
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

-- 10. Seed Default Bootcamp Data
INSERT INTO public.cohorts (branch, name) VALUES
    ('bootcamp', 'August Bootcamp'),
    ('bootcamp', 'November Bootcamp'),
    ('bootcamp', 'Holiday AI Bootcamp'),
    ('bootcamp', 'Easter Robotics Bootcamp')
ON CONFLICT (branch, name) DO NOTHING;

INSERT INTO public.tracks (branch, name) VALUES
    ('bootcamp', 'Junior Robotics'),
    ('bootcamp', 'Advanced Robotics'),
    ('bootcamp', 'Web Development'),
    ('bootcamp', 'AI & Coding'),
    ('bootcamp', 'Data Science & AI')
ON CONFLICT (branch, name) DO NOTHING;

-- 11. Row Level Security (RLS) Configuration
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manifest_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Allow public read/write access (Academy Portal)
CREATE POLICY "Allow public read students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public insert students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update students" ON public.students FOR UPDATE USING (true);
CREATE POLICY "Allow public delete students" ON public.students FOR DELETE USING (true);

CREATE POLICY "Allow public read fee_payments" ON public.fee_payments FOR SELECT USING (true);
CREATE POLICY "Allow public insert fee_payments" ON public.fee_payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update fee_payments" ON public.fee_payments FOR UPDATE USING (true);
CREATE POLICY "Allow public delete fee_payments" ON public.fee_payments FOR DELETE USING (true);

CREATE POLICY "Allow public read manifest_logs" ON public.manifest_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert manifest_logs" ON public.manifest_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update manifest_logs" ON public.manifest_logs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete manifest_logs" ON public.manifest_logs FOR DELETE USING (true);

CREATE POLICY "Allow public read cohorts" ON public.cohorts FOR SELECT USING (true);
CREATE POLICY "Allow public insert cohorts" ON public.cohorts FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read tracks" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "Allow public insert tracks" ON public.tracks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read vehicles" ON public.vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public insert vehicles" ON public.vehicles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update vehicles" ON public.vehicles FOR UPDATE USING (true);
CREATE POLICY "Allow public delete vehicles" ON public.vehicles FOR DELETE USING (true);
