import { supabase } from "@/integrations/supabase/client";
import type { Project, SiteContent } from "@/lib/portfolio-data";

export const CONTENT_EVENT = "tde-content-updated";

function notify() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(CONTENT_EVENT));
}

type Row = {
  id: string;
  title: string;
  tag: string;
  meta: string;
  description: string;
  status: string;
  images: string[];
  image_captions: string[];
  videos: string[];
  video_captions: string[];
  position: number;
};

function toProject(row: Row): Project {
  const images = row.images ?? [];
  const videos = row.videos ?? [];
  return {
    id: row.id,
    title: row.title,
    tag: row.tag,
    meta: row.meta,
    description: row.description,
    status: row.status,
    photoCount: images.length,
    images,
    imageCaptions: images.map((_, index) => row.image_captions?.[index] ?? ""),
    videos,
    videoCaptions: videos.map((_, index) => row.video_captions?.[index] ?? ""),
  };
}

/** Charge tout le contenu du site depuis la base de données. */
export async function fetchSiteContent(): Promise<SiteContent> {
  const [projectsRes, settingsRes] = await Promise.all([
    supabase.from("site_projects").select("*").order("position", { ascending: true }),
    supabase.from("site_settings").select("presentation_video").eq("id", true).maybeSingle(),
  ]);

  if (projectsRes.error) throw projectsRes.error;

  return {
    projects: (projectsRes.data as Row[]).map(toProject),
    presentationVideo: settingsRes.data?.presentation_video ?? null,
  };
}

export async function createProject(): Promise<void> {
  const { data: last } = await supabase
    .from("site_projects")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("site_projects").insert({
    title: "Nouveau projet",
    tag: "",
    meta: "",
    description: "",
    status: "En cours",
    images: [],
    image_captions: [],
    videos: [],
    video_captions: [],
    position: (last?.position ?? -1) + 1,
  });
  if (error) throw error;
  notify();
}

export async function updateProject(id: string, patch: Partial<Project>): Promise<void> {
  const payload = {
    updated_at: new Date().toISOString(),
    ...(patch.title !== undefined ? { title: patch.title } : {}),
    ...(patch.tag !== undefined ? { tag: patch.tag } : {}),
    ...(patch.meta !== undefined ? { meta: patch.meta } : {}),
    ...(patch.description !== undefined ? { description: patch.description } : {}),
    ...(patch.status !== undefined ? { status: patch.status } : {}),
    ...(patch.images !== undefined ? { images: patch.images } : {}),
    ...(patch.imageCaptions !== undefined ? { image_captions: patch.imageCaptions } : {}),
    ...(patch.videos !== undefined ? { videos: patch.videos } : {}),
    ...(patch.videoCaptions !== undefined ? { video_captions: patch.videoCaptions } : {}),
  };

  const { error } = await supabase.from("site_projects").update(payload).eq("id", id);
  if (error) throw error;
  notify();
}

export async function removeProject(id: string): Promise<void> {
  const { error } = await supabase.from("site_projects").delete().eq("id", id);
  if (error) throw error;
  notify();
}

export async function savePresentationVideo(src: string | null): Promise<void> {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ id: true, presentation_video: src, updated_at: new Date().toISOString() });
  if (error) throw error;
  notify();
}
