import { useMemo, useRef, useState } from "react";
import { AlertTriangle, ArrowLeft, RotateCcw, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "react-router";
import Nav from "../../components/navegation/nav";
import EvaluationForm from "../../components/evaluation/EvaluationForm";
import EvaluationResult from "../../components/evaluation/EvaluationResult";
import VerificationForm from "../../components/evaluation/VerificationForm";
import { createEvaluation, EvaluationApiError, isEvaluationResponse } from "../../lib/evaluationsApi";
import { supabase } from "../../lib/supabase";
import "../app-sections.css";
import "./evaluation.css";

const COMPARABLE_SECTIONS = [
  ["summary", "Síntesis"],
  ["indicators", "Indicadores"],
  ["apparentLegitimacy", "Legitimidad aparente"],
  ["evidence", "Evidencia"],
  ["contradictions", "Contradicciones"],
  ["missingInformation", "Información faltante"],
  ["risk", "Riesgo"],
  ["uncertainty", "Incertidumbre"],
  ["verificationSteps", "Verificaciones sugeridas"],
  ["cautionGuidance", "Orientación de cautela"],
  ["learning", "Aprendizaje"],
  ["limitations", "Limitaciones"],
];

const INTERACTION_LABELS = {
  description: "Interacción descrita",
  url: "URL aportada",
  channel: "Canal",
  presentedIdentity: "Identidad presentada",
  observableOrigin: "Origen observable",
  priorRelationship: "Relación previa",
  requestedAction: "Acción solicitada",
  doubtReason: "Motivo de la duda",
};

function areEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function buildComparison(initialEvaluation, reevaluation) {
  if (!initialEvaluation || !reevaluation) return null;

  const changed = [];
  const remained = [];

  COMPARABLE_SECTIONS.forEach(([key, label]) => {
    (areEqual(initialEvaluation[key], reevaluation[key]) ? remained : changed).push(label);
  });

  return { changed, remained };
}

function InteractionRecap({ interaction }) {
  return (
    <details className="evaluation-recap">
      <summary>Ver interacción analizada</summary>
      <dl>
        {Object.entries(INTERACTION_LABELS).map(([key, label]) => (
          <div key={key}>
            <dt>{label}</dt>
            <dd>{interaction[key] || "No informado / desconocido"}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function EvaluationComparison({ initialEvaluation, reevaluation }) {
  const comparison = useMemo(
    () => buildComparison(initialEvaluation, reevaluation),
    [initialEvaluation, reevaluation],
  );

  return (
    <section className="evaluation-comparison" aria-labelledby="comparison-title">
      <header>
        <p className="evaluation-eyebrow">Inicial vs. reevaluación</p>
        <h2 id="comparison-title">Qué aportó la comprobación</h2>
        <p>La comparación se calcula en este navegador y no se guarda.</p>
      </header>

      <div className="comparison-grid">
        <section>
          <h3>Qué cambió</h3>
          <p>{comparison.changed.length ? comparison.changed.join(", ") : "No hubo cambios visibles entre las secciones."}</p>
        </section>
        <section>
          <h3>Qué permaneció</h3>
          <p>{comparison.remained.length ? comparison.remained.join(", ") : "Todas las secciones tuvieron algún cambio."}</p>
        </section>
        <section>
          <h3>Incertidumbre que sigue</h3>
          <strong>{reevaluation.uncertainty.level === "low" ? "Baja" : reevaluation.uncertainty.level === "medium" ? "Media" : "Alta"}</strong>
          <p>{reevaluation.uncertainty.explanation}</p>
        </section>
        <section>
          <h3>Información faltante que continúa</h3>
          {reevaluation.missingInformation.length ? (
            <ul>
              {reevaluation.missingInformation.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ) : (
            <p>La reevaluación no informa datos faltantes adicionales.</p>
          )}
        </section>
      </div>
    </section>
  );
}

export default function EvaluationInterface() {
  const [status, setStatus] = useState("editing");
  const [interaction, setInteraction] = useState(null);
  const [initialEvaluation, setInitialEvaluation] = useState(null);
  const [reevaluation, setReevaluation] = useState(null);
  const [requestError, setRequestError] = useState(null);
  const resultRef = useRef(null);
  const location = useLocation();
  const fixtureMode = import.meta.env.DEV && new URLSearchParams(location.search).get("fixture") === "1";
  const isSubmitting = status === "submitting_initial" || status === "submitting_reevaluation";
  const activeEvaluation = reevaluation ?? initialEvaluation;

  const obtainAccessToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session?.access_token) {
      throw new EvaluationApiError(
        "No encontramos una sesión vigente. Inicia sesión nuevamente para continuar.",
        { status: 401, code: "UNAUTHORIZED" },
      );
    }
    return data.session.access_token;
  };

  const requestEvaluation = async (nextInteraction, verificationResult) => {
    const accessToken = await obtainAccessToken();
    const request = { interaction: nextInteraction, verificationResult };

    if (fixtureMode) {
      const { getDevelopmentEvaluationFixture } = await import("../../mocks/evaluation.fixture");
      const fixture = await getDevelopmentEvaluationFixture(request);
      if (!isEvaluationResponse(fixture)) {
        throw new EvaluationApiError("El fixture de desarrollo no respeta el contrato.", {
          status: 503,
          code: "EVALUATION_UNAVAILABLE",
        });
      }
      return fixture;
    }

    return createEvaluation({ ...request, accessToken });
  };

  const focusResult = () => {
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  const handleInitialSubmit = async (nextInteraction) => {
    setStatus("submitting_initial");
    setRequestError(null);

    try {
      const result = await requestEvaluation(nextInteraction, null);
      if (result.phase !== "initial") {
        throw new EvaluationApiError("La API no devolvió una evaluación inicial válida.", {
          status: 503,
          code: "EVALUATION_UNAVAILABLE",
        });
      }
      setInteraction(nextInteraction);
      setInitialEvaluation(result);
      setStatus("evaluated_initial");
      focusResult();
    } catch (error) {
      setRequestError(
        error instanceof EvaluationApiError
          ? error
          : new EvaluationApiError("No pudimos completar la evaluación. Intenta nuevamente."),
      );
      setStatus("editing");
    }
  };

  const handleReevaluationSubmit = async (verificationResult) => {
    if (!interaction || reevaluation || status === "submitting_reevaluation") return;

    setStatus("submitting_reevaluation");
    setRequestError(null);

    try {
      const result = await requestEvaluation(interaction, verificationResult);
      if (result.phase !== "reevaluated") {
        throw new EvaluationApiError("La API no devolvió una reevaluación válida.", {
          status: 503,
          code: "EVALUATION_UNAVAILABLE",
        });
      }
      setReevaluation(result);
      setStatus("evaluated_final");
      focusResult();
    } catch (error) {
      setRequestError(
        error instanceof EvaluationApiError
          ? error
          : new EvaluationApiError("No pudimos completar la reevaluación. Intenta nuevamente."),
      );
      setStatus("evaluated_initial");
    }
  };

  const startNewJourney = () => {
    setStatus("editing");
    setInteraction(null);
    setInitialEvaluation(null);
    setReevaluation(null);
    setRequestError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="at-page evaluation-page">
      <a className="evaluation-skip-link" href="#contenido-evaluacion">Ir al contenido principal</a>
      <Nav />
      <main className="at-main" id="contenido-evaluacion" tabIndex="-1">
        <header className="at-intro evaluation-intro">
          <div>
            <p className="evaluation-eyebrow">Evaluación guiada</p>
            <h1>Analiza una interacción antes de actuar.</h1>
            <p>
              Ordena lo que observaste, distingue señales de evidencia y encuentra una
              verificación independiente. La decisión final siempre es tuya.
            </p>
          </div>
          <span className="at-status">
            {status === "editing" || status === "submitting_initial"
              ? "Ingreso"
              : status === "evaluated_final"
                ? "Recorrido completo"
                : "Resultado y verificación"}
          </span>
        </header>

        {fixtureMode && (
          <div className="evaluation-fixture-banner" role="status">
            Modo fixture local activo. No se enviarán datos a la API.
          </div>
        )}

        {requestError && (
          <section className="evaluation-error" role="alert" aria-labelledby="evaluation-error-title">
            <AlertTriangle aria-hidden="true" size={22} />
            <div>
              <h2 id="evaluation-error-title">No pudimos completar la solicitud</h2>
              <p>{requestError.message}</p>
              {requestError.status === 401 && (
                <Link to="/login" state={{ from: location }}>Volver a iniciar sesión</Link>
              )}
            </div>
          </section>
        )}

        {!initialEvaluation ? (
          <div className="analysis-layout">
            <section className="at-panel" aria-labelledby="evaluation-form-title">
              <header className="at-panel-header">
                <h2 id="evaluation-form-title">Cuéntanos qué sucedió</h2>
                <p>Incluye solo el contexto necesario. Los datos se usarán para esta evaluación.</p>
              </header>
              <div className="at-panel-body">
                <EvaluationForm onSubmit={handleInitialSubmit} disabled={isSubmitting} />
              </div>
            </section>

            <aside className="analysis-aside">
              <section className="at-panel" aria-labelledby="journey-title">
                <header className="at-panel-header"><h2 id="journey-title">Tu recorrido</h2></header>
                <div className="at-panel-body">
                  <ol className="analysis-step-list">
                    <li className="is-active"><span>1</span><div><strong>Describe</strong><small>Interacción y contexto</small></div></li>
                    <li><span>2</span><div><strong>Comprende</strong><small>Riesgo e incertidumbre</small></div></li>
                    <li><span>3</span><div><strong>Verifica</strong><small>Una comprobación independiente</small></div></li>
                    <li><span>4</span><div><strong>Reevalúa</strong><small>Compara una sola vez</small></div></li>
                  </ol>
                </div>
              </section>
              <div className="at-note">
                <ShieldCheck aria-hidden="true" size={20} />
                <p>Una señal aislada no define una interacción. El resultado explica evidencia, contradicciones, faltantes y límites.</p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="evaluation-results-flow" ref={resultRef} tabIndex="-1">
            <InteractionRecap interaction={interaction} />

            {reevaluation && (
              <EvaluationComparison
                initialEvaluation={initialEvaluation}
                reevaluation={reevaluation}
              />
            )}

            <EvaluationResult
              evaluation={activeEvaluation}
              title={reevaluation ? "Evaluación actualizada" : "Evaluación inicial"}
            />

            {!reevaluation && (
              <VerificationForm
                verificationSteps={initialEvaluation.verificationSteps}
                onSubmit={handleReevaluationSubmit}
                disabled={status === "submitting_reevaluation"}
              />
            )}

            {reevaluation && (
              <section className="evaluation-complete" aria-labelledby="evaluation-complete-title">
                <ShieldCheck aria-hidden="true" size={24} />
                <div>
                  <h2 id="evaluation-complete-title">Reevaluación completada</h2>
                  <p>
                    Ya utilizaste la única reevaluación disponible en este recorrido. Puedes
                    revisar la comparación o iniciar un caso nuevo.
                  </p>
                </div>
                <button className="at-button at-button-secondary" type="button" onClick={startNewJourney}>
                  <RotateCcw aria-hidden="true" size={18} /> Nuevo recorrido
                </button>
              </section>
            )}

            {!reevaluation && (
              <button className="evaluation-back-button" type="button" onClick={startNewJourney}>
                <ArrowLeft aria-hidden="true" size={17} /> Descartar y empezar de nuevo
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
