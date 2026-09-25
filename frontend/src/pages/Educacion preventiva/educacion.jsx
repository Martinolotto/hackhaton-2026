import { ArrowRight, MessageSquareText, Search, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router";
import Nav from "../../components/navegation/nav";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import "../app-sections.css";

const categories = [
  [MessageSquareText, "Mensajes y correo"], [Search, "Sitios y enlaces"], [ShieldCheck, "Ofertas y marketplaces"], [UserRound, "Cuentas e identidades"],
];

export default function Educacion() {
  return (
    <div className="at-page">
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <header className="education-hero"><div><SplitText tag="h1" text="Aprende a verificar antes de confiar." /><p>Guías claras para reconocer presión, contrastar información y decidir con más contexto.</p></div><div className="education-search"><label htmlFor="education-search">Busca una guía o una señal</label><input className="at-search" id="education-search" type="search" placeholder="Ej.: enlace, urgencia o cuenta" /></div></header>

        <section className="education-feature" aria-labelledby="featured-guide"><div><div className="education-meta"><span className="at-tag">Guía destacada</span><span className="at-tag">6 min de lectura</span></div><SplitText tag="h2" id="featured-guide" text="Qué observar cuando un mensaje te pide actuar rápido." /><p>La urgencia puede limitar el tiempo para verificar. Esta guía propone una pausa breve, señales concretas y una comprobación independiente.</p><Link className="at-button" to="/evaluar">Evaluar una interacción <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="at-note">Una señal aislada no define una interacción. Contrastar origen, solicitud y canal ayuda a decidir mejor.</div></section>

        <section aria-labelledby="categories-title"><header className="at-section-heading"><SplitText tag="h2" id="categories-title" text="Explora por situación" /><p>Elige el contexto que quieres revisar.</p></header><div className="category-grid">{categories.map(([Icon, label]) => <a className="category-link" href="#recursos" key={label}><Icon size={20} aria-hidden="true" />{label}</a>)}</div></section>

        <section id="recursos" aria-labelledby="recent-title"><header className="at-section-heading"><SplitText tag="h2" id="recent-title" text="Guías recientes" /><Link to="/evaluar">Evaluar una interacción</Link></header><div className="article-grid"><article className="article-card"><span className="at-tag">Enlaces</span><SplitText tag="h3" text="Cómo revisar la dirección real de un sitio" /><p>Comprueba el dominio y busca un canal independiente antes de ingresar datos.</p></article><article className="article-card"><span className="at-tag">Identidad</span><SplitText tag="h3" text="Cuando una cuenta conocida hace un pedido inesperado" /><p>Una identidad visible no confirma por sí sola quién envió el mensaje.</p></article><article className="article-card"><span className="at-tag">Urgencia</span><SplitText tag="h3" text="Qué hacer cuando te piden una respuesta inmediata" /><p>Detenerte un momento puede abrir espacio para reunir mejor información.</p></article></div></section>
      </main>
    </div>
  );
}
