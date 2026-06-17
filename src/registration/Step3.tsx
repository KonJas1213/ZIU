import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "./api";
import { RegistrationPayload, Step1Data, Step2Data, Step3Data, step3Schema } from "./schemas";

interface Step3Props {
  data: { step1?: Step1Data; step2?: Step2Data };
  onBack: () => void;
  onSubmit: (payload: RegistrationPayload) => Promise<void>;
}

function BoolBadge({ enabled, label }: { enabled: boolean; label: string }) {
  return (
    <span className={`lab7-badge ${enabled ? "lab7-badge--yes" : "lab7-badge--no"}`}>
      {label}: {enabled ? "tak" : "nie"}
    </span>
  );
}

export function Step3({ data, onBack, onSubmit }: Step3Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: { gdprAccepted: false },
  });

  const step1 = data.step1;
  const step2 = data.step2;

  const handleFinalSubmit = async () => {
    if (!step1 || !step2) {
      setError("root.serverError", { message: "Brak danych z poprzednich kroków." });
      return;
    }

    const { confirmPassword: _confirmPassword, ...step1Payload } = step1;
    void _confirmPassword;

    try {
      await onSubmit({ ...step1Payload, ...step2 });
    } catch (err) {
      if (err instanceof ApiError && err.status === 500) {
        setError("root.serverError", { message: "Błąd serwera, spróbuj ponownie" });
      }
    }
  };

  if (!step1 || !step2) {
    return (
      <p className="lab7-error" role="alert">
        Uzupełnij poprzednie kroki formularza.
      </p>
    );
  }

  return (
    <form className="lab7-form lab7-form--step3" onSubmit={handleSubmit(handleFinalSubmit)} noValidate>
      {errors.root?.serverError && (
        <div className="lab7-server-error" role="alert">
          {errors.root.serverError.message}
        </div>
      )}

      <p className="lab7-summary-intro">Sprawdź dane przed wysłaniem formularza.</p>

      <div className="lab7-summary-grid">
        <section className="lab7-summary-card">
          <h3 className="lab7-summary-card__title">Dane osobowe</h3>
          <p className="lab7-summary-card__name">
            {step1.firstName} {step1.lastName}
          </p>
          <p className="lab7-summary-card__value">{step1.email}</p>
        </section>

        <section className="lab7-summary-card">
          <h3 className="lab7-summary-card__title">Kategorie</h3>
          <div className="lab7-category-list">
            {step2.categories.map((category) => (
              <span key={category} className="lab7-category-chip">
                {category}
              </span>
            ))}
          </div>
        </section>

        <section className="lab7-summary-card lab7-summary-card--wide">
          <h3 className="lab7-summary-card__title">Preferencje</h3>
          <div className="lab7-badge-row">
            <BoolBadge enabled={step2.notifications.email} label="E-mail" />
            <BoolBadge enabled={step2.notifications.push} label="Push" />
            <BoolBadge enabled={!!step2.newsletter} label="Newsletter" />
          </div>
        </section>
      </div>

      <section className="lab7-gdpr-box">
        <div className="lab7-checkbox-row lab7-checkbox-row--spaced">
          <input
            id="gdpr"
            type="checkbox"
            aria-required="true"
            aria-invalid={!!errors.gdprAccepted}
            aria-describedby={errors.gdprAccepted ? "gdpr-err" : undefined}
            {...register("gdprAccepted")}
          />
          <label htmlFor="gdpr">Akceptuję regulamin i politykę prywatności (RODO) *</label>
        </div>
        {errors.gdprAccepted && (
          <span id="gdpr-err" className="lab7-error" role="alert">
            {errors.gdprAccepted.message}
          </span>
        )}
      </section>

      <div className="lab7-actions">
        <button type="button" className="lab7-btn-secondary" onClick={onBack}>
          Wstecz
        </button>
        <button type="submit" className="lab7-btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Wysyłanie…" : "Zarejestruj się"}
        </button>
      </div>
    </form>
  );
}
