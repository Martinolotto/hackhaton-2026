import {
  ArrowRight,
  Globe2,
  Landmark,
  LockKeyhole,
  MessageSquareText,
  PhoneCall,
  QrCode,
  ShieldAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import DotField from "../../components/DotField";
import Nav from "../../components/navegation/nav";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import { preventiveGuide } from "../../content/preventive-guide";
import "../app-sections.css";
import "./educacion.css";

const sectionIcons = {
  destino: Globe2,
  contacto: MessageSquareText,
  presion: ShieldAlert,
  "acciones-sensibles": LockKeyhole,
  formato: QrCode,
  "voz-imagen": PhoneCall,
  argentina: Landmark,
};

function GuideExample({ example }) {
  return (
    <div className="education-guide-example">
      <h4>Ejemplo</h4>
      {example.lines && (
        <div className="education-url-example">
          {example.lines.map((line) => (
            <code key={line}>{line}</code>
          ))}
        </div>
      )}
      {example.quote && <blockquote>{example.quote}</blockquote>}
      {example.text && <p>{example.text}</p>}
      {example.note && <p>{example.note}</p>}
    </div>
  );
}

function ArgentinaPatterns({ patterns }) {
  if (!patterns) return null;

  return (
    <div className="education-pattern-list">
      {patterns.map((pattern) => (
        <article className="education-pattern-card" key={pattern.title}>
          <h5>{pattern.title}</h5>
          <dl>
            <div>
              <dt>Modalidad</dt>
              <dd>{pattern.modality}</dd>
            </div>
            <div>
              <dt>Organismo</dt>
              <dd>{pattern.organizations}</dd>
            </div>
            <div>
              <dt>Fuente</dt>
              <dd className="education-pattern-sources">
                {pattern.sourceIds.map((sourceId) => (
                  <a href={`#source-${sourceId}`} key={sourceId}>
                    {sourceId}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt>Ámbito</dt>
              <dd>{pattern.geography}</dd>
            </div>
            <div>
              <dt>Período y contexto</dt>
              <dd>{pattern.periodAndContext}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function GuideDetail({ section }) {
  const ActiveIcon = sectionIcons[section.id];

  return (
    <article
      className="education-guide-detail"
      aria-labelledby={`guide-${section.id}-title`}
      aria-live="polite"
    >
      <div className="education-guide-detail-heading">
        <ActiveIcon size={24} aria-hidden="true" />
        <span>{section.category}</span>
      </div>
      <h3 id={`guide-${section.id}-title`}>{section.title}</h3>

      <section className="education-detail-block">
        <h4>Qué mirar</h4>
        <ul>
          {section.whatToLookFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ArgentinaPatterns patterns={section.patterns} />
      </section>

      <section className="education-detail-block">
        <h4>Por qué importa</h4>
        <p>{section.whyItMatters}</p>
      </section>

      <section className="education-detail-block">
        <h4>Cómo comprobarlo</h4>
        <ol>
          {section.howToCheck.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ol>
      </section>

      <GuideExample example={section.example} />

      <aside className="education-guide-limit" aria-label="Límite de esta señal">
        <strong>Qué no asumir</strong>
        <p>{section.whatNotToAssume}</p>
      </aside>

      <div className="education-guide-sources">
        <strong>Fuentes</strong>
        <ul>
          {section.sourceIds.map((sourceId) => (
            <li key={sourceId}>
              <a href={`#source-${sourceId}`}>{sourceId}</a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Educacion() {
  const [guideQuery, setGuideQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(
    preventiveGuide.sections[0].id,
  );

  const visibleGuides = useMemo(() => {
    const normalizedQuery = guideQuery.trim().toLocaleLowerCase("es-AR");
    if (!normalizedQuery) return preventiveGuide.sections;

    return preventiveGuide.sections.filter((section) =>
      [
        section.title,
        section.shortTitle,
        section.category,
        section.whatToLookFor.join(" "),
        section.whyItMatters,
        section.howToCheck.join(" "),
        section.whatNotToAssume,
        section.sourceIds.join(" "),
        JSON.stringify(section.example),
        JSON.stringify(section.patterns ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase("es-AR")
        .includes(normalizedQuery),
    );
  }, [guideQuery]);

  const activeGuide =
    visibleGuides.find((guide) => guide.id === selectedGuide) ?? visibleGuides[0];

  const clearSearch = () => {
    setGuideQuery("");
    setSelectedGuide(preventiveGuide.sections[0].id);
  };

  return (
    <div className="at-page education-page">
      <a className="education-skip-link" href="#contenido-principal">
        Ir al contenido principal
      </a>
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <div className="education-workspace">
          <aside
            className="education-sidebar"
            aria-label="Navegación de aprendizaje"
          >
            <div className="education-sidebar-heading">
              <span>Aprendizaje</span>
              <strong>Contenido de esta guía</strong>
            </div>
            <nav aria-label="Contenido de aprendizaje">
              <a href="#introduccion">Introducción</a>
              <a href="#guia-preventiva">Siete habilidades</a>
              <a href="#checklist">Checklist</a>
              <a href="#fuentes">Fuentes</a>
              <a href="#evaluar-guia">Evaluar interacción</a>
            </nav>
            <div className="education-sidebar-tip">
              Una pausa también es una herramienta. Revisá una sección por vez y
              contrastá la información antes de decidir.
            </div>
          </aside>

          <div className="education-content">
            <header className="education-hero" id="introduccion">
              <div className="page-title-dot-field" aria-hidden="true">
                <DotField
                  dotRadius={1.15}
                  dotSpacing={36}
                  cursorRadius={220}
                  cursorForce={0.05}
                  bulgeStrength={30}
                  gradientFrom="#22d3ee"
                  gradientTo="#2563eb"
                  glowColor="#0e2235"
                />
              </div>
              <div className="education-hero-copy">
                <SplitText tag="h1" text={preventiveGuide.title} />
                <p>{preventiveGuide.introduction[0]}</p>
              </div>
              <div className="education-search">
                <label htmlFor="education-search">Buscá una habilidad o señal</label>
                <input
                  className="at-search"
                  id="education-search"
                  type="search"
                  placeholder="Ej.: enlace, código o urgencia"
                  value={guideQuery}
                  onChange={(event) => setGuideQuery(event.target.value)}
                  aria-describedby="education-search-help"
                />
                <span id="education-search-help">
                  La búsqueda filtra solamente esta guía.
                </span>
              </div>
            </header>

            <section
              className="education-feature"
              aria-labelledby="featured-guide"
            >
              <div>
                <div className="education-meta">
                  <span className="at-tag">Guía preventiva</span>
                  <span className="at-tag">
                    Actualizada: {preventiveGuide.editorialUpdatedAt}
                  </span>
                </div>
                <h2 id="featured-guide">Una señal no es una prueba</h2>
                <p>{preventiveGuide.introduction[1]}</p>
                <Link className="at-button" to={preventiveGuide.closing.ctaPath}>
                  {preventiveGuide.closing.ctaLabel}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <div className="at-note">
                Verificá por un canal independiente. La decisión final sigue
                siendo tuya.
              </div>
            </section>

            <section
              className="education-library"
              id="guia-preventiva"
              aria-labelledby="guide-library-title"
            >
              <header className="at-section-heading">
                <div>
                  <h2 id="guide-library-title">Siete habilidades para verificar</h2>
                  <p>
                    Elegí un tema para revisar qué mirar, cómo comprobarlo y qué
                    no permite concluir.
                  </p>
                </div>
              </header>

              <div className="education-library-layout">
                <div
                  className="education-guide-list"
                  aria-label="Temas de la guía preventiva"
                >
                  {visibleGuides.length ? (
                    visibleGuides.map((guide) => {
                      const Icon = sectionIcons[guide.id];
                      const isActive = activeGuide?.id === guide.id;

                      return (
                        <button
                          className={`education-guide-option ${isActive ? "is-active" : ""}`}
                          type="button"
                          key={guide.id}
                          aria-pressed={isActive}
                          onClick={() => setSelectedGuide(guide.id)}
                        >
                          <Icon size={19} aria-hidden="true" />
                          <span>{guide.shortTitle}</span>
                          <ArrowRight size={16} aria-hidden="true" />
                        </button>
                      );
                    })
                  ) : (
                    <div className="education-empty" role="status">
                      <p>No encontramos ese término dentro de esta guía.</p>
                      <button type="button" onClick={clearSearch}>
                        Ver los siete temas
                      </button>
                    </div>
                  )}
                </div>

                {activeGuide && <GuideDetail section={activeGuide} />}
              </div>
            </section>

            <section
              className="education-checklist"
              id="checklist"
              aria-labelledby="checklist-title"
            >
              <header className="at-section-heading">
                <div>
                  <h2 id="checklist-title">Checklist antes de actuar</h2>
                  <p>Usalo como una pausa para decidir, no como un detector.</p>
                </div>
              </header>
              <ol className="education-checklist-grid">
                {preventiveGuide.checklist.map((item, index) => (
                  <li key={item.question}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{item.question}</h3>
                      <p>{item.prompt}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="education-checklist-closing">
                {preventiveGuide.checklistClosing}
              </p>
            </section>

            <section
              className="education-sources"
              id="fuentes"
              aria-labelledby="sources-title"
            >
              <header className="at-section-heading">
                <div>
                  <h2 id="sources-title">{preventiveGuide.about.title}</h2>
                  {preventiveGuide.about.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <p>
                    <strong>Última actualización editorial:</strong>{" "}
                    {preventiveGuide.editorialUpdatedAt}.
                  </p>
                </div>
              </header>

              <div className="education-source-list">
                {preventiveGuide.sources.map((source) => (
                  <article id={`source-${source.id}`} key={source.id}>
                    <span>{source.id}</span>
                    <h3>{source.organization}</h3>
                    <p>{source.title}</p>
                    {source.date && <small>{source.date}</small>}
                    <ul>
                      {source.urls.map((url, index) => (
                        <li key={url}>
                          <a href={url}>
                            {source.organization}: {source.title}
                            {source.urls.length > 1 ? ` — recurso ${index + 1}` : ""}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section
              className="education-closing"
              id="evaluar-guia"
              aria-labelledby="education-closing-title"
            >
              <div>
                <h2 id="education-closing-title">{preventiveGuide.closing.title}</h2>
                <p>{preventiveGuide.closing.body}</p>
                <p>{preventiveGuide.closing.prompt}</p>
                <small>{preventiveGuide.closing.note}</small>
              </div>
              <Link className="at-button" to={preventiveGuide.closing.ctaPath}>
                {preventiveGuide.closing.ctaLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
