import {
  ArrowUpRight,
  Check,
  FileSearch,
  MessageSquareText,
  Pause,
  Search,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router";
import Nav from "../../components/navegation/nav";
import { useAuth } from "../../context/auth";
import "./homePrueba.css";

import TechText from "@/components/react-bits/techText";
import SplitText from "@/components/react-bits/textAparicionAnimations/SplitText";

const MotionLink = motion.create(Link);

const situations = [
  {
    context: "Una cuenta conocida",
    title: "El nombre resulta familiar. El pedido, no tanto.",
    copy: "Una identidad visible puede ser legítima y aun así no confirmar quién envió el mensaje. Volver a contactar a esa persona por un medio conocido agrega evidencia independiente.",
    icon: MessageSquareText,
  },
  {
    context: "Una urgencia inesperada",
    title: "La presión pide velocidad. Tú puedes pedir un minuto.",
    copy: "Alertas, premios o problemas de cuenta pueden buscar una acción inmediata. Antes de abrir un enlace o compartir datos, conviene revisar qué se solicita y desde dónde.",
    icon: Pause,
  },
  {
    context: "Una oferta convincente",
    title: "Que algo parezca real no reemplaza comprobarlo.",
    copy: "Una oferta, un perfil o una web puede verse coherente. Contrastar la información con una fuente independiente permite decidir con más contexto.",
    icon: FileSearch,
  },
];

const method = [
  {
    title: "Detente",
    copy: "La urgencia no tiene que decidir por ti.",
    icon: Pause,
  },
  {
    title: "Observa el contexto",
    copy: "Revisa quién escribe, qué solicita y adónde conduce.",
    icon: Search,
  },
  {
    title: "Contrasta",
    copy: "Busca una fuente o un canal conocido e independiente.",
    icon: Check,
  },
];

export default function HomePrueba() {
  const shouldReduceMotion = useReducedMotion();
  const { user } = useAuth();

  return (
    <div className="home-prueba">
      <a className="hp-skip-link" href="#contenido-home-prueba">
        Ir al contenido principal
      </a>

      <Nav />

      <main id="contenido-home-prueba" tabIndex="-1">
        <section className="hp-tech-text-hero" aria-label="Mensaje principal">
          <div className="hp-tech-text-frame">
            <TechText
              text="Si algo te apura, no decidas todavía."
              color="#000000"
              accentColor="#000000"
              fontWeight={700}
              fontSize={120}
              className="hp-tech-text"
            />
          </div>
        </section>

        <section className="hp-statement" aria-labelledby="hp-statement-title">
          <SplitText
            tag="h2"
            id="hp-statement-title"
            text="La apariencia inspira confianza. La evidencia ayuda a sostenerla."
            splitBy="chars"
            easing="elastic.out"
            delay={10}
            duration={1.3}
            threshold={0.2}
            rootMargin="-50px"
          />
          <p>
            Un nombre conocido, un sitio cuidado o un mensaje bien escrito no
            confirman por sí solos quién está detrás. A tiempo hace visible lo
            que observas, lo que falta y lo que todavía conviene comprobar.
          </p>
        </section>

        <section
          className="hp-situations"
          id="situaciones"
          aria-labelledby="hp-situations-title"
        >
          <div className="hp-section-heading">
            <SplitText
              tag="h2"
              id="hp-situations-title"
              text="Hay momentos cotidianos que merecen una segunda mirada."
              splitBy="chars"
              easing="elastic.out"
              delay={10}
              duration={1.3}
              threshold={0.2}
              rootMargin="-50px"
            />
            <p>
              No se trata de desconfiar de todo, sino de reconocer cuándo una
              pausa puede darte mejor información.
            </p>
          </div>

          <div className="hp-situation-list">
            {situations.map(({ context, title, copy, icon: Icon }) => (
              <article className="hp-situation" key={context}>
                <span className="hp-situation-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <div className="hp-situation-copy">
                  <SplitText
                    tag="h3"
                    text={title}
                    splitBy="chars"
                    easing="elastic.out"
                    delay={10}
                    duration={1.3}
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                  <p>{copy}</p>
                  <span>{context}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="hp-method"
          id="como-funciona"
          aria-labelledby="hp-method-title"
        >
          <div className="hp-method-heading">
            <SplitText
              tag="h2"
              id="hp-method-title"
              text="Una pausa breve puede convertir señales sueltas en próximos pasos."
              splitBy="chars"
              easing="elastic.out"
              delay={10}
              duration={1.3}
              threshold={0.2}
              rootMargin="-50px"
            />
            <p>
              El método mantiene la decisión en tus manos y agrega estructura
              cuando la presión intenta quitártela.
            </p>
          </div>

          <ol className="hp-method-steps">
            {method.map(({ title, copy, icon: Icon }, index) => (
              <li key={title}>
                <span className="hp-method-icon" aria-hidden="true">
                  <Icon size={21} strokeWidth={1.7} />
                </span>
                <span className="hp-method-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <SplitText
                  tag="h3"
                  text={title}
                  splitBy="chars"
                  easing="elastic.out"
                  delay={10}
                  duration={1.3}
                  threshold={0.2}
                  rootMargin="-50px"
                />
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="hp-closing" aria-labelledby="hp-closing-title">
          <div>
            <SplitText
              tag="h2"
              id="hp-closing-title"
              text="Decide con más contexto."
              splitBy="chars"
              easing="elastic.out"
              delay={10}
              duration={1.3}
              threshold={0.2}
              rootMargin="-50px"
            />
            <p>
              Reúne lo que observas, identifica lo que falta y verifica antes
              de realizar una acción difícil de revertir.
            </p>
          </div>
          <MotionLink
            className="hp-primary"
            to={user ? "/evaluar" : "/register"}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            {user ? "Evaluar una interacción" : "Empezar con A tiempo"}
            <ArrowUpRight aria-hidden="true" size={18} />
          </MotionLink>
        </section>
      </main>

      <footer className="hp-footer">
        <div>
          <Link className="hp-wordmark" to="/home-prueba">
            <span className="hp-wordmark-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            A tiempo
          </Link>
          <p>Contexto antes de actuar.</p>
        </div>
        <nav aria-label="Navegación del pie">
          <a href="#situaciones">Situaciones</a>
          <a href="#como-funciona">Cómo funciona</a>
          <Link to="/login">Ingresar</Link>
        </nav>
      </footer>
    </div>
  );
}
