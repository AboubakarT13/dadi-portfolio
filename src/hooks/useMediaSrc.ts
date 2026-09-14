import { useEffect, useState } from "react";
import { isMediaRef, resolveSrc } from "@/lib/media-store";

/** Retourne une URL affichable pour une source locale ("idb:…") ou distante. */
export function useMediaSrc(src: string): string {
  const [url, setUrl] = useState(() => (isMediaRef(src) ? "" : src));

  useEffect(() => {
    let alive = true;
    if (!isMediaRef(src)) {
      setUrl(src);
      return;
    }
    resolveSrc(src).then((u) => {
      if (alive) setUrl(u);
    });
    return () => {
      alive = false;
    };
  }, [src]);

  return url;
}
