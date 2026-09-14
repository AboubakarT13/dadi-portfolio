// Stockage local des fichiers (images / vidéos) dans IndexedDB.
// Les contenus sont référencés par une URL logique "idb:<id>".

const DB_NAME = "tde-media";
const STORE = "files";
export const IDB_PREFIX = "idb:";

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
  return typeof src === "string" && src.startsWith(IDB_PREFIX);
}

/** Enregistre un fichier local et retourne sa référence "idb:<id>". */
export async function saveFile(file: File): Promise<string> {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  await tx("readwrite", (s) => s.put(file, id) as IDBRequest<IDBValidKey>);
  // pré-remplit le cache : affichage immédiat, sans relecture disque
  urlCache.set(IDB_PREFIX + id, URL.createObjectURL(file));
  return IDB_PREFIX + id;
}

/** Résout une source ("idb:<id>" ou URL classique) en URL affichable. */
export async function resolveSrc(src: string): Promise<string> {
  if (!isMediaRef(src)) return src;
  const cached = urlCache.get(src);
  if (cached) return cached;
  const id = src.slice(IDB_PREFIX.length);
  const blob = await tx<Blob | undefined>("readonly", (s) => s.get(id) as IDBRequest<Blob | undefined>);
  if (!blob) return "";
  const url = URL.createObjectURL(blob);
  urlCache.set(src, url);
  return url;
}

export async function deleteFile(src: string): Promise<void> {
  if (!isMediaRef(src)) return;
  const cached = urlCache.get(src);
  if (cached) {
    URL.revokeObjectURL(cached);
    urlCache.delete(src);
  }
  await tx("readwrite", (s) => s.delete(src.slice(IDB_PREFIX.length)) as IDBRequest<undefined>);
}
