import {
  Archive,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  FileText,
  Files,
  LayoutList,
  MessageSquareText,
  MessagesSquare,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Tags,
  UserRound,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router";
import Nav from "../../components/navegation/nav";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import DotField from "../../components/DotField";
import "../app-sections.css";

const reports = [
  { title: "Solicitud de pago por mensajería", copy: "Ejemplo de estructura para un reporte comunitario: describe la solicitud, el canal y las evidencias disponibles sin asumir una conclusión.", channel: "Mensajería", status: "Vigente", tone: "message", Icon: MessageSquareText, StatusIcon: BadgeCheck },
  { title: "Perfil que suplanta una identidad", copy: "Ejemplo de reporte con datos pendientes de contrastar. Las experiencias relacionadas aportan contexto, no una certeza automática.", channel: "Red social", status: "En revisión", tone: "social", Icon: UsersRound, StatusIcon: Clock3 },
  { title: "Oferta con enlace externo", copy: "Ejemplo de caso archivado para mostrar cómo se conserva la fecha y el estado de vigencia de la información.", channel: "Marketplace", status: "Desactualizado", tone: "marketplace", Icon: ShoppingBag, StatusIcon: Archive },
];

export default function Foro() {
  return (
    <div className="at-page forum-page">
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <header className="forum-community-header">
          <div className="page-title-dot-field" aria-hidden="true">
            <DotField dotRadius={1.15} dotSpacing={36} cursorRadius={220} cursorForce={0.05} bulgeStrength={30} gradientFrom="#22d3ee" gradientTo="#2563eb" glowColor="#0e2235" />
          </div>
          <span className="forum-community-icon" aria-hidden="true"><MessagesSquare size={28} /></span>
          <div className="forum-community-copy">
            <SplitText tag="h1" text="Comunidad: experiencias que suman contexto." />
            <p>Busca dominios, cuentas o patrones. Los reportes aportan evidencia colectiva, pero no reemplazan una verificación independiente.</p>
          </div>

        </header>

        <div className="forum-workspace">
          <aside className="forum-sidebar" aria-label="Opciones del foro">
            <Link className="at-button forum-evaluate-link" to="/evaluar"><ShieldCheck size={18} aria-hidden="true" />Evaluar interacción <ArrowRight className="forum-evaluate-arrow" size={18} aria-hidden="true" /></Link>

            <aside className="forum-profile" aria-label="Perfil de comunidad">
              <span className="forum-profile-icon" aria-hidden="true"><UserRound size={24} /></span>
              <div>
                <span className="forum-profile-label">Perfil</span>
                <strong>Tu espacio en la comunidad</strong>
                <p>Ingresa para publicar, guardar y seguir reportes.</p>
                <Link to="/login">Ingresar</Link>
              </div>
            </aside>

            <div className="forum-sidebar-filters">
              <p><SlidersHorizontal size={16} aria-hidden="true" />Filtrar reportes</p>
              <div className="forum-filters" aria-label="Filtros de reportes">
                <button className="at-filter" type="button" aria-pressed="true"><LayoutList size={16} aria-hidden="true" />Todos</button>
                <button className="at-filter" type="button" aria-pressed="false"><MessageSquareText size={16} aria-hidden="true" />Canal</button>
                <button className="at-filter" type="button" aria-pressed="false"><Tags size={16} aria-hidden="true" />Tipo de interacción</button>
                <button className="at-filter" type="button" aria-pressed="false"><BadgeCheck size={16} aria-hidden="true" />Vigencia</button>
                <button className="at-filter" type="button" aria-pressed="false"><CalendarDays size={16} aria-hidden="true" />Fecha</button>
              </div>
            </div>
          </aside>

          <section className="forum-feed" aria-labelledby="reports-title">
            <form className="forum-search" role="search">
              <label className="at-label" htmlFor="forum-search">Busca una entidad, cuenta o patrón
                <span className="forum-search-field">
                  <Search size={18} aria-hidden="true" />
                  <input className="at-search" id="forum-search" type="search" placeholder="Ej.: dominio, nombre de cuenta o tipo de solicitud" />
                </span>
              </label>
              <button className="at-button" type="button">Buscar <ArrowRight size={18} aria-hidden="true" /></button>
            </form>

            <header className="at-section-heading forum-feed-heading">
              <div className="forum-feed-title">
                <span aria-hidden="true"><FileText size={18} /></span>
                <h2 id="reports-title">Reportes de ejemplo</h2>
              </div>
              <p>Maquetado sin datos en tiempo real.</p>
            </header>
            <div className="report-list">
              {reports.map(({ title, copy, channel, status, tone, Icon, StatusIcon }) => (
                <article className={`report-card report-card-${tone}`} key={title}>
                  <span className="report-card-icon" aria-hidden="true"><Icon size={22} /></span>
                  <div className="report-card-copy">
                    <h3>{title}</h3>
                    <p>{copy}</p>
                    <div className="report-details">
                      <span className="report-channel">{channel}</span>
                      <span><CalendarDays size={14} aria-hidden="true" />Fecha por corroborar</span>
                      <span><Files size={14} aria-hidden="true" />Fuentes disponibles</span>
                    </div>
                  </div>
                  <span className="report-status"><StatusIcon size={14} aria-hidden="true" />{status}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
