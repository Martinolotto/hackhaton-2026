import { ArrowRight, BriefcaseBusiness, Globe2, HeartHandshake, Landmark, Mail, MessageSquareText, PhoneCall, QrCode, ShieldAlert, ShoppingBag, Smartphone, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import Nav from "../../components/navegation/nav";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import DotField from "../../components/DotField";
import "../app-sections.css";

const guideGroups = {
  types: [
    { key: "phishing", label: "Phishing", icon: Mail, summary: "Mensajes o sitios que imitan a una organización para obtener tus datos.", signs: ["El enlace no coincide con el dominio oficial.", "Te pide iniciar sesión, entregar un código o actuar con urgencia."], action: "Abrí el sitio desde la app o dirección oficial, no desde el enlace recibido." },
    { key: "impersonation", label: "Suplantación", icon: ShieldAlert, summary: "Alguien se presenta como un banco, organismo, soporte, familiar o cuenta conocida.", signs: ["La identidad parece familiar, pero cambia el canal o hace un pedido inusual.", "Evita que confirmes la solicitud por otra vía."], action: "Cortá la conversación y contactá a la persona u organización por un canal independiente." },
    { key: "marketplace", label: "Marketplace", icon: ShoppingBag, summary: "Compradores, vendedores o comprobantes falsos en plataformas de comercio.", signs: ["El precio o la presión para cerrar no coincide con la operación.", "Piden transferir por fuera de la plataforma o muestran un comprobante difícil de verificar."], action: "Confirmá el pago dentro de la plataforma y no entregues el producto por una captura." },
    { key: "romance", label: "Romance", icon: HeartHandshake, summary: "Una relación construida online se convierte en una solicitud de dinero o datos.", signs: ["La persona evita encuentros o verificaciones y acelera la confianza.", "Aparece una emergencia, inversión o pedido de ayuda económica."], action: "No envíes dinero ni documentos por una relación que no podés verificar." },
    { key: "employment", label: "Falsa oferta laboral", icon: BriefcaseBusiness, summary: "Propuestas de trabajo que buscan cobrarte, obtener datos o instalar software.", signs: ["Te piden pagar para ingresar, comprar materiales o liberar una ganancia.", "El contacto no tiene una identidad laboral verificable."], action: "Verificá la empresa en su sitio oficial y nunca pagues para acceder a un empleo." },
    { key: "investment", label: "Inversión falsa", icon: TrendingUp, summary: "Promesas de ganancias rápidas mediante inversiones, trading o criptomonedas.", signs: ["Garantizan rentabilidad o te muestran ganancias sin explicar el riesgo.", "Te presionan para depositar más o pagar una comisión para retirar."], action: "No transfieras hasta comprobar la entidad, la regulación y las condiciones de retiro." },
  ],
  media: [
    { key: "messaging", label: "Mensajería", icon: MessageSquareText, summary: "WhatsApp, Telegram, Messenger, Discord y mensajes privados.", signs: ["El pedido llega desde una cuenta conocida, pero el comportamiento cambió.", "La conversación busca aislarte o impedir que consultes a alguien."], action: "Verificá por una llamada o canal alternativo antes de responder." },
    { key: "sms", label: "SMS", icon: Smartphone, summary: "Alertas falsas de bancos, paquetes, multas, premios o códigos.", signs: ["El mensaje contiene un enlace acortado o una urgencia inesperada.", "Solicita datos, códigos o pagos para resolver un supuesto problema."], action: "No abras el enlace: buscá el número oficial y consultá desde la app." },
    { key: "calls", label: "Llamadas", icon: PhoneCall, summary: "Supuesto banco, soporte técnico, organismo público, familiar o empresa.", signs: ["Usan autoridad, miedo o urgencia para impedir que pienses.", "Piden códigos, transferencias o instalar una herramienta remota."], action: "Colgá y devolvé la llamada al número oficial o conocido." },
    { key: "email", label: "Correo", icon: Mail, summary: "Phishing, facturas, premios, alertas de seguridad y adjuntos falsos.", signs: ["El remitente, dominio o archivo no coincide con el contexto.", "El mensaje insiste en abrir un documento o ingresar credenciales."], action: "No respondas ni abras adjuntos; verificá el remitente desde otra fuente." },
    { key: "web", label: "Sitios y anuncios", icon: Globe2, summary: "Páginas clonadas de bancos, billeteras, organismos o comercios.", signs: ["La dirección tiene errores, redirecciones o un dominio inesperado.", "La página solicita más datos de los necesarios para la acción."], action: "Escribí la dirección manualmente o usá un favorito confiable." },
    { key: "qr", label: "Códigos QR", icon: QrCode, summary: "QR físicos o digitales que redirigen a páginas o pagos fraudulentos.", signs: ["El QR reemplaza otro código o aparece sin contexto.", "La página de destino pide iniciar sesión o pagar de inmediato."], action: "Previsualizá el destino y confirmá la dirección antes de continuar." },
    { key: "apps", label: "Apps y software", icon: Landmark, summary: "APK, extensiones, actualizaciones o programas de acceso remoto falsos.", signs: ["La instalación llega fuera de la tienda oficial o con permisos excesivos.", "Promete resolver una urgencia o recuperar una cuenta."], action: "Instalá solo desde fuentes oficiales y revisá permisos antes de aceptar." },
  ],
};

export default function Educacion() {
  const [guideMode, setGuideMode] = useState("types");
  const [guideQuery, setGuideQuery] = useState("");
  const [selectedGuide, setSelectedGuide] = useState("phishing");
  const guides = guideGroups[guideMode];
  const visibleGuides = useMemo(() => {
    const normalizedQuery = guideQuery.trim().toLocaleLowerCase();
    if (!normalizedQuery) return guides;
    return guides.filter((guide) => `${guide.label} ${guide.summary} ${guide.signs.join(" ")}`.toLocaleLowerCase().includes(normalizedQuery));
  }, [guideQuery, guides]);
  const activeGuide = visibleGuides.find((guide) => guide.key === selectedGuide) ?? visibleGuides[0];
  const ActiveIcon = activeGuide?.icon;

  return (
    <div className="at-page education-page">
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <div className="education-workspace">
          <aside className="education-sidebar" aria-label="Navegación de aprendizaje">
            <div className="education-sidebar-heading">
              <span>Aprendizaje</span>
              <strong>Contenido de esta guía</strong>
            </div>
            <nav aria-label="Contenido de aprendizaje">
              <a href="#featured-guide" aria-current="page">Guía destacada</a>
              <a href="#guide-library">Tipos y medios</a>
              <a href="#recursos">Guías recientes</a>
            </nav>
            <div className="education-sidebar-tip">
              Una pausa también es una herramienta. Revisa una sección por vez y contrasta la información antes de decidir.
            </div>
          </aside>

          <div className="education-content">
            <header className="education-hero">
              <div className="page-title-dot-field" aria-hidden="true">
                <DotField dotRadius={1.15} dotSpacing={36} cursorRadius={220} cursorForce={0.05} bulgeStrength={30} gradientFrom="#22d3ee" gradientTo="#2563eb" glowColor="#0e2235" />
              </div>
              <div className="education-hero-copy"><SplitText tag="h1" text="Aprende a verificar antes de confiar." /><p>Guías claras para reconocer presión, contrastar información y decidir con más contexto.</p></div><div className="education-search"><label htmlFor="education-search">Busca una guía o una señal</label><input className="at-search" id="education-search" type="search" placeholder="Ej.: phishing, QR o urgencia" value={guideQuery} onChange={(event) => setGuideQuery(event.target.value)} /></div>
            </header>

            <section className="education-feature" aria-labelledby="featured-guide"><div><div className="education-meta"><span className="at-tag">Guía destacada</span><span className="at-tag">6 min de lectura</span></div><h2 id="featured-guide">Qué observar cuando un mensaje te pide actuar rápido.</h2><p>La urgencia puede limitar el tiempo para verificar. Esta guía propone una pausa breve, señales concretas y una comprobación independiente.</p><Link className="at-button" to="/evaluar">Evaluar una interacción <ArrowRight size={18} aria-hidden="true" /></Link></div><div className="at-note">Una señal aislada no define una interacción. Contrastar origen, solicitud y canal ayuda a decidir mejor.</div></section>

            <section className="education-library" id="guide-library" aria-labelledby="guide-library-title">
              <header className="at-section-heading"><div><h2 id="guide-library-title">Tipos de estafa y medios comunes</h2><p>Seleccioná un tema para revisar sus señales y la respuesta más segura.</p></div></header>
              <div className="education-tabs" role="tablist" aria-label="Categorías de aprendizaje">
                <button className={guideMode === "types" ? "is-active" : ""} type="button" role="tab" aria-selected={guideMode === "types"} onClick={() => { setGuideMode("types"); setSelectedGuide("phishing"); }}>Tipos de estafa</button>
                <button className={guideMode === "media" ? "is-active" : ""} type="button" role="tab" aria-selected={guideMode === "media"} onClick={() => { setGuideMode("media"); setSelectedGuide("messaging"); }}>Medios comunes</button>
              </div>
              <div className="education-library-layout">
                <div className="education-guide-list" role="tabpanel" aria-label={guideMode === "types" ? "Tipos de estafa" : "Medios comunes"}>
                  {visibleGuides.length ? visibleGuides.map((guide) => {
                    const Icon = guide.icon;
                    return <button className={`education-guide-option ${activeGuide?.key === guide.key ? "is-active" : ""}`} type="button" key={guide.key} onClick={() => setSelectedGuide(guide.key)}><Icon size={19} aria-hidden="true" /><span>{guide.label}</span><ArrowRight size={16} aria-hidden="true" /></button>;
                  }) : <p className="education-empty">No encontramos una guía con esa búsqueda.</p>}
                </div>
                {activeGuide && <article className="education-guide-detail" aria-live="polite"><div className="education-guide-detail-heading"><ActiveIcon size={24} aria-hidden="true" /><span>{guideMode === "types" ? "Modalidad" : "Medio de contacto"}</span></div><h3>{activeGuide.label}</h3><p>{activeGuide.summary}</p><h4>Qué observar</h4><ul>{activeGuide.signs.map((sign) => <li key={sign}>{sign}</li>)}</ul><div className="education-guide-action"><strong>Próximo paso</strong><p>{activeGuide.action}</p></div><Link className="at-text-link" to="/evaluar">Evaluar una interacción <ArrowRight size={16} aria-hidden="true" /></Link></article>}
              </div>
            </section>

            <section id="recursos" aria-labelledby="recent-title"><header className="at-section-heading"><h2 id="recent-title">Guías recientes</h2><Link to="/evaluar">Evaluar una interacción</Link></header><div className="article-grid"><article className="article-card"><span className="at-tag">Enlaces</span><h3>Cómo revisar la dirección real de un sitio</h3><p>Comprueba el dominio y busca un canal independiente antes de ingresar datos.</p></article><article className="article-card"><span className="at-tag">Identidad</span><h3>Cuando una cuenta conocida hace un pedido inesperado</h3><p>Una identidad visible no confirma por sí sola quién envió el mensaje.</p></article><article className="article-card"><span className="at-tag">Urgencia</span><h3>Qué hacer cuando te piden una respuesta inmediata</h3><p>Detenerte un momento puede abrir espacio para reunir mejor información.</p></article></div></section>
          </div>
        </div>
      </main>
    </div>
  );
}
