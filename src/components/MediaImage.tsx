import type { ImgHTMLAttributes } from "react";
import { useMediaSrc } from "@/hooks/useMediaSrc";

export function MediaImage({ src = "", ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const resolved = useMediaSrc(String(src));
  if (!resolved) return <span className="block h-full w-full bg-panel-2" />;
  return <img src={resolved} {...rest} />;
}

export default MediaImage;
