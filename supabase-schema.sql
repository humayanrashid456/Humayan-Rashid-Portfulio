-- ============================================================
-- Supabase Schema for Humayan Rashid Portfolio CMS
-- Run this SQL in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. CMS Data table (single-row store for the entire CMS state)
CREATE TABLE IF NOT EXISTS public.cms_data (
  id INTEGER PRIMARY KEY DEFAULT 1,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- 2. Study Abroad Leads table
CREATE TABLE IF NOT EXISTS public.study_abroad_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country TEXT NOT NULL,
  intake TEXT NOT NULL,
  education TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Row Level Security
ALTER TABLE public.cms_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_abroad_leads ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for public access (no auth required)
CREATE POLICY "Allow public read cms_data"
  ON public.cms_data FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert cms_data"
  ON public.cms_data FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update cms_data"
  ON public.cms_data FOR UPDATE
  USING (true);

CREATE POLICY "Allow public insert leads"
  ON public.study_abroad_leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read leads"
  ON public.study_abroad_leads FOR SELECT
  USING (true);

-- 5. Seed default CMS data (optional - will be auto-created on first save)
-- INSERT INTO public.cms_data (id, data)
-- VALUES (1, '{}'::JSONB)
-- ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Storage Buckets (create via Dashboard or using Supabase CLI)
-- ============================================================
-- Bucket name: cms-images
-- Public bucket: YES
--
-- After creating the bucket, run these Storage RLS policies:
--
-- CREATE POLICY "Allow public read images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'cms-images');
--
-- CREATE POLICY "Allow public upload images"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'cms-images');
--
-- CREATE POLICY "Allow public update images"
--   ON storage.objects FOR UPDATE
--   USING (bucket_id = 'cms-images');
--
-- ============================================================
