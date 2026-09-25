import { ArrowRight, Search, UserRound } from "lucide-react";
import { Link } from "react-router";
import Nav from "../../components/navegation/nav";
import "../app-sections.css";

const reports = [
  ["Solicitud de pago por mensajería", "Ejemplo de estructura para un reporte comunitario: describe la solicitud, el canal y las evidencias disponibles sin asumir una conclusión.", "Mensajería", "Vigente"],
  ["Perfil que suplanta una identidad", "Ejemplo de reporte con datos pendientes de contrastar. Las experiencias relacionadas aportan contexto, no una certeza automática.", "Red social", "En revisión"],
  ["Oferta con enlace externo", "Ejemplo de caso archivado para mostrar cómo se conserva la fecha y el estado de vigencia de la información.", "Marketplace", "Desactualizado"],
];

export default function Foro() {
  return (
    <div className="at-page">
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <header className="at-intro forum-intro">
          <div>
            <h1>Comunidad: experiencias que suman contexto.</h1>
            <p>Busca dominios, cuentas o patrones. Los reportes aportan evidencia colectiva, pero no reemplazan una verificación independiente.</p>
          </div>
          <div className="forum-intro-actions">
            <Link className="at-button" to="/analizar-datos">Analizar interacción <ArrowRight size={18} aria-hidden="true" /></Link>
            <aside className="forum-profile" aria-label="Perfil de comunidad">
              <span className="forum-profile-icon" aria-hidden="true"><UserRound size={24} /></span>
              <div>
                <span className="forum-profile-label">Perfil</span>
                <strong>Tu espacio en la comunidad</strong>
                <p>Ingresa para publicar, guardar y seguir reportes.</p>
                <Link to="/login">Ingresar</Link>
              </div>
            </aside>
          </div>
        </header>

        <form className="forum-search" role="search"><label className="at-label" htmlFor="forum-search">Busca una entidad, cuenta o patrón<input className="at-search" id="forum-search" type="search" placeholder="Ej.: dominio, nombre de cuenta o tipo de solicitud" /></label><button className="at-button" type="button"><Search size={18} aria-hidden="true" />Buscar</button></form>
        <div className="forum-filters" aria-label="Filtros de reportes"><button className="at-filter" type="button" aria-pressed="true">Todos</button><button className="at-filter" type="button" aria-pressed="false">Canal</button><button className="at-filter" type="button" aria-pressed="false">Tipo de interacción</button><button className="at-filter" type="button" aria-pressed="false">Vigencia</button><button className="at-filter" type="button" aria-pressed="false">Fecha</button></div>

        <div className="forum-layout"><section aria-labelledby="reports-title"><header className="at-section-heading"><h2 id="reports-title">Reportes de ejemplo</h2><p>Maquetado sin datos en tiempo real.</p></header><div className="report-list">{reports.map(([title, copy, channel, status]) => <article className="report-card" key={title}><div><h3>{title}</h3><p>{copy}</p><div className="report-details"><span>{channel}</span><span>·</span><span>Fecha por corroborar</span><span>·</span><span>Fuentes disponibles</span></div></div><span className="report-status">{status}</span></article>)}</div></section><aside className="signal-panel" aria-labelledby="signal-title"><h2 id="signal-title">Red de señales</h2><p>Representación decorativa de cómo se agrupan fuentes, reportes y patrones. No representa actividad en vivo.</p><span className="signal-line signal-line-one" /><span className="signal-line signal-line-two" /><span className="signal-node signal-node-one" /><span className="signal-node signal-node-two" /><span className="signal-node signal-node-three" /><span className="signal-node signal-node-four" /></aside></div>
      </main>
    </div>
  );
}
