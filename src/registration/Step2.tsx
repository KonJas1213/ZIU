import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Data, Step2FormValues, step2Schema } from "./schemas";

const SUGGESTED_CATEGORIES = ["Praca", "Dom", "Nauka", "Sport", "Zdrowie"];

interface Step2Props {
  defaultValues?: Step2Data;
  onComplete: (data: Step2Data) => void;
  onBack: () => void;
}

function toFormValues(data?: Step2Data): Step2FormValues {
  return {
    categories: data?.categories.map((value) => ({ value })) ?? [],
    notifications: data?.notifications ?? { email: false, push: false },
    newsletter: data?.newsletter ?? false,
  };
}

export function Step2({ defaultValues, onComplete, onBack }: Step2Props) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: toFormValues(defaultValues),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const selectedCategories = watch("categories").map((item) => item.value).filter(Boolean);

  const addCategory = (name: string) => {
    if (selectedCategories.includes(name)) return;
    append({ value: name });
  };

  const onSubmit = (data: Step2FormValues) => {
    onComplete({
      categories: data.categories.map((item) => item.value),
      notifications: data.notifications,
      newsletter: data.newsletter,
    });
  };

  return (
    <form className="lab7-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="lab7-field">
        <span id="categories-label">Kategorie *</span>
        <div className="lab7-category-list" role="group" aria-labelledby="categories-label">
          {SUGGESTED_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className="lab7-btn-secondary"
              onClick={() => addCategory(category)}
              disabled={selectedCategories.includes(category)}
            >
              + {category}
            </button>
          ))}
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="lab7-checkbox-row">
            <input
              id={`category-${index}`}
              type="text"
              aria-label={`Kategoria ${index + 1}`}
              aria-invalid={!!errors.categories?.[index]?.value || !!errors.categories?.message}
              {...register(`categories.${index}.value` as const)}
            />
            <button
              type="button"
              className="lab7-btn-secondary"
              onClick={() => remove(index)}
              aria-label={`Usuń kategorię ${index + 1}`}
            >
              Usuń
            </button>
          </div>
        ))}

        <button
          type="button"
          className="lab7-btn-secondary"
          onClick={() => append({ value: "" })}
          aria-label="Dodaj własną kategorię"
        >
          Dodaj kategorię
        </button>

        {errors.categories?.message && (
          <span className="lab7-error" role="alert">
            {errors.categories.message}
          </span>
        )}
      </div>

      <fieldset className="lab7-field">
        <legend>Powiadomienia</legend>
        <div className="lab7-checkbox-row">
          <Controller
            name="notifications.email"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-email"
                aria-label="Powiadomienia e-mail"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            )}
          />
          <label htmlFor="notif-email">E-mail</label>
        </div>
        <div className="lab7-checkbox-row">
          <Controller
            name="notifications.push"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="notif-push"
                aria-label="Powiadomienia push"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
              />
            )}
          />
          <label htmlFor="notif-push">Push</label>
        </div>
      </fieldset>

      <div className="lab7-checkbox-row">
        <Controller
          name="newsletter"
          control={control}
          render={({ field }) => (
            <input
              type="checkbox"
              id="newsletter"
              aria-label="Newsletter — opcjonalnie"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <label htmlFor="newsletter">Chcę otrzymywać newsletter (opcjonalnie)</label>
      </div>

      <div className="lab7-actions">
        <button type="button" className="lab7-btn-secondary" onClick={onBack}>
          Wstecz
        </button>
        <button type="submit" className="lab7-btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Sprawdzanie…" : "Dalej"}
        </button>
      </div>
    </form>
  );
}
