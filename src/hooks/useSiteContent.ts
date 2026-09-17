import { useCallback, useEffect, useState } from "react";
import { defaultContent, type SiteContent } from "@/lib/portfolio-data";
import { CONTENT_EVENT, fetchSiteContent } from "@/lib/site-db";

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(() => defaultContent());

  const sync = useCallback(() => {
    fetchSiteContent()
      .then(setContent)
      .catch(() => {
        /* garde le contenu déjà affiché */
      });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener(CONTENT_EVENT, sync);
    return () => window.removeEventListener(CONTENT_EVENT, sync);
  }, [sync]);

  return content;
}
