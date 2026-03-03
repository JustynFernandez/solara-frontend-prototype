import React from "react";
import { motion } from "framer-motion";

type ImageGalleryProps = {
  images: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    {images.map((src, index) => (
      <motion.div
        key={src}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: index * 0.05 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur"
      >
        <img src={src} alt={`Project image ${index + 1}`} className="h-40 w-full object-cover sm:h-32" />
      </motion.div>
    ))}
  </div>
);

export default ImageGallery;
