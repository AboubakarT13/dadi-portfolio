import villaBasse from "@/assets/proj-villa-basse.jpg";
import duplex from "@/assets/proj-duplex.jpg";
import immeuble from "@/assets/proj-immeuble.jpg";
import temple from "@/assets/proj-temple.jpg";

export interface Project {
  id: string;
  title: string;
  tag: string;
  meta: string;
  description: string;
  status: string;
  photoCount: number;
  images: string[];
  videos: string[];
}

export interface SiteContent {
  projects: Project[];
  presentationVideo: string | null;
}

export const CONTACT = {
  phone: "+225 07 99 44 54 90",
  phoneHref: "+2250799445490",
  email: "elietohoury@gmail.com",
  location: "Abidjan, Cocody Riviera Palmeraie",
  langues: "Français courant · Anglais académique",
};

export const METHODE = [
  "Visite systématique du terrain avant toute conception : accès, orientation, contraintes réelles.",
  "Analyse de l'extrait de plan / titre foncier et des voies d'accès.",
  "Conception 2D/3D adaptée au terrain, puis plans techniques (structure, coffrage, électricité/assainissement).",
  "Réalisation du métré et du devis quantitatif/estimatif.",
  "Implantation, suivi de chantier et contrôle de conformité jusqu'à la livraison.",
];

export const EXPERIENCES = [
  {
    period: "Oct 2025 — Aujourd'hui",
    company: "DKM Construction",
    role: "Conducteur de Travaux / Dessinateur",
    tasks: [
      "Conduite et suivi de travaux, gros œuvre et second œuvre.",
      "Suivi des travaux d'une villa duplex à usage d'habitation, Paris Village (Abobo).",
      "Suivi des travaux d'un bâtiment R+3.",
      "Second œuvre : pose de carreaux granit, conception et réalisation de cuisines équipées, finitions.",
      "Réalisation de métrés et devis quantitatifs/estimatifs.",
      "Conception architecturale et dessin technique (plans 2D/3D, plans de coffrage).",
    ],
  },
  {
    period: "Juil 2024 — Août 2025",
    company: "Green Field (Soubré)",
    role: "Assistant Conducteur de Travaux",
    tasks: [
      "Préparation des documents de conception (plans 2D/3D, spécifications techniques).",
      "Visites de chantier, contrôle de la progression des travaux.",
      "Suivi et contrôle du terrassement de 4 bassins.",
      "Suivi des travaux d'un bâtiment R+3.",
      "Gestion et approvisionnement des matériaux.",
    ],
  },
  {
    period: "Mai 2023 — Juin 2024",
    company: "Moayer Bat-CI (Cocody)",
    role: "Stagiaire métreur et dessinateur TCE",
    tasks: [
      "Conception architecturale 2D/3D et plans de coffrage.",
      "Devis estimatifs et quantitatifs, montage de dossiers d'appel d'offre.",
      "Suivi et contrôle des travaux et des matériaux.",
    ],
  },
  {
    period: "Oct 2022 — Mars 2023",
    company: "Mairie d'Attécoubé",
    role: "Assistant conducteur de travaux stagiaire",
    tasks: [
      "Suivi et contrôle des travaux de rénovation de la mairie.",
      "Implantation d'un bâtiment pour un particulier.",
    ],
  },
];

export const FORMATION = [
  {
    year: "2025",
    label: "Organisation, Gestion de projet et Planification — CCM BTP (en cours)",
  },
  { year: "Juin 2024", label: "Attestation en sécurité sur les chantiers de construction" },
  { year: "Fév. 2023", label: "Certificat professionnel en CAO/DAO" },
  { year: "2021-2022", label: "BTS Génie Civil option Bâtiment — IFSM Abidjan" },
  { year: "2019-2020", label: "Baccalauréat Série D — Groupe scolaire Madoue Touré" },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: "villa-basse-3p",
    title: "Villa basse 3 pièces",
    tag: "Conception & suivi",
    meta: "Abidjan · Habitation · 2024",
    description:
      "Conception architecturale 2D/3D d'une villa basse 3 pièces, plans techniques et suivi d'exécution jusqu'aux finitions.",
    status: "Livré",
    photoCount: 12,
    images: [villaBasse],
    videos: [],
  },
  {
    id: "villa-duplex-anoh",
    title: "Villa Duplex Mr. Anoh",
    tag: "Dessin technique",
    meta: "Abidjan · Habitation · 2024",
    description:
      "Plans architecturaux et de coffrage d'une villa duplex, métré et devis quantitatif/estimatif complet.",
    status: "Livré",
    photoCount: 18,
    images: [duplex],
    videos: [],
  },
  {
    id: "villa-duplex-r4",
    title: "Villa duplex + R+4",
    tag: "Conception 3D",
    meta: "Abidjan · Mixte · 2024",
    description:
      "Étude d'un ensemble comprenant une villa duplex et un immeuble R+4 : conception 3D, structure et coffrage.",
    status: "En cours",
    photoCount: 5,
    images: [immeuble],
    videos: [],
  },
  {
    id: "immeuble-r3-commerces",
    title: "Immeuble R+3 commerces",
    tag: "Suivi de chantier",
    meta: "Abidjan · Commercial · 2025",
    description:
      "Suivi de travaux d'un immeuble R+3 avec commerces en rez-de-chaussée, gros œuvre et second œuvre.",
    status: "En cours",
    photoCount: 5,
    images: [immeuble],
    videos: [],
  },
  {
    id: "temple-el-shaddai",
    title: "Temple El-Shaddaï Divo",
    tag: "Conception & métré",
    meta: "Divo · Édifice cultuel · 2023",
    description:
      "Conception architecturale du temple El-Shaddaï, plans de structure, métré et devis estimatif.",
    status: "Livré",
    photoCount: 8,
    images: [temple],
    videos: [],
  },
  {
    id: "villa-duplex-magasins",
    title: "Villa duplex 3 chambres + magasins",
    tag: "Plans techniques",
    meta: "Abidjan · Mixte · 2023",
    description:
      "Villa duplex 3 chambres avec magasins en façade : plans 2D/3D, coffrage, électricité et assainissement.",
    status: "Livré",
    photoCount: 4,
    images: [duplex],
    videos: [],
  },
];

export const STORAGE_KEY = "tde-portfolio-content-v1";

export function defaultContent(): SiteContent {
  return { projects: DEFAULT_PROJECTS, presentationVideo: null };
}

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultContent();
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      projects: Array.isArray(parsed.projects) ? (parsed.projects as Project[]) : DEFAULT_PROJECTS,
      presentationVideo: parsed.presentationVideo ?? null,
    };
  } catch {
    return defaultContent();
  }
}

export function saveContent(content: SiteContent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new Event("tde-content-updated"));
}
