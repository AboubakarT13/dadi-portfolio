import {
  PROJET_1,
  PROJET_2,
  PROJET_3,
  PROJET_4,
  PROJET_5,
  PROJET_6,
} from "@/lib/project-images";

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
    title: "Villa basse 3 pièces + logement indépendant",
    tag: "Réalisé",
    meta: "DKM Construction — Bouaké, Cité CDCI (Terminus du bus) — Terrain 600 m²",
    description:
      "Premier projet réalisé chez DKM Construction. Le client souhaitait une villa basse principale de 3 pièces, complétée par un logement indépendant sur le même terrain. Rôle : dessinateur — conception de l'ensemble des plans, réalisation du devis, implantation du bâtiment, puis suivi de conformité de l'avancement des travaux avec les plans.",
    status: "Livré",
    photoCount: PROJET_1.length,
    images: PROJET_1,
    videos: [],
  },
  {
    id: "villa-duplex-anoh",
    title: "Villa Duplex — Résidence Mr. Anoh",
    tag: "En cours",
    meta: "DKM Construction — Paris Village, Abobo (lot 344, îlot 51, quartier Djibi)",
    description:
      "Le client est venu avec des plans en 2D. Sur cette base, conception complète des plans 3D, des plans de structure et de tous les plans d'exécution (coffrage, électricité/assainissement). Programme : RDC avec garage 2 voitures, salon, salle à manger, cuisine, chambre visiteur ; étage avec 4 chambres et une salle de sport.",
    status: "Livré",
    photoCount: PROJET_2.length,
    images: PROJET_2,
    videos: [],
  },
  {
    id: "villa-duplex-r4",
    title: "Villa duplex + immeuble locatif R+4",
    tag: "Conception 3D",
    meta: "Conception uniquement — Cocody Angré, quartier Djorobité — Terrain 19 m x 35 m",
    description:
      "Cliente propriétaire d'un terrain souhaitant une villa duplex pour elle-même ainsi qu'un immeuble locatif R+4 sur la même parcelle. Mission limitée à la conception : plans 2D, rendus 3D des deux bâtiments, afin de donner à la cliente une première idée concrète de son projet.",
    status: "En cours",
    photoCount: PROJET_3.length,
    images: PROJET_3,
    videos: [],
  },
  {
    id: "immeuble-r3-commerces",
    title: "Immeuble R+3 avec commerces",
    tag: "Conception 3D",
    meta: "Conception uniquement — Abgoville — Terrain 15 m x 20 m",
    description:
      "Client souhaitant une proposition d'aménagement pour son terrain avant présentation à un architecte. Programme proposé : RDC avec parking et 4 magasins/boutiques ; aux étages, un motif répété (appartement 2 chambres + salon, et 2 studios).",
    status: "En cours",
    photoCount: PROJET_4.length,
    images: PROJET_4,
    videos: [],
  },
  {
    id: "temple-el-shaddai",
    title: "Temple El-Shaddaï Divo",
    tag: "Conception 3D",
    meta: "Église Évangélique des Assemblées de Dieu — Côte d'Ivoire — Divo — Terrain 20 m x 30 m (600 m²)",
    description:
      "Conception d'un temple en mezzanine d'une capacité de 500 places, avec un bâtiment annexe (toilettes, salles pour l'école du dimanche, bureaux, boutique) réalisé en R+1 — fondations prévues pour un R+2 futur. Devis quantitatif/estimatif complet réalisé avec l'appui d'un ingénieur pour l'étude de structure.",
    status: "Livré",
    photoCount: PROJET_5.length,
    images: PROJET_5,
    videos: [],
  },
  {
    id: "villa-duplex-magasins",
    title: "Villa duplex 3 chambres + espace magasins",
    tag: "Conception 3D",
    meta: "Conception uniquement — Terrain 20 m x 20 m",
    description:
      "Cliente disposant d'un terrain de 20 m x 20 m, souhaitant réserver 15 m x 20 m pour sa propre villa duplex et une bande de 5 m en façade pour des magasins à découper ultérieurement. Programme : RDC avec hall, salon, salle à manger, cuisine, 2 chambres et espace magasins en façade ; étage avec la chambre principale.",
    status: "Livré",
    photoCount: PROJET_6.length,
    images: PROJET_6,
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
