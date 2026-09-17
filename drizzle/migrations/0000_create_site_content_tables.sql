CREATE TABLE public.site_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  tag text NOT NULL DEFAULT '',
  meta text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'En cours',
  images text[] NOT NULL DEFAULT '{}',
  videos text[] NOT NULL DEFAULT '{}',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.site_settings (
  id boolean PRIMARY KEY DEFAULT true,
  presentation_video text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_single_row CHECK (id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_projects TO authenticated;
GRANT ALL ON public.site_projects TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are public" ON public.site_projects FOR SELECT USING (true);
CREATE POLICY "Projects can be inserted" ON public.site_projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Projects can be updated" ON public.site_projects FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Projects can be deleted" ON public.site_projects FOR DELETE USING (true);

CREATE POLICY "Settings are public" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Settings can be inserted" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Settings can be updated" ON public.site_settings FOR UPDATE USING (true) WITH CHECK (true);

INSERT INTO public.site_settings (id, presentation_video) VALUES (true, NULL);