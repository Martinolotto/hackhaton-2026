import Nav from "../../components/navegation/nav";
import { ArrowUpRight, Check, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import "./home.css";

export default function Home() {
  const situations = [
    {
      eyebrow: "Una cuenta conocida",
      title: "Un mensaje de alguien de confianza también merece contexto.",
      copy: "Una identidad visible puede ser legítima y aun así no ser quien envió el mensaje. Detenerse abre espacio para verificar por otro medio.",
    },
    {
      eyebrow: "Una urgencia inesperada",
      title: "La presión pide velocidad. Tu decisión puede pedir un minuto.",
      copy: "Alertas, premios y problemas de cuenta pueden buscar una acción inmediata. Antes de compartir datos o abrir un enlace, revisá qué te están pidiendo.",
    },
    {
      eyebrow: "Una oferta convincente",
      title: "Que algo parezca real no reemplaza comprobarlo.",
      copy: "Una oferta, un perfil o una web puede tener todos los detalles correctos. Contrastá con fuentes independientes antes de avanzar.",
    },
  ];

  return (
    <div className="home-landing">
      <a className="landing-skip-link" href="#contenido-principal">
        Ir al contenido principal
      </a>
      <Nav variant="landing" />
      <main id="contenido-principal">
        <section className="landing-hero" aria-labelledby="home-title">
          <div className="landing-hero-copy">
            <SplitText tag="h1" id="home-title" text="Si algo te apura, no decidas todavía." />
            <p>
              A tiempo te ayuda a mirar con más calma los mensajes, enlaces,
              ofertas y perfiles que aparecen todos los días.
            </p>
            <div className="landing-hero-actions">
              <Link className="landing-primary-action" to="/register">
                Crear cuenta <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <a className="landing-secondary-action" href="#evaluar">
                Conocé cómo funciona
              </a>
            </div>
          </div>

          <div className="signal-orbit" aria-hidden="true">
            <span className="orbit-line orbit-line-one" />
            <span className="orbit-line orbit-line-two" />
            <span className="signal-core"><ShieldCheck size={42} strokeWidth={1.25} /></span>
            <span className="signal-particle particle-violet particle-one" />
            <span className="signal-particle particle-amber particle-two" />
            <span className="signal-particle particle-teal particle-three" />
            <span className="signal-particle particle-blue particle-four" />
            <span className="signal-particle particle-violet particle-five" />
            <span className="signal-particle particle-amber particle-six" />
            <span className="signal-particle particle-teal particle-seven" />
            <span className="signal-caption caption-one">contexto</span>
            <span className="signal-caption caption-two">origen</span>
            <span className="signal-caption caption-three">acción</span>
          </div>
        </section>

        <section className="landing-statement" aria-labelledby="statement-title">
          <SplitText tag="h2" id="statement-title" text="La apariencia no siempre alcanza." />
          <p>
            Los engaños pueden usar nombres conocidos, urgencia o detalles
            convincentes. Reconocer una duda a tiempo permite elegir qué hacer
            antes de exponerte.
          </p>
        </section>

        <section className="situation-list" id="evaluar" aria-labelledby="situations-title">
          <SplitText tag="h2" id="situations-title" className="sr-only" text="Situaciones cotidianas" />
          {situations.map((situation) => (
            <article className="situation-row" key={situation.eyebrow}>
              <div className="situation-marker" aria-hidden="true"><span /></div>
              <div>
                <p className="situation-eyebrow">{situation.eyebrow}</p>
                <SplitText tag="h3" text={situation.title} />
              </div>
              <p className="situation-copy">{situation.copy}</p>
            </article>
          ))}
        </section>

        <section className="landing-method" id="aprender" aria-labelledby="method-title">
          <div className="landing-method-title">
            <SplitText tag="h2" id="method-title" text="Antes de actuar, verificá." />
            <p>
              No se trata de desconfiar de todo. Se trata de contar con un
              momento y criterios para decidir mejor.
            </p>
          </div>
          <ol>
            <li>
              <span className="method-icon"><ShieldCheck aria-hidden="true" size={22} /></span>
              <div><SplitText tag="h3" text="Detenete" /><p>La urgencia no tiene que decidir por vos.</p></div>
            </li>
            <li>
              <span className="method-icon"><Search aria-hidden="true" size={22} /></span>
              <div><SplitText tag="h3" text="Observá el contexto" /><p>Revisá quién escribe, qué pide y a dónde lleva.</p></div>
            </li>
            <li>
              <span className="method-icon"><Check aria-hidden="true" size={22} /></span>
              <div><SplitText tag="h3" text="Contrastá" /><p>Buscá una fuente o canal conocido e independiente.</p></div>
            </li>
          </ol>
        </section>

        <section className="landing-closing" aria-labelledby="closing-title">
          <SplitText tag="h2" id="closing-title" text="Una pausa también puede protegerte." />
          <Link className="landing-primary-action" to="/register">
            Empezar ahora <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
