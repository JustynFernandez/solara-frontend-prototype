import React from "react";
import { motion } from "framer-motion";

type ImageGalleryProps = {
  images: string[];
};

const fallbackPanels = [
  "from-[#c8ddff] via-[#f4f7ff] to-[#fff8e2]",
  "from-[#d7f4e8] via-[#eef8ff] to-[#fff2dc]",
  "from-[#d7e6ff] via-[#f6f8ff] to-[#f5efe3]",
];

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {images.map((src, index) => (
      <motion.div
        key={`${src}-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.05 }}
      >
        <GalleryImage src={src} index={index} />
      </motion.div>
    ))}
  </div>
);

type GalleryImageProps = {
  src: string;
  index: number;
};

const GalleryImage: React.FC<GalleryImageProps> = ({ src, index }) => {
  const [errored, setErrored] = React.useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex h-40 flex-col justify-between rounded-2xl border border-[var(--solara-rule)] bg-gradient-to-br ${fallbackPanels[index % fallbackPanels.length]} p-4 shadow-[var(--solara-shadow-soft)] sm:h-32`}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--solara-accent-strong)]">
          Project snapshot
        </span>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--solara-text-strong)]">Community build reference</p>
          <p className="text-xs leading-5 text-[var(--solara-text-muted)]">
            Remote image unavailable. The workspace still stays intact.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--solara-rule)] bg-[var(--solara-surface-1)] shadow-[var(--solara-shadow-soft)]">
      <img
        src={src}
        alt={`Project image ${index + 1}`}
        className="h-40 w-full object-cover sm:h-32"
        loading="lazy"
        onError={() => setErrored(true)}
      />
    </div>
  );
};

export default ImageGallery;
