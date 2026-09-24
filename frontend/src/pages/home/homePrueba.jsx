import { ArrowUpRight, Check, Pause, Search } from "lucide-react";
import { Link } from "react-router";
import "./homePrueba.css";

const situations = [
  {
    context: "Una cuenta conocida",
    title: "El nombre te resulta familiar. El pedido, no tanto.",
    copy: "Una identidad visible puede ser legítima y aun así no confirmar quién envió el mensaje. Volvé a contactar a esa persona por un medio que ya conozcas.",
  },
  {
    context: "Una urgencia inesperada",
    title: "La presión pide velocidad. Vos podés pedir un minuto.",
    copy: "Alertas, premios o problemas de cuenta pueden buscar una acción inmediata. Antes de abrir un enlace o compartir datos, revisá qué te están pidiendo.",
  },
  {
    context: "Una oferta convincente",
    title: "Que algo parezca real no reemplaza comprobarlo.",
    copy: "Una oferta, un perfil o una web puede verse coherente. Contrastá la información con una fuente independiente antes de avanzar.",
  },
];

const method = [
  {
    title: "Detenete",
    copy: "La urgencia no tiene que decidir por vos.",
    icon: Pause,
  },
  {
    title: "Observá el contexto",
    copy: "Revisá quién escribe, qué pide y adónde lleva.",
    icon: Search,
  },
  {
    title: "Contrastá",
    copy: "Buscá una fuente o un canal conocido e independiente.",
    icon: Check,
  },
];

function SignalConstellation() {
  return (
    <div className="hp-constellation" aria-hidden="true">
      <svg
        className="hp-constellation-graphic"
        viewBox="0 0 620 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="hp-network-lines">
          <path d="M105 224 209 117 331 171 455 94 526 221 463 326 536 455 385 522 276 440 137 485 86 348 105 224Z" />
          <path d="m209 117 67 323M331 171 137 485M455 94 276 440M526 221 86 348M463 326 105 224M385 522 331 171" />
        </g>

        <g className="hp-orbit-ring">
          <ellipse cx="311" cy="310" rx="235" ry="138" transform="rotate(-24 311 310)" />
          <ellipse cx="311" cy="310" rx="221" ry="118" transform="rotate(61 311 310)" />
        </g>

        <g className="hp-signal-nodes">
          <circle className="hp-node hp-node-violet" cx="105" cy="224" r="7" />
          <path className="hp-node hp-node-amber" d="m209 106 10 18h-20l10-18Z" />
          <circle className="hp-node hp-node-teal" cx="331" cy="171" r="6" />
          <path className="hp-node hp-node-violet" d="m455 82 11 20h-22l11-20Z" />
          <circle className="hp-node hp-node-amber" cx="526" cy="221" r="7" />
          <path className="hp-node hp-node-teal" d="m463 314 11 20h-22l11-20Z" />
          <circle className="hp-node hp-node-violet" cx="536" cy="455" r="6" />
          <path className="hp-node hp-node-amber" d="m385 510 11 20h-22l11-20Z" />
          <circle className="hp-node hp-node-teal" cx="276" cy="440" r="7" />
          <path className="hp-node hp-node-violet" d="m137 473 11 20h-22l11-20Z" />
          <circle className="hp-node hp-node-amber" cx="86" cy="348" r="6" />
        </g>

        <g className="hp-signal-core">
          <circle cx="311" cy="310" r="74" />
          <circle cx="311" cy="310" r="5" />
          <path d="M311 236v-32M311 416v-32M237 310h-32M417 310h-32" />
        </g>
      </svg>

      <span className="hp-signal-word hp-signal-context">contexto</span>
      <span className="hp-signal-word hp-signal-origin">origen</span>
      <span className="hp-signal-word hp-signal-action">acción</span>
      <span className="hp-signal-pause">pausa</span>
    </div>
  );
}

export default function HomePrueba() {
  return (
    <div className="home-prueba">
      <a className="hp-skip-link" href="#contenido-home-prueba">
        Ir al contenido principal
      </a>

      <header className="hp-header">
        <nav className="hp-nav" aria-label="Navegación principal">
          <Link className="hp-wordmark" to="/home-prueba" aria-label="A tiempo, inicio">
            <span className="hp-wordmark-mark" aria-hidden="true" />
            A tiempo
          </Link>

          <div className="hp-nav-actions">
            <div className="hp-section-links" aria-label="Secciones de la página">
              <a href="#evaluar-prueba">Evaluar</a>
              <a href="#aprender-prueba">Aprender</a>
            </div>
            <Link className="hp-login" to="/login">
              Ingresar
            </Link>
            <Link className="hp-primary hp-nav-primary" to="/register">
              Crear cuenta
            </Link>
          </div>
        </nav>
      </header>

      <main id="contenido-home-prueba">
        <section className="hp-hero" aria-labelledby="hp-title">
          <div className="hp-hero-copy">
            <h1 id="hp-title">
              Si algo te apura, <span>no decidas todavía.</span>
            </h1>
            <p>
              A tiempo te ayuda a mirar con más calma los mensajes, enlaces,
              ofertas y perfiles que aparecen todos los días.
            </p>
            <div className="hp-hero-actions">
              <Link className="hp-primary" to="/register">
                Crear cuenta <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
              <a className="hp-text-link" href="#evaluar-prueba">
                Conocé cómo funciona
              </a>
            </div>
          </div>

          <SignalConstellation />
        </section>

        <section className="hp-statement" aria-labelledby="hp-statement-title">
          <h2 id="hp-statement-title">La apariencia no siempre alcanza.</h2>
          <p>
            Nombres conocidos, mensajes bien escritos y sitios cuidados pueden
            inspirar confianza. Una duda a tiempo abre espacio para comprobar
            antes de exponerte.
          </p>
        </section>

        <section
          className="hp-situations"
          id="evaluar-prueba"
          aria-labelledby="hp-situations-title"
        >
          <h2 id="hp-situations-title">Tres momentos para mirar de nuevo.</h2>

          <div className="hp-situation-list">
            {situations.map((situation, index) => (
              <article className="hp-situation" key={situation.context}>
                <span className="hp-situation-mark" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="hp-situation-copy">
                  <h3>{situation.title}</h3>
                  <p className="hp-situation-context">{situation.context}</p>
                  <p>{situation.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="hp-method"
          id="aprender-prueba"
          aria-labelledby="hp-method-title"
        >
          <div className="hp-method-heading">
            <h2 id="hp-method-title">Antes de actuar, verificá.</h2>
            <p>
              No se trata de desconfiar de todo. Se trata de contar con un
              momento y criterios simples para decidir mejor.
            </p>
          </div>

          <ol className="hp-method-steps">
            {method.map(({ title, copy, icon: Icon }, index) => (
              <li key={title}>
                <span className="hp-method-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="hp-method-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="hp-closing" aria-labelledby="hp-closing-title">
          <h2 id="hp-closing-title">Una pausa también puede protegerte.</h2>
          <p>
            Aprendé a reconocer señales, contrastar la información y elegir tu
            próximo paso con más contexto.
          </p>
          <Link className="hp-primary" to="/register">
            Empezar ahora <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </section>
      </main>
    </div>
  );
}
