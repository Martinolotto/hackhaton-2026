import { useState } from "react";
import { AlertTriangle, ArrowRight, LockKeyhole } from "lucide-react";

const EMPTY_INTERACTION = {
  description: "",
  url: "",
  channel: "",
  presentedIdentity: "",
  observableOrigin: "",
  priorRelationship: "",
  requestedAction: "",
  doubtReason: "",
};

const REQUIRED_FIELDS = [
  "description",
  "channel",
  "presentedIdentity",
  "priorRelationship",
  "requestedAction",
  "doubtReason",
];

export default function EvaluationForm({ onSubmit, disabled = false }) {
  const [interaction, setInteraction] = useState(EMPTY_INTERACTION);
  const [originUnknown, setOriginUnknown] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setInteraction((current) => ({ ...current, [name]: value }));
    setValidationMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = Object.fromEntries(
      Object.entries(interaction).map(([key, value]) => [key, value.trim()]),
    );
    const missingRequired = REQUIRED_FIELDS.some((field) => !normalized[field]);
    const missingOrigin = !originUnknown && !normalized.observableOrigin;

    if (missingRequired || missingOrigin) {
      setValidationMessage(
        "Completa los campos obligatorios o indica que no conoces el origen observable.",
      );
      return;
    }

    onSubmit({
      ...normalized,
      url: normalized.url || null,
      observableOrigin: originUnknown ? null : normalized.observableOrigin,
    });
  };

  return (
    <form className="evaluation-form" onSubmit={handleSubmit} noValidate>
      <div className="evaluation-sensitive-warning" role="note">
        <LockKeyhole aria-hidden="true" size={22} />
        <div>
          <strong>Protege tu información.</strong>
          <p>
            No ingreses contraseñas, códigos de verificación, datos bancarios ni otra
            información sensible.
          </p>
        </div>
      </div>

      <fieldset disabled={disabled}>
        <legend>Describe la interacción</legend>
        <label className="at-label" htmlFor="evaluation-description">
          ¿Qué ocurrió? <span aria-hidden="true">*</span>
          <textarea
            className="at-textarea evaluation-description"
            id="evaluation-description"
            name="description"
            value={interaction.description}
            onChange={updateField}
            maxLength={10000}
            placeholder="Copia el mensaje sin datos sensibles o describe la situación con tus palabras."
            required
          />
          <span className="evaluation-field-meta">
            Texto libre · {interaction.description.length}/10.000
          </span>
        </label>

        <label className="at-label" htmlFor="evaluation-url">
          URL o enlace <span className="evaluation-optional">Opcional</span>
          <input
            className="at-input"
            id="evaluation-url"
            name="url"
            type="text"
            inputMode="url"
            value={interaction.url}
            onChange={updateField}
            maxLength={2048}
            placeholder="https://ejemplo.com/ruta"
          />
          <span className="evaluation-field-meta">
            Se usa como contexto declarado. No abrimos ni verificamos el enlace.
          </span>
        </label>
      </fieldset>

      <fieldset disabled={disabled}>
        <legend>Agrega contexto</legend>
        <div className="evaluation-field-grid">
          <label className="at-label" htmlFor="evaluation-channel">
            Canal <span aria-hidden="true">*</span>
            <input
              className="at-input"
              id="evaluation-channel"
              name="channel"
              value={interaction.channel}
              onChange={updateField}
              maxLength={100}
              placeholder="Correo, WhatsApp, SMS, red social…"
              required
            />
          </label>

          <label className="at-label" htmlFor="evaluation-identity">
            Identidad presentada <span aria-hidden="true">*</span>
            <input
              className="at-input"
              id="evaluation-identity"
              name="presentedIdentity"
              value={interaction.presentedIdentity}
              onChange={updateField}
              maxLength={200}
              placeholder="Quién dice ser"
              required
            />
          </label>
        </div>

        <label className="at-label" htmlFor="evaluation-origin">
          Origen observable
          <input
            className="at-input"
            id="evaluation-origin"
            name="observableOrigin"
            value={interaction.observableOrigin}
            onChange={updateField}
            maxLength={500}
            placeholder="Número, dirección de correo o nombre de cuenta visible"
            disabled={disabled || originUnknown}
            required={!originUnknown}
          />
        </label>
        <label className="evaluation-checkbox" htmlFor="evaluation-origin-unknown">
          <input
            id="evaluation-origin-unknown"
            type="checkbox"
            checked={originUnknown}
            onChange={(event) => {
              setOriginUnknown(event.target.checked);
              setValidationMessage("");
            }}
            disabled={disabled}
          />
          No conozco el origen observable
        </label>

        <label className="at-label" htmlFor="evaluation-relationship">
          Relación previa <span aria-hidden="true">*</span>
          <textarea
            className="at-textarea evaluation-textarea-compact"
            id="evaluation-relationship"
            name="priorRelationship"
            value={interaction.priorRelationship}
            onChange={updateField}
            maxLength={500}
            placeholder="¿Conocías a la persona, cuenta o entidad? ¿Habían hablado antes?"
            required
          />
        </label>

        <div className="evaluation-field-grid">
          <label className="at-label" htmlFor="evaluation-action">
            Acción solicitada <span aria-hidden="true">*</span>
            <textarea
              className="at-textarea evaluation-textarea-compact"
              id="evaluation-action"
              name="requestedAction"
              value={interaction.requestedAction}
              onChange={updateField}
              maxLength={1000}
              placeholder="Qué te piden hacer"
              required
            />
          </label>

          <label className="at-label" htmlFor="evaluation-doubt">
            Motivo de la duda <span aria-hidden="true">*</span>
            <textarea
              className="at-textarea evaluation-textarea-compact"
              id="evaluation-doubt"
              name="doubtReason"
              value={interaction.doubtReason}
              onChange={updateField}
              maxLength={1000}
              placeholder="Qué detalle te hizo detenerte"
              required
            />
          </label>
        </div>
      </fieldset>

      {validationMessage && (
        <p className="evaluation-inline-error" role="alert">
          <AlertTriangle aria-hidden="true" size={18} /> {validationMessage}
        </p>
      )}

      <div className="evaluation-submit-row">
        <p>Los campos marcados con * son obligatorios.</p>
        <button className="at-button" type="submit" disabled={disabled}>
          {disabled ? "Evaluando interacción…" : "Evaluar interacción"}
          {!disabled && <ArrowRight aria-hidden="true" size={18} />}
        </button>
      </div>
    </form>
  );
}
