// Stockage des fichiers (images / vidéos).
// Nouveau : envoi en ligne dans le stockage du backend, référence "sb:<chemin>".
// Ancien : IndexedDB local, référence "idb:<id>" (toujours lisible).

import { supabase } from "@/integrations/supabase/client";

const DB_NAME = "tde-media";
const STORE = "files";
export const IDB_PREFIX = "idb:";
export const SB_PREFIX = "sb:";
const BUCKET = "media";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const t = db.transaction(STORE, mode);
        const req = run(t.objectStore(STORE));
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
        t.oncomplete = () => db.close();
      }),
  );
}

const urlCache = new Map<string, string>();

export function isMediaRef(src: string): boolean {
  return typeof src === "string" && (src.startsWith(IDB_PREFIX) || src.startsWith(SB_PREFIX));
}

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-60);
}

/** Envoie un fichier en ligne et retourne sa référence "sb:<chemin>". */
export async function saveFile(file: File): Promise<string> {
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${safeName(file.name)}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  const ref = SB_PREFIX + path;
  // affichage immédiat, sans attendre l'URL signée
  urlCache.set(ref, URL.createObjectURL(file));
  return ref;
}

/** Résout une source ("sb:…", "idb:…" ou URL classique) en URL affichable. */
export async function resolveSrc(src: string): Promise<string> {
  if (!isMediaRef(src)) return src;
  const cached = urlCache.get(src);
  if (cached) return cached;

  if (src.startsWith(SB_PREFIX)) {
    const path = src.slice(SB_PREFIX.length);
    const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24 * 365);
    const url = data?.signedUrl ?? "";
    if (url) urlCache.set(src, url);
    return url;
  }

  const id = src.slice(IDB_PREFIX.length);
  const blob = await tx<Blob | undefined>("readonly", (s) => s.get(id) as IDBRequest<Blob | undefined>);
  if (!blob) return "";
  const url = URL.createObjectURL(blob);
  urlCache.set(src, url);
  return url;
}

export async function deleteFile(src: string): Promise<void> {
  if (!isMediaRef(src)) return;
  if (src.startsWith(SB_PREFIX)) {
    urlCache.delete(src);
    await supabase.storage.from(BUCKET).remove([src.slice(SB_PREFIX.length)]);
    return;
  }
  const cached = urlCache.get(src);
  if (cached) {
    URL.revokeObjectURL(cached);
    urlCache.delete(src);
  }
  await tx("readwrite", (s) => s.delete(src.slice(IDB_PREFIX.length)) as IDBRequest<undefined>);
}
