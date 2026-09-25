ALTER TABLE public.site_projects
  ADD COLUMN image_captions text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN video_captions text[] NOT NULL DEFAULT '{}'::text[];