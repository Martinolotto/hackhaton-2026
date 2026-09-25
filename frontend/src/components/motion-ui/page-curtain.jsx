import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router";
import "./page-curtain.css";

const pageTitles = {
  "/": "Inicio",
  "/home-prueba": "Inicio",
  "/analizar-datos": "Analizar datos",
  "/aprendizaje": "Aprendizaje",
  "/foro": "Foro",
  "/dashboard": "Panel",
  "/login": "Ingresar",
  "/register": "Crear cuenta",
};

function getPageTitle(pathname) {
  return pageTitles[pathname] ?? "A tiempo";
}

/**
 * Adds an interruptible, accessible route transition around React Router's
 * routes. It deliberately leaves pointer events enabled while it animates.
 */
export function PageCurtainStage({ children }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const shouldReduceMotion = useReducedMotion();
  const hasMounted = useRef(false);
  const [curtainKey, setCurtainKey] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const routeKey = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const title = getPageTitle(location.pathname);
    setCurtainKey(routeKey);
    setAnnouncement(`${title}. Página cargada.`);

    if (navigationType === "POP") return undefined;

    const focusDelay = shouldReduceMotion ? 150 : 440;
    const focusTimer = window.setTimeout(() => {
      document.querySelector("main")?.focus({ preventScroll: true });
    }, focusDelay);

    return () => window.clearTimeout(focusTimer);
  }, [location.key, location.pathname, navigationType, routeKey, shouldReduceMotion]);

  const contentTransition = shouldReduceMotion
    ? { duration: 0.12, ease: "easeOut" }
    : { duration: 0.24, delay: 0.17, ease: [0.16, 1, 0.3, 1] };

  return (
    <>
      <p className="page-curtain-announcer" aria-atomic="true" aria-live="polite">
        {announcement}
      </p>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={routeKey}
          className="page-curtain-content"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -5 }}
          transition={contentTransition}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {curtainKey && (
          <motion.div
            key={curtainKey}
            className="page-curtain"
            aria-hidden="true"
            initial={shouldReduceMotion ? { opacity: 0 } : { y: "-175%" }}
            animate={
              shouldReduceMotion
                ? { opacity: [0, 0.92, 0] }
                : { y: ["-175%", "0%", "175%"] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.15, times: [0, 0.45, 1], ease: "easeInOut" }
                : {
                    duration: 0.5,
                    times: [0, 0.34, 1],
                    ease: [0.55, 0, 1, 0.45],
                }
            }
          >
            <div className="page-curtain-surface" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
