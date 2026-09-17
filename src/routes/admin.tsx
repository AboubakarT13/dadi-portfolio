import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { AutoVideo } from "@/components/AutoVideo";
import { MediaDrop } from "@/components/MediaDrop";
import { MediaImage } from "@/components/MediaImage";
import type { Project, SiteContent } from "@/lib/portfolio-data";
import {
  createProject,
  fetchSiteContent,
  removeProject,
  savePresentationVideo,
  updateProject,
} from "@/lib/site-db";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Espace administrateur — Tohoury Dadi Elie" },
      { name: "description", content: "Espace privé de gestion du portfolio." },
      { property: "og:title", content: "Espace administrateur" },
      { property: "og:description", content: "Espace privé de gestion du portfolio." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const PASSWORD = "DADI2025";
const SESSION_KEY = "tde-admin-session";

const input =
  "w-full border border-line bg-panel-2 px-3 py-2 text-sm text-text outline-none focus:border-gold";
const btn =
  "border border-gold px-4 py-2 text-sm tracking-[0.06em] text-gold uppercase transition-colors hover:bg-gold hover:text-[#0c0c0d]";
const btnGhost =
  "border border-line px-3 py-1.5 text-xs tracking-[0.06em] text-dim uppercase hover:border-gold hover:text-gold";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [dbError, setDbError] = useState("");
  const passRef = useRef<HTMLInputElement>(null);

  const flash = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  const reload = useCallback(async () => {
    try {
      const next = await fetchSiteContent();
      setContent(next);
      setVideoUrl(next.presentationVideo ?? "");
      setDbError("");
    } catch {
      setDbError("Impossible de charger les données en ligne.");
    }
  }, []);

  useEffect(() => {
    try {
      if (
        window.sessionStorage.getItem(SESSION_KEY) === "ok" ||
        window.localStorage.getItem(SESSION_KEY) === "ok"
      ) {
        setAuthed(true);
      }
    } catch {
      /* stockage indisponible */
    }
    void reload().finally(() => setReady(true));
  }, [reload]);

  const run = async (action: () => Promise<void>) => {
    try {
      await action();
      await reload();
      flash();
    } catch {
      setDbError("L'enregistrement en ligne a échoué. Réessayez.");
    }
  };

  const tryLogin = () => {
    const value = (passRef.current?.value ?? pass).trim();
    if (value.toUpperCase() === PASSWORD) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "ok");
        window.localStorage.setItem(SESSION_KEY, "ok");
      } catch {
        /* stockage indisponible */
      }
      setAuthed(true);
      setError("");
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tryLogin();
          }}
          className="gold-frame w-full max-w-sm bg-panel p-8"
        >
          <p className="section-label">Accès restreint</p>
          <h1 className="mt-3 text-3xl uppercase" style={{ fontWeight: 700 }}>
            Espace administrateur
          </h1>
          <input
            ref={passRef}
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Mot de passe"
            className={`${input} mt-6`}
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-gold">{error}</p>}
          <button
            type="submit"
            className={`${btn} mt-5 w-full`}
            onClick={(e) => {
              e.preventDefault();
              tryLogin();
            }}
          >
            Entrer
          </button>
          <Link to="/" className="mt-4 block text-center text-xs text-faint hover:text-gold">
            Retour au site
          </Link>
        </form>
      </div>
    );
  }

  if (!ready) return null;
  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-faint">
        {dbError || "Chargement…"}
      </div>
    );
  }

  const setProject = (p: Project, patch: Partial<Project>) => {
    setContent({
      ...content,
      projects: content.projects.map((x) => (x.id === p.id ? { ...x, ...patch } : x)),
    });
  };

  const commit = (p: Project, patch: Partial<Project>) => {
    setProject(p, patch);
    void run(() => updateProject(p.id, patch));
  };

  return (
    <div className="min-h-screen py-14">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-label">Espace administrateur</p>
            <h1 className="mt-2 text-4xl uppercase" style={{ fontWeight: 700 }}>
              Gestion du portfolio
            </h1>
            <p className="mt-2 text-xs text-faint">
              Tout ce que vous ajoutez ici est enregistré en ligne et visible par tous les
              visiteurs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs text-gold">Enregistré</span>}
            <Link to="/" className={btnGhost}>
              Voir le site
            </Link>
            <button
              type="button"
              className={btnGhost}
              onClick={() => {
                window.sessionStorage.removeItem(SESSION_KEY);
                window.localStorage.removeItem(SESSION_KEY);
                setAuthed(false);
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>

        {dbError && <p className="mt-4 text-sm text-gold">{dbError}</p>}

        {/* Vidéo de présentation */}
        <section className="mt-12 border border-line bg-panel p-6">
          <h2 className="text-2xl uppercase" style={{ fontWeight: 700 }}>
            Vidéo de présentation
          </h2>
          <p className="mt-1 text-sm text-faint">
            Glissez un fichier vidéo, ou collez le lien d'une vidéo (.mp4, .webm).
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://…/presentation.mp4"
              className={input}
            />
            <button
              type="button"
              className={btn}
              onClick={() => void run(() => savePresentationVideo(videoUrl || null))}
            >
              Enregistrer
            </button>
          </div>
          <div className="mt-4">
            <MediaDrop
              accept="video/*"
              multiple={false}
              label="Glissez une vidéo ici ou cliquez pour choisir un fichier de l'appareil"
              onFiles={(refs) => void run(() => savePresentationVideo(refs[0] ?? null))}
            />
          </div>
          {content.presentationVideo && (
            <AutoVideo
              src={content.presentationVideo}
              className="gold-frame mt-5 aspect-video w-full max-w-xl"
            />
          )}
        </section>

        {/* Projets */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl uppercase" style={{ fontWeight: 700 }}>
              Projets ({content.projects.length})
            </h2>
            <button type="button" className={btn} onClick={() => void run(createProject)}>
              + Nouveau projet
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {content.projects.map((p) => (
              <div key={p.id} className="border border-line bg-panel p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="section-label">Titre</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.title}
                      onChange={(e) => setProject(p, { title: e.target.value })}
                      onBlur={(e) => commit(p, { title: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="section-label">Tag</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.tag}
                      onChange={(e) => setProject(p, { tag: e.target.value })}
                      onBlur={(e) => commit(p, { tag: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="section-label">Meta</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.meta}
                      onChange={(e) => setProject(p, { meta: e.target.value })}
                      onBlur={(e) => commit(p, { meta: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="section-label">Statut</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.status}
                      onChange={(e) => setProject(p, { status: e.target.value })}
                      onBlur={(e) => commit(p, { status: e.target.value })}
                    />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="section-label">Description</span>
                  <textarea
                    rows={3}
                    className={`${input} mt-1`}
                    value={p.description}
                    onChange={(e) => setProject(p, { description: e.target.value })}
                    onBlur={(e) => commit(p, { description: e.target.value })}
                  />
                </label>

                <div className="mt-5">
                  <span className="section-label">Photos du projet ({p.images.length})</span>
                  <div className="mt-2">
                    <MediaDrop
                      accept="image/*"
                      label="Glissez vos photos ici ou cliquez pour les choisir sur l'appareil"
                      onFiles={(refs) => commit(p, { images: [...p.images, ...refs] })}
                    />
                  </div>
                  {p.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {p.images.map((img, ii) => (
                        <div key={`${p.id}-img-${ii}`} className="relative aspect-[4/3] border border-line">
                          <MediaImage src={img} alt="" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            aria-label="Retirer la photo"
                            onClick={() =>
                              commit(p, { images: p.images.filter((_, x) => x !== ii) })
                            }
                            className="absolute right-1 top-1 h-6 w-6 text-xs text-gold"
                            style={{ background: "rgba(0,0,0,0.6)" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <span className="section-label">Vidéos du projet (autoplay)</span>
                  <div className="mt-2">
                    <MediaDrop
                      accept="video/*"
                      label="Glissez vos vidéos ici ou cliquez pour les choisir sur l'appareil"
                      onFiles={(refs) => commit(p, { videos: [...p.videos, ...refs] })}
                    />
                  </div>
                  {p.videos.length > 0 && (
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {p.videos.map((v, vi) => (
                        <div key={`${p.id}-v-${vi}`} className="relative">
                          <AutoVideo src={v} className="gold-frame aspect-video w-full" />
                          <button
                            type="button"
                            aria-label="Retirer la vidéo"
                            onClick={() =>
                              commit(p, { videos: p.videos.filter((_, x) => x !== vi) })
                            }
                            className="absolute right-2 top-2 h-7 w-7 text-sm text-gold"
                            style={{ background: "rgba(0,0,0,0.6)" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() => void run(() => removeProject(p.id))}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
