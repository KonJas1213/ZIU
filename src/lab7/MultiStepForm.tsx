import { useEffect, useRef, useState } from "react";
import { ApiError, registerUser } from "./api";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { RegistrationPayload, Step1Data, Step2Data } from "./schemas";
import "./lab7.css";

type FormState = {
  step1?: Step1Data;
  step2?: Step2Data;
};

const stepTitle: Record<1 | 2 | 3, string> = {
  1: "Krok 1: Dane osobowe",
  2: "Krok 2: Preferencje",
  3: "Krok 3: Podsumowanie i potwierdzenie",
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormState>({});
  const [serverEmailError, setServerEmailError] = useState<string | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [currentStep]);

  const handleStep1Complete = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, step1: data }));
    setServerEmailError(undefined);
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleFinalSubmit = async (payload: RegistrationPayload) => {
    try {
      await registerUser(payload);
      setSuccessMessage("Rejestracja zakończona pomyślnie!");
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setServerEmailError(err.message);
        setCurrentStep(1);
        throw err;
      }
      throw err;
    }
  };

  if (successMessage) {
    return (
      <article className="lab7-wrapper" role="status">
        <h2>{successMessage}</h2>
        <p>Możesz wrócić do listy zadań.</p>
      </article>
    );
  }

  return (
    <article className="lab7-wrapper" aria-labelledby="registration-form-title">
      <nav aria-label="Postęp rejestracji">
        <ol className="lab7-breadcrumb">
          <li aria-current={currentStep === 1 ? "step" : undefined}>1. Dane</li>
          <li aria-current={currentStep === 2 ? "step" : undefined}>2. Preferencje</li>
          <li aria-current={currentStep === 3 ? "step" : undefined}>3. Podsumowanie</li>
        </ol>
      </nav>

      <h2 id="registration-form-title" tabIndex={-1} ref={headingRef}>
        {stepTitle[currentStep]}
      </h2>

      {currentStep === 1 && (
        <Step1
          defaultValues={formData.step1}
          serverEmailError={serverEmailError}
          onComplete={handleStep1Complete}
        />
      )}

      {currentStep === 2 && (
        <Step2
          defaultValues={formData.step2}
          onComplete={handleStep2Complete}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3
          data={formData}
          onBack={() => setCurrentStep(2)}
          onSubmit={handleFinalSubmit}
        />
      )}
    </article>
  );
}
