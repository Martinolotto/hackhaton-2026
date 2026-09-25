import { FileText, Image, Link2, ShieldCheck } from "lucide-react";
import Nav from "../../components/navegation/nav";
import SplitText from "../../components/react-bits/textAparicionAnimations/SplitText";
import "../app-sections.css";

export default function Analizador() {
  return (
    <div className="at-page analysis-page">
      <Nav />
      <main className="at-main" id="contenido-principal" tabIndex="-1">
        <header className="at-intro">
          <div>
            <SplitText tag="h1" text="Analiza una interacción antes de actuar." />
            <p>Comparte una URL, un mensaje o una captura. Ordenaremos el contexto para ayudarte a revisar señales y decidir el siguiente paso.</p>
          </div>
          <span className="at-status">Paso 1 de 4</span>
        </header>

        <div className="analysis-layout">
          <section className="at-panel" aria-labelledby="analysis-step-title">
            <header className="at-panel-header">
              <SplitText tag="h2" id="analysis-step-title" text="¿Qué quieres revisar?" />
              <p>Elige el tipo de información que tienes disponible.</p>
            </header>
            <form className="at-panel-body analysis-form">
              <div className="analysis-options" role="group" aria-label="Tipo de entrada">
                <button className="at-choice" type="button" aria-pressed="true"><Link2 size={20} aria-hidden="true" /><strong>URL</strong><span>Un sitio o enlace que recibiste.</span></button>
                <button className="at-choice" type="button" aria-pressed="false"><FileText size={20} aria-hidden="true" /><strong>Mensaje</strong><span>Texto de un chat, correo o publicación.</span></button>
                <button className="at-choice" type="button" aria-pressed="false"><Image size={20} aria-hidden="true" /><strong>Captura</strong><span>Una imagen de la interacción.</span></button>
              </div>
              <label className="at-label" htmlFor="analysis-url">Pega el enlace que deseas revisar
                <input className="at-input" id="analysis-url" name="url" type="url" placeholder="https://ejemplo.com" />
              </label>
              <p className="at-help">No abriremos el enlace automáticamente. Revisa que no incluya datos personales innecesarios.</p>
              <div className="analysis-actions">
                <button className="at-button at-button-secondary" type="button">Guardar para después</button>
                <button className="at-button" type="button">Continuar</button>
              </div>
            </form>
          </section>

          <aside className="analysis-aside">
            <section className="at-panel" aria-labelledby="steps-title"><header className="at-panel-header"><SplitText tag="h2" id="steps-title" text="Tu recorrido" /></header><div className="at-panel-body"><ol className="analysis-step-list"><li><span>1</span><span>Tipo de entrada</span></li><li><span>2</span><span>Contenido</span></li><li><span>3</span><span>Contexto</span></li><li><span>4</span><span>Revisión</span></li></ol></div></section>
            <div className="at-note"><ShieldCheck size={20} aria-hidden="true" /><br />El resultado explica evidencia, contradicciones y límites. No emite una certeza absoluta.</div>
          </aside>
        </div>
      </main>
    </div>
  );
}
