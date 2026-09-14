import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { AutoVideo } from "@/components/AutoVideo";
import {
  DEFAULT_PROJECTS,
  loadContent,
  saveContent,
  type Project,
  type SiteContent,
} from "@/lib/portfolio-data";

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

function emptyProject(): Project {
  return {
    id: `p-${Date.now()}`,
    title: "",
    tag: "",
    meta: "",
    description: "",
    status: "En cours",
    photoCount: 0,
    images: [],
    videos: [],
  };
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState(false);
  const passRef = useRef<HTMLInputElement>(null);

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
    setContent(loadContent());
    setReady(true);
  }, []);

  const update = (next: SiteContent) => {
    setContent(next);
    saveContent(next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
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

  if (!content) return null;

  const setProject = (index: number, patch: Partial<Project>) => {
    const projects = content.projects.map((p, i) => (i === index ? { ...p, ...patch } : p));
    update({ ...content, projects });
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

        {/* Vidéo de présentation */}
        <section className="mt-12 border border-line bg-panel p-6">
          <h2 className="text-2xl uppercase" style={{ fontWeight: 700 }}>
            Vidéo de présentation
          </h2>
          <p className="mt-1 text-sm text-faint">
            Collez le lien d'un fichier vidéo (.mp4, .webm). Elle démarre automatiquement sur le
            site.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={content.presentationVideo ?? ""}
              onChange={(e) =>
                setContent({ ...content, presentationVideo: e.target.value || null })
              }
              placeholder="https://…/presentation.mp4"
              className={input}
            />
            <button
              type="button"
              className={btn}
              onClick={() => update({ ...content, presentationVideo: content.presentationVideo })}
            >
              Enregistrer
            </button>
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
            <div className="flex gap-3">
              <button
                type="button"
                className={btn}
                onClick={() => update({ ...content, projects: [emptyProject(), ...content.projects] })}
              >
                + Nouveau projet
              </button>
              <button
                type="button"
                className={btnGhost}
                onClick={() =>
                  update({ projects: DEFAULT_PROJECTS, presentationVideo: content.presentationVideo })
                }
              >
                Réinitialiser
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {content.projects.map((p, i) => (
              <div key={p.id} className="border border-line bg-panel p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="section-label">Titre</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.title}
                      onChange={(e) => setProject(i, { title: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="section-label">Tag</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.tag}
                      onChange={(e) => setProject(i, { tag: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="section-label">Meta</span>
                    <input
                      className={`${input} mt-1`}
                      value={p.meta}
                      onChange={(e) => setProject(i, { meta: e.target.value })}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="section-label">Statut</span>
                      <input
                        className={`${input} mt-1`}
                        value={p.status}
                        onChange={(e) => setProject(i, { status: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="section-label">Photos</span>
                      <input
                        type="number"
                        className={`${input} mt-1`}
                        value={p.photoCount}
                        onChange={(e) => setProject(i, { photoCount: Number(e.target.value) })}
                      />
                    </label>
                  </div>
                </div>

                <label className="mt-4 block">
                  <span className="section-label">Description</span>
                  <textarea
                    rows={3}
                    className={`${input} mt-1`}
                    value={p.description}
                    onChange={(e) => setProject(i, { description: e.target.value })}
                  />
                </label>

                <label className="mt-4 block">
                  <span className="section-label">Images (une URL par ligne)</span>
                  <textarea
                    rows={3}
                    className={`${input} mt-1`}
                    value={p.images.join("\n")}
                    onChange={(e) =>
                      setProject(i, {
                        images: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                  />
                </label>

                <label className="mt-4 block">
                  <span className="section-label">Vidéos (une URL par ligne — autoplay)</span>
                  <textarea
                    rows={2}
                    className={`${input} mt-1`}
                    value={p.videos.join("\n")}
                    onChange={(e) =>
                      setProject(i, {
                        videos: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                  />
                </label>

                {p.videos.length > 0 && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {p.videos.map((v, vi) => (
                      <AutoVideo key={vi} src={v} className="gold-frame aspect-video w-full" />
                    ))}
                  </div>
                )}

                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    className={btnGhost}
                    onClick={() =>
                      update({
                        ...content,
                        projects: content.projects.filter((_, idx) => idx !== i),
                      })
                    }
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
