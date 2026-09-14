import { useRef, useState } from "react";
import { saveFile } from "@/lib/media-store";

interface MediaDropProps {
  accept: "image/*" | "video/*";
  label: string;
  multiple?: boolean;
  onFiles: (refs: string[]) => void;
}

/** Zone de dépôt + sélection de fichiers depuis l'appareil. */
export function MediaDrop({ accept, label, multiple = true, onFiles }: MediaDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const handle = async (list: FileList | null) => {
    if (!list || list.length === 0) return;
    setBusy(true);
    try {
      const kind = accept.startsWith("image") ? "image" : "video";
      const files = Array.from(list).filter((f) => f.type.startsWith(kind));
      const refs: string[] = [];
      for (const f of files) refs.push(await saveFile(f));
      if (refs.length) onFiles(refs);
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        void handle(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer border border-dashed px-4 py-6 text-center text-sm transition-colors ${
        over ? "border-gold text-gold" : "border-line text-faint hover:border-gold hover:text-gold"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => void handle(e.target.files)}
      />
      {busy ? "Import en cours…" : label}
    </div>
  );
}

export default MediaDrop;
