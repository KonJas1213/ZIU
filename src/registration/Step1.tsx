import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step1Data, step1Schema } from "./schemas";

type PasswordStrength = "słabe" | "średnie" | "silne";

interface Step1Props {
  defaultValues?: Step1Data;
  serverEmailError?: string;
  onComplete: (data: Step1Data) => void;
}

function getPasswordStrength(pwd: string): PasswordStrength {
  if (!pwd) return "słabe";
  let score = 0;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
  if (score <= 1) return "słabe";
  if (score <= 3) return "średnie";
  return "silne";
}

export function Step1({ defaultValues, serverEmailError, onComplete }: Step1Props) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: defaultValues ?? {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const strength = getPasswordStrength(passwordValue);

  useEffect(() => {
    if (serverEmailError) {
      setError("email", { type: "server", message: serverEmailError });
    }
  }, [serverEmailError, setError]);

  return (
    <form className="lab7-form" onSubmit={handleSubmit(onComplete)} noValidate>
      <p className="lab7-required-note">Pola oznaczone * są wymagane.</p>

      <div className="lab7-field">
        <label htmlFor="firstName">Imię *</label>
        <input
          id="firstName"
          type="text"
          autoComplete="given-name"
          aria-required="true"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "firstName-err" : undefined}
          {...register("firstName")}
        />
        {errors.firstName && (
          <span id="firstName-err" className="lab7-error" role="alert">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="lab7-field">
        <label htmlFor="lastName">Nazwisko *</label>
        <input
          id="lastName"
          type="text"
          autoComplete="family-name"
          aria-required="true"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? "lastName-err" : undefined}
          {...register("lastName")}
        />
        {errors.lastName && (
          <span id="lastName-err" className="lab7-error" role="alert">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="lab7-field">
        <label htmlFor="email">E-mail *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <span id="email-err" className="lab7-error" role="alert">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="lab7-field">
        <label htmlFor="password">Hasło *</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "pwd-err pwd-hint" : "pwd-hint"}
          {...register("password")}
        />
        <span id="pwd-hint" className={`lab7-hint lab7-strength--${strength === "średnie" ? "srednie" : strength === "silne" ? "silne" : "slabe"}`} aria-live="polite">
          Siła hasła: {strength}
        </span>
        {errors.password && (
          <span id="pwd-err" className="lab7-error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="lab7-field">
        <label htmlFor="confirmPassword">Potwierdź hasło *</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-required="true"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirmPassword-err" : undefined}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span id="confirmPassword-err" className="lab7-error" role="alert">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="lab7-actions">
        <button type="submit" className="lab7-btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Sprawdzanie…" : "Dalej"}
        </button>
      </div>
    </form>
  );
}
