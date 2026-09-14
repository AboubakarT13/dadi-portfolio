import { useEffect, useState } from "react";
import { defaultContent, loadContent, type SiteContent } from "@/lib/portfolio-data";

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(() => defaultContent());

  useEffect(() => {
    setContent(loadContent());
    const sync = () => setContent(loadContent());
    window.addEventListener("tde-content-updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tde-content-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return content;
}
