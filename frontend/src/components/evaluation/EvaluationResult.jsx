import {
  AlertCircle,
  CheckCircle2,
  CircleHelp,
  Eye,
  GraduationCap,
  ListChecks,
  Scale,
  ShieldAlert,
} from "lucide-react";

const RISK_LABELS = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
  undetermined: "No determinable",
};

const UNCERTAINTY_LABELS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const BASIS_LABELS = {
  user_provided: "Aportado por ti",
  inferred: "Interpretación",
};

const EVIDENCE_META = {
  user_input: "Dato aportado",
  reported_verification_result: "Resultado informado",
  supports_legitimacy: "Apoya legitimidad aparente",
  raises_concern: "Aumenta la cautela",
  neutral: "Efecto neutral",
  not_independently_verified: "Sin verificación independiente",
  user_reported: "Reportado por la persona",
};

function EmptyList() {
  return <p className="evaluation-empty">No se identificaron elementos en esta sección.</p>;
}

function StatementList({ items }) {
  if (!items.length) return <EmptyList />;

  return (
    <ul className="evaluation-statement-list">
      {items.map((item, index) => (
        <li key={`${item.statement}-${index}`}>
          <p>{item.statement}</p>
          <span>{BASIS_LABELS[item.basis]}</span>
          <small>
            {item.basis === "inferred"
              ? "Interpretación contextual, no evidencia concluyente."
              : "Información declarada, no verificada automáticamente."}
          </small>
        </li>
      ))}
    </ul>
  );
}

function TextList({ items }) {
  if (!items.length) return <EmptyList />;

  return (
    <ul className="evaluation-text-list">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

export default function EvaluationResult({ evaluation, title = "Evaluación inicial" }) {
  return (
    <article className="evaluation-result" aria-labelledby={`evaluation-result-${evaluation.phase}`}>
      <header className="evaluation-result-header">
        <div>
          <p className="evaluation-eyebrow">
            {evaluation.phase === "reevaluated" ? "Después de verificar" : "Lectura inicial"}
          </p>
          <h2 id={`evaluation-result-${evaluation.phase}`}>{title}</h2>
        </div>
        <span className="evaluation-phase-badge">
          {evaluation.phase === "reevaluated" ? "Reevaluación final" : "Resultado inicial"}
        </span>
      </header>

      <section className="evaluation-summary" aria-labelledby={`${evaluation.phase}-summary`}>
        <Eye aria-hidden="true" size={22} />
        <div>
          <h3 id={`${evaluation.phase}-summary`}>Síntesis</h3>
          <p>{evaluation.summary}</p>
        </div>
      </section>

      <div className="evaluation-dimensions" aria-label="Riesgo e incertidumbre">
        <section className={`evaluation-dimension risk-${evaluation.risk.level}`}>
          <p>Riesgo estimado</p>
          <strong>{RISK_LABELS[evaluation.risk.level]}</strong>
          <span>{evaluation.risk.explanation}</span>
        </section>
        <section className={`evaluation-dimension uncertainty-${evaluation.uncertainty.level}`}>
          <p>Incertidumbre del análisis</p>
          <strong>{UNCERTAINTY_LABELS[evaluation.uncertainty.level]}</strong>
          <span>{evaluation.uncertainty.explanation}</span>
        </section>
      </div>

      <p className="evaluation-dimensions-note">
        Riesgo e incertidumbre son dimensiones distintas. Riesgo bajo no significa
        “seguro” y una incertidumbre alta indica que todavía falta contexto.
      </p>

      <div className="evaluation-section-grid">
        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-indicators`}>
          <header>
            <ShieldAlert aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-indicators`}>Indicadores</h3>
          </header>
          <p className="evaluation-section-intro">Señales contextuales; ninguna prueba algo por sí sola.</p>
          <StatementList items={evaluation.indicators} />
        </section>

        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-legitimacy`}>
          <header>
            <CheckCircle2 aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-legitimacy`}>Legitimidad aparente</h3>
          </header>
          <p className="evaluation-section-intro">Elementos plausibles que no certifican autenticidad.</p>
          <StatementList items={evaluation.apparentLegitimacy} />
        </section>
      </div>

      <section className="evaluation-section-card evaluation-wide-card" aria-labelledby={`${evaluation.phase}-evidence`}>
        <header>
          <Scale aria-hidden="true" size={20} />
          <h3 id={`${evaluation.phase}-evidence`}>Evidencia disponible</h3>
        </header>
        {evaluation.evidence.length ? (
          <ul className="evaluation-evidence-list">
            {evaluation.evidence.map((item, index) => (
              <li key={`${item.statement}-${index}`}>
                <p>{item.statement}</p>
                <div>
                  <span>{EVIDENCE_META[item.origin]}</span>
                  <span>{EVIDENCE_META[item.effect]}</span>
                  <span>{EVIDENCE_META[item.verificationStatus]}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </section>

      <div className="evaluation-section-grid">
        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-contradictions`}>
          <header>
            <AlertCircle aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-contradictions`}>Contradicciones</h3>
          </header>
          <TextList items={evaluation.contradictions} />
        </section>

        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-missing`}>
          <header>
            <CircleHelp aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-missing`}>Información faltante</h3>
          </header>
          <TextList items={evaluation.missingInformation} />
        </section>
      </div>

      <section className="evaluation-section-card evaluation-wide-card" aria-labelledby={`${evaluation.phase}-steps`}>
        <header>
          <ListChecks aria-hidden="true" size={20} />
          <h3 id={`${evaluation.phase}-steps`}>Verificaciones recomendadas</h3>
        </header>
        <ol className="evaluation-verification-list">
          {[...evaluation.verificationSteps]
            .sort((a, b) => a.priority - b.priority)
            .map((step) => (
              <li key={`${step.priority}-${step.action}`}>
                <span>{step.priority}</span>
                <div>
                  <strong>{step.action}</strong>
                  <p>{step.reason}</p>
                </div>
              </li>
            ))}
        </ol>
      </section>

      <div className="evaluation-section-grid">
        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-caution`}>
          <header>
            <ShieldAlert aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-caution`}>Orientación de cautela</h3>
          </header>
          <TextList items={evaluation.cautionGuidance} />
        </section>

        <section className="evaluation-section-card" aria-labelledby={`${evaluation.phase}-learning`}>
          <header>
            <GraduationCap aria-hidden="true" size={20} />
            <h3 id={`${evaluation.phase}-learning`}>Aprendizaje</h3>
          </header>
          <p className="evaluation-learning">{evaluation.learning}</p>
        </section>
      </div>

      <section className="evaluation-limitations" aria-labelledby={`${evaluation.phase}-limitations`}>
        <h3 id={`${evaluation.phase}-limitations`}>Limitaciones</h3>
        <TextList items={evaluation.limitations} />
        <p>
          Esta evaluación no certifica seguridad ni legitimidad. La decisión final sigue
          siendo tuya.
        </p>
      </section>
    </article>
  );
}
