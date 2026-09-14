# Dadi's Creative Hub

Crée un site portfolio one-page pour "Tohoury Dadi Elie", Conducteur de Travaux & Dessinateur Bâtiment à Abidjan, Côte d'Ivoire, AVEC :
1. Un espace administrateur caché (accessible via le mot "DADI" dans le footer)
2. Des vidéos qui se lancent AUTOMATIQUEMENT (autoplay) dès qu'elles sont visibles ou ajoutées

Le design doit reproduire EXACTEMENT ce qui est décrit ci-dessous. Utilise React + Tailwind + TypeScript + React Router + localStorage.

═══════════════════════════════════════════════
1. DESIGN SYSTEM (à respecter au pixel près)
═══════════════════════════════════════════════

Palette (CSS variables / theme Tailwind) :
- --bg: #0c0c0d (fond principal, noir profond)
- --bg-panel: #141416
- --bg-panel-2: #1a1a1c
- --line: #2a2a2c
- --line-soft: #202022
- --gold: #c9963c (accent principal, doré)
- --gold-soft: #e0b565 (doré clair)
- --text: #f0ede6 (texte principal)
- --text-dim: #a8a49c
- --text-faint: #6d6a65

Typographie (Google Fonts) :
- Display : "Big Shoulders Display" (600, 700, 800) → titres H1/H2/H3, brand
- Body : "IBM Plex Sans" (400, 500, 600, 700) → tout le reste
- Base 16px, line-height 1.6

Layout :
- Largeur max : 1180px
- Gutter : clamp(20px, 5vw, 64px)
- Scroll smooth, support prefers-reduced-motion

Détails graphiques :
- Coins dorés en L (::before/::after, 16-18px, bordure 2px gold) sur les cadres
- Bordures fines 1px var(--line)
- Eyebrow-line doré 36x2px avant labels
- Section-label : 0.8rem, letter-spacing 0.06em, text-faint
- Grille de fond hero : repeating-linear-gradient 64px, doré 5%

═══════════════════════════════════════════════
2. STRUCTURE DE LA PAGE PUBLIQUE
═══════════════════════════════════════════════

HEADER (fixe, z-100)
- 68px, rgba(12,12,13,0.7) + backdrop-blur(10px)
- Au scroll (>8px) : bordure basse, fond rgba(12,12,13,0.92)
- Brand "TOHOURY DADI ELIE", "DADI ELIE" en doré
- Nav : Profil, Expérience, Projets, Contact
- Mobile <780px : hamburger, menu déroulant

SECTION HERO (100vh)
- Grille 1.15fr / 0.85fr (mobile : 1 col)
- Eyebrow-line + "Portfolio" + H1 "TOHOURY
DADI ELIE" (Big Shoulders 800, clamp 2.8-6.2rem)
- Sous-titre doré "Conducteur de Travaux & Dessinateur Bâtiment"
- Tagline + meta "Abidjan · DKM Construction · ArchiCAD · AutoCAD · Revit · Twinmotion"
- Cadre photo avec coins dorés, grayscale(35%), ratio 4/5
- Animation fade-in échelonnée
- "Défiler" avec barre dorée en bas

SECTION PROFIL (#profil)
- Grille 260px / 1fr
- Portrait encadré coins dorés, grayscale(15%)
- "Méthode de travail" : 5 étapes numérotées (01-05) en Big Shoulders doré
- Contact-row 4 col : Téléphone / Email / Localisation / Langues
- Bloc "Vidéo de présentation" (voir section 4 ci-dessous pour l'autoplay)

SECTION EXPÉRIENCE (#experience) — fond #141416
- Timeline verticale (bordure gauche 1px, padding-left 28px)
- Points dorés 9px à -33px
- Sous-section "Formation académique" : grille 140px/1fr

SECTION PROJETS (#projets)
- Projets séparés par bordures
- En-tête : titre + tag doré (bordure 1px)
- Galerie : grille 4 col (3 tablette, 2 mobile), gap 8px, ratio 4/3
- Images grayscale(10%) → hover scale(1.05) grayscale(0%)
- Click → lightbox
- Vidéos projets : voir section 4 pour l'autoplay

LIGHTBOX
- Overlay rgba(6,6,7,0.94)
- Boutons prev/next/close 44x44, hover doré
- Escape / ArrowLeft / ArrowRight

SECTION CONTACT (#contact)
- Titre "Un projet à faire avancer ? Discutons-en."
- Liens tel et mail avec bordure basse

FOOTER
- Bordure haute
- "© 2025 Tohoury Dadi Elie" à gauche
- "Abidjan, Côte d'Ivoire" à droite
- ⚠️ Le mot "DADI" est un lien invisible vers /admin (même couleur, pas de soulignement, pas de hover visible)

═══════════════════════════════════════════════
3. CONTENU EXACT
═══════════════════════════════════════════════

CONTACTS :
- Téléphone : +225 07 99 44 54 90
- Email : elietohoury@gmail.com
- Localisation : Abidjan, Cocody Riviera Palmeraie
- Langues : Français courant · Anglais académique

MÉTHODE (5 étapes) :
1. Visite systématique du terrain avant toute conception : accès, orientation, contraintes réelles.
2. Analyse de l'extrait de plan / titre foncier et des voies d'accès.
3. Conception 2D/3D adaptée au terrain, puis plans techniques (structure, coffrage, électricité/assainissement).
4. Réalisation du métré et du devis quantitatif/estimatif.
5. Implantation, suivi de chantier et contrôle de conformité jusqu'à la livraison.

EXPÉRIENCE (4 postes) :
1. Oct 2025 — Aujourd'hui | DKM Construction — Conducteur de Travaux / Dessinateur
   - Conduite et suivi de travaux, gros œuvre et second œuvre.
   - Suivi des travaux d'une villa duplex à usage d'habitation, Paris Village (Abobo).
   - Suivi des travaux d'un bâtiment R+3.
   - Second œuvre : pose de carreaux granit, conception et réalisation de cuisines équipées, finitions.
   - Réalisation de métrés et devis quantitatifs/estimatifs.
   - Conception architecturale et dessin technique (plans 2D/3D, plans de coffrage).

2. Juil 2024 — Août 2025 | Green Field (Soubré) — Assistant Conducteur de Travaux
   - Préparation des documents de conception (plans 2D/3D, spécifications techniques).
   - Visites de chantier, contrôle de la progression des travaux.
   - Suivi et contrôle du terrassement de 4 bassins.
   - Suivi des travaux d'un bâtiment R+3.
   - Gestion et approvisionnement des matériaux.

3. Mai 2023 — Juin 2024 | Moayer Bat-CI (Cocody) — Stagiaire métreur et dessinateur TCE
   - Conception architecturale 2D/3D et plans de coffrage.
   - Devis estimatifs et quantitatifs, montage de dossiers d'appel d'offre.
   - Suivi et contrôle des travaux et des matériaux.

4. Oct 2022 — Mars 2023 | Mairie d'Attécoubé — Assistant conducteur de travaux stagiaire
   - Suivi et contrôle des travaux de rénovation de la mairie.
   - Implantation d'un bâtiment pour un particulier.

FORMATION :
- 2025 : Organisation, Gestion de projet et Planification — CCM BTP (en cours)
- Juin 2024 : Attestation en sécurité sur les chantiers de construction
- Fév. 2023 : Certificat professionnel en CAO/DAO
- 2021-2022 : BTS Génie Civil option Bâtiment — IFSM Abidjan
- 2019-2020 : Baccalauréat Série D — Groupe scolaire Madoue Touré

PROJETS INITIAUX (6) — mêmes contenus exacts que décrits :
(liste complète reprise à l'identique : Villa basse 3 pièces, Villa Duplex Mr. Anoh, Villa duplex + R+4, Immeuble R+3 commerces, Temple El-Shaddaï Divo, Villa duplex 3 chambres + magasins — avec leurs tags, meta, descriptions, statuts et nombres de photos respectifs : 12, 18, 5, 5, 8, 4)

═══════════════════════════════════════════════
4. 🎬 AUTOPLAY DES VIDÉOS (NOUVEAU — TRÈS IMPORTANT)
═══════════════════════════════════════════════

TOUTES les vidéos du site (vidéo de présentation, vidéos des projets, vidéos
ajoutées via l'admin) doivent se lancer AUTOMATIQUEMENT selon les règles
suivantes :

RÈGLES D'AUTOPLAY APPLIQUÉES À TOUTES LES BALISES <video> :
- autoPlay (démarre dès le chargement)
- muted (obligatoire pour que les navigateurs autorisent l'autoplay)
- loop (joue en boucle infinie)
- playsInline (empêche le plein écran auto sur iOS)
- preload="auto" (charge la vidéo en avance pour éviter les coupures)

📌 IMPORTANT : Comme les vidéos sont muted pour respecter les règles des
navigateurs, ajouter un BOUTON DE SON (icône 🔊/🔇) sur chaque vidéo pour
que l'utilisateur puisse activer le son s'il le souhaite. Bouton positionné
en bas à droite de la vidéo, discret (fond rgba(0,0,0,0.5), icône dorée).

INTERSECTION OBSERVER (recommandé) :
- Créer un composant <AutoVideo> réutilisable qui :
  * Utilise useRef + IntersectionObserver
  * Quand la vidéo entre dans le viewport (threshold 0.3) → video.play()
  * Quand elle sort du viewport → video.pause()
  * Cela évite de saturer le navigateur si plusieurs vidéos existent
- Props : src, poster (optionnel), className, controls (défaut false)

COMPOSANT <AutoVideo> :
```tsx
interface AutoVideoProps {
  src: string;
  poster?: string;
  className?: string;
  showControls?: boolean; // affiche les contrôles natifs (défaut: false)
  showSoundToggle?: boolean; // affiche le bouton son (défaut: true)
}

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dadi-portfolio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a98b8b5b-3e0d-4d82-bae6-88a018f21e05).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
