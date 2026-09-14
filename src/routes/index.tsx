import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import heroPortrait from "@/assets/hero-portrait.jpg";
import profilePortrait from "@/assets/profile-portrait.jpg";
import { AutoVideo } from "@/components/AutoVideo";
import { MediaImage } from "@/components/MediaImage";
import { useSiteContent } from "@/hooks/useSiteContent";
import { CONTACT, EXPERIENCES, FORMATION, METHODE } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tohoury Dadi Elie — Conducteur de Travaux & Dessinateur Bâtiment" },
      {
        name: "description",
        content:
          "Conducteur de travaux et dessinateur bâtiment à Abidjan : conception 2D/3D, métré, devis et suivi de chantier.",
      },
      {
        property: "og:title",
        content: "Tohoury Dadi Elie — Conducteur de Travaux & Dessinateur Bâtiment",
      },
      {
        property: "og:description",
        content:
          "Conception 2D/3D, plans techniques, métré, devis et suivi de chantier à Abidjan, Côte d'Ivoire.",
      },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { href: "#profil", label: "Profil" },
  { href: "#experience", label: "Expérience" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-100"
      style={{
        height: 68,
        background: scrolled ? "rgba(12,12,13,0.92)" : "rgba(12,12,13,0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "background 240ms ease, border-color 240ms ease",
      }}
    >
      <div className="wrap flex h-[68px] items-center justify-between">
        <a
          href="#top"
          className="display text-[1.35rem] tracking-[0.04em] uppercase"
          style={{ fontWeight: 800 }}
        >
          TOHOURY <span className="text-gold">DADI ELIE</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-dim transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border border-line md:hidden"
        >
          <span className="block h-[1px] w-4 bg-gold" />
          <span className="block h-[1px] w-4 bg-gold" />
          <span className="block h-[1px] w-4 bg-gold" />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-panel md:hidden">
          <div className="wrap flex flex-col py-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-3 text-sm text-dim last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3">
      <span className="eyebrow-line" />
      <span className="section-label">{children}</span>
    </p>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="hero-grid-bg relative flex min-h-screen items-center pt-[68px]"
    >
      <div className="wrap grid w-full items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="fade-up" style={{ animationDelay: "60ms" }}>
            <SectionLabel>Portfolio</SectionLabel>
          </div>
          <h1
            className="fade-up mt-6 uppercase"
            style={{
              animationDelay: "160ms",
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 8vw, 6.2rem)",
            }}
          >
            Tohoury
            <br />
            Dadi Elie
          </h1>
          <p
            className="fade-up mt-5 text-lg text-gold"
            style={{ animationDelay: "260ms" }}
          >
            Conducteur de Travaux &amp; Dessinateur Bâtiment
          </p>
          <p
            className="fade-up mt-5 max-w-xl text-dim"
            style={{ animationDelay: "340ms" }}
          >
            Du terrain au plan, du plan à la livraison : conception 2D/3D, plans techniques,
            métré, devis et suivi de chantier menés avec rigueur.
          </p>
          <p
            className="fade-up mt-8 text-sm text-faint"
            style={{ animationDelay: "420ms" }}
          >
            Abidjan · DKM Construction · ArchiCAD · AutoCAD · Revit · Twinmotion
          </p>
        </div>

        <div
          className="gold-frame fade-up mx-auto w-full max-w-sm"
          style={{ animationDelay: "500ms" }}
        >
          <img
            src={heroPortrait}
            alt="Tohoury Dadi Elie sur un chantier à Abidjan"
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
            style={{ filter: "grayscale(35%)" }}
          />
        </div>
      </div>

      <div className="absolute bottom-6 left-0 w-full">
        <div className="wrap flex items-center gap-3">
          <span className="section-label">Défiler</span>
          <span className="h-[2px] w-16 bg-gold" />
        </div>
      </div>
    </section>
  );
}

function Profil({ presentationVideo }: { presentationVideo: string | null }) {
  return (
    <section id="profil" className="border-t border-line py-24">
      <div className="wrap">
        <SectionLabel>Profil</SectionLabel>
        <div className="mt-10 grid gap-12 lg:grid-cols-[260px_1fr]">
          <div className="gold-frame h-fit">
            <img
              src={profilePortrait}
              alt="Portrait de Tohoury Dadi Elie"
              loading="lazy"
              width={912}
              height={1104}
              className="aspect-[4/5] w-full object-cover"
              style={{ filter: "grayscale(15%)" }}
            />
          </div>

          <div>
            <h2 className="text-4xl uppercase" style={{ fontWeight: 700 }}>
              Méthode de travail
            </h2>
            <ol className="mt-8 space-y-6">
              {METHODE.map((step, i) => (
                <li key={i} className="flex gap-5 border-b border-line-soft pb-6 last:border-0">
                  <span
                    className="display text-2xl text-gold"
                    style={{ fontWeight: 700 }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-dim">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="section-label">Téléphone</p>
                <a href={`tel:${CONTACT.phoneHref}`} className="mt-1 block hover:text-gold">
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <p className="section-label">Email</p>
                <a href={`mailto:${CONTACT.email}`} className="mt-1 block break-all hover:text-gold">
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="section-label">Localisation</p>
                <p className="mt-1">{CONTACT.location}</p>
              </div>
              <div>
                <p className="section-label">Langues</p>
                <p className="mt-1">{CONTACT.langues}</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="section-label">Vidéo de présentation</p>
              {presentationVideo ? (
                <AutoVideo
                  src={presentationVideo}
                  className="gold-frame mt-4 aspect-video w-full"
                />
              ) : (
                <div className="gold-frame mt-4 flex aspect-video w-full items-center justify-center bg-panel-2">
                  <p className="px-6 text-center text-sm text-faint">
                    Aucune vidéo de présentation pour le moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="border-t border-line bg-panel py-24">
      <div className="wrap">
        <SectionLabel>Expérience</SectionLabel>
        <h2 className="mt-6 text-4xl uppercase" style={{ fontWeight: 700 }}>
          Parcours professionnel
        </h2>

        <div className="mt-12 border-l border-line pl-7">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company} className="relative mb-14 last:mb-0">
              <span
                className="absolute top-2 block rounded-full bg-gold"
                style={{ left: -33, width: 9, height: 9 }}
                aria-hidden="true"
              />
              <p className="section-label">{exp.period}</p>
              <h3 className="mt-2 text-2xl uppercase" style={{ fontWeight: 700 }}>
                {exp.company}
              </h3>
              <p className="mt-1 text-gold">{exp.role}</p>
              <ul className="mt-4 space-y-2">
                {exp.tasks.map((t) => (
                  <li key={t} className="flex gap-3 text-dim">
                    <span className="mt-[10px] block h-[1px] w-3 shrink-0 bg-gold" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <h3 className="text-3xl uppercase" style={{ fontWeight: 700 }}>
            Formation académique
          </h3>
          <div className="mt-8 space-y-5">
            {FORMATION.map((f) => (
              <div
                key={f.label}
                className="grid gap-2 border-b border-line-soft pb-5 last:border-0 sm:grid-cols-[140px_1fr]"
              >
                <p className="text-gold">{f.year}</p>
                <p className="text-dim">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface LightboxState {
  images: string[];
  index: number;
}

function Projets({ onOpen }: { onOpen: (state: LightboxState) => void }) {
  const { projects } = useSiteContent();

  return (
    <section id="projets" className="border-t border-line py-24">
      <div className="wrap">
        <SectionLabel>Projets</SectionLabel>
        <h2 className="mt-6 text-4xl uppercase" style={{ fontWeight: 700 }}>
          Réalisations
        </h2>

        <div className="mt-12">
          {projects.map((p) => (
            <article key={p.id} className="border-t border-line py-12 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-2xl uppercase" style={{ fontWeight: 700 }}>
                  {p.title}
                </h3>
                <span className="border border-gold px-3 py-1 text-xs tracking-[0.06em] text-gold uppercase">
                  {p.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-faint">
                {p.meta} · {p.status} · {p.photoCount} photos
              </p>
              <p className="mt-4 max-w-3xl text-dim">{p.description}</p>

              {p.images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {p.images.map((img, i) => (
                    <button
                      key={`${p.id}-${i}`}
                      type="button"
                      onClick={() => onOpen({ images: p.images, index: i })}
                      className="group aspect-[4/3] overflow-hidden border border-line"
                    >
                      <MediaImage
                        src={img}
                        alt={`${p.title} — visuel ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                        style={{ filter: "grayscale(10%)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = "grayscale(0%)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = "grayscale(10%)";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {p.videos.length > 0 && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {p.videos.map((v, i) => (
                    <AutoVideo
                      key={`${p.id}-v-${i}`}
                      src={v}
                      className="gold-frame aspect-video w-full"
                    />
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  state,
  onClose,
  onChange,
}: {
  state: LightboxState;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const { images, index } = state;

  const next = useCallback(() => onChange((index + 1) % images.length), [index, images, onChange]);
  const prev = useCallback(
    () => onChange((index - 1 + images.length) % images.length),
    [index, images, onChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onClose]);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-6"
      style={{ background: "rgba(6,6,7,0.94)" }}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-5 right-5 flex h-11 w-11 items-center justify-center border border-line text-dim hover:border-gold hover:text-gold"
      >
        ✕
      </button>
      <button
        type="button"
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-4 flex h-11 w-11 items-center justify-center border border-line text-dim hover:border-gold hover:text-gold"
      >
        ‹
      </button>
      <MediaImage
        src={images[index]}
        alt={`Visuel ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain"
      />
      <button
        type="button"
        onClick={next}
        aria-label="Suivant"
        className="absolute right-4 flex h-11 w-11 items-center justify-center border border-line text-dim hover:border-gold hover:text-gold"
      >
        ›
      </button>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-panel py-24">
      <div className="wrap">
        <SectionLabel>Contact</SectionLabel>
        <h2
          className="mt-6 max-w-2xl uppercase"
          style={{ fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
        >
          Un projet à faire avancer ? Discutons-en.
        </h2>
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:gap-14">
          <a
            href={`tel:${CONTACT.phoneHref}`}
            className="border-b border-line pb-2 text-lg hover:border-gold hover:text-gold"
          >
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="border-b border-line pb-2 text-lg hover:border-gold hover:text-gold"
          >
            {CONTACT.email}
          </a>
        </div>
        <p className="mt-8 text-sm text-faint">{CONTACT.location}</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-3 text-sm text-faint">
        <p>
          © 2025 Tohoury{" "}
          <Link
            to="/admin"
            aria-label="Espace"
            className="text-faint no-underline hover:text-faint"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            DADI
          </Link>{" "}
          Elie
        </p>
        <p>Abidjan, Côte d'Ivoire</p>
      </div>
    </footer>
  );
}

function Portfolio() {
  const { presentationVideo } = useSiteContent();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Profil presentationVideo={presentationVideo} />
        <Experience />
        <Projets onOpen={setLightbox} />
        <Contact />
      </main>
      <Footer />
      {lightbox && (
        <Lightbox
          state={lightbox}
          onClose={() => setLightbox(null)}
          onChange={(index) => setLightbox({ ...lightbox, index })}
        />
      )}
    </div>
  );
}
