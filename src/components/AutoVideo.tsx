import { useEffect, useRef, useState } from "react";

export interface AutoVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** contrôles natifs (défaut: false) */
  showControls?: boolean;
  /** bouton son (défaut: true) */
  showSoundToggle?: boolean;
}

export function AutoVideo({
  src,
  poster,
  className = "",
  showControls = false,
  showSoundToggle = true,
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    if (typeof IntersectionObserver === "undefined") {
      tryPlay();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
          else el.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  const toggleSound = () => {
    const el = ref.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    if (!next) {
      el.volume = 1;
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
    setMuted(next);
  };

  return (
    <div className={`relative overflow-hidden bg-panel-2 ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={showControls}
        className="h-full w-full object-cover"
      />
      {showSoundToggle && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Activer le son" : "Couper le son"}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-sm text-gold transition-colors"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <span aria-hidden="true" className="text-sm">
            {muted ? "🔇" : "🔊"}
          </span>
        </button>
      )}
    </div>
  );
}

export default AutoVideo;
