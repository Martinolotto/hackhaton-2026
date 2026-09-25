import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function VerificationForm({ verificationSteps, onSubmit, disabled = false }) {
  const [verificationPerformed, setVerificationPerformed] = useState("");
  const [observedResult, setObservedResult] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedVerification = verificationPerformed.trim();
    const normalizedResult = observedResult.trim();

    if (!normalizedVerification || !normalizedResult) {
      setValidationMessage("Describe qué comprobaste y qué resultado observaste.");
      return;
    }

    onSubmit({
      verificationPerformed: normalizedVerification,
      observedResult: normalizedResult,
    });
  };

  return (
    <section className="verification-panel" aria-labelledby="verification-form-title">
      <header>
        <p className="evaluation-eyebrow">Una única reevaluación</p>
        <h2 id="verification-form-title">¿Realizaste una comprobación?</h2>
        <p>
          Cuéntanos qué verificaste fuera de esta aplicación y qué observaste. El resultado
          se considera informado por ti, no verificado automáticamente.
        </p>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <label className="at-label" htmlFor="verification-performed">
          Comprobación realizada <span aria-hidden="true">*</span>
          <input
            className="at-input"
            id="verification-performed"
            name="verificationPerformed"
            list="verification-suggestions"
            maxLength={1000}
            value={verificationPerformed}
            onChange={(event) => {
              setVerificationPerformed(event.target.value);
              setValidationMessage("");
            }}
            placeholder="Ej.: Consulté la aplicación oficial sin usar el enlace"
            disabled={disabled}
            required
          />
          <datalist id="verification-suggestions">
            {verificationSteps.map((step) => (
              <option value={step.action} key={`${step.priority}-${step.action}`} />
            ))}
          </datalist>
        </label>

        <label className="at-label" htmlFor="verification-result">
          Resultado observado <span aria-hidden="true">*</span>
          <textarea
            className="at-textarea evaluation-textarea-compact"
            id="verification-result"
            name="observedResult"
            maxLength={2000}
            value={observedResult}
            onChange={(event) => {
              setObservedResult(event.target.value);
              setValidationMessage("");
            }}
            placeholder="Describe lo que encontraste, incluso si fue ambiguo o no resolvió la duda."
            disabled={disabled}
            required
          />
          <span className="evaluation-field-meta">{observedResult.length}/2.000</span>
        </label>

        {validationMessage && (
          <p className="evaluation-inline-error" role="alert">
            {validationMessage}
          </p>
        )}

        <button className="at-button" type="submit" disabled={disabled}>
          {disabled ? "Reevaluando…" : "Incorporar resultado y reevaluar"}
          {!disabled && <ArrowRight aria-hidden="true" size={18} />}
        </button>
      </form>

      <div className="verification-scope-note">
        <CheckCircle2 aria-hidden="true" size={18} />
        El MVP permite una sola reevaluación por recorrido.
      </div>
    </section>
  );
}
