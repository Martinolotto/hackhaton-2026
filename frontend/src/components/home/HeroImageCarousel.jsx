import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import firstSectionImageOne from "../../assets/firstSectionImages/pexels-yankrukov-7691677.jpg";
import firstSectionImageTwo from "../../assets/firstSectionImages/pexels-yankrukov-7693218.jpg";

const images = [
  {
    src: firstSectionImageOne,
    alt: "Dos profesionales revisando información frente a una computadora.",
  },
  {
    src: firstSectionImageTwo,
    alt: "Dos profesionales analizando datos en computadoras portátiles.",
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroImageCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || images.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const activeImage = images[activeIndex];

  return (
    <div
      className="hp-image-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Imágenes destacadas"
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={activeImage.src}
          className="hp-carousel-image"
          src={activeImage.src}
          alt={activeImage.alt}
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.9, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </div>
  );
}
