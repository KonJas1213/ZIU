export default function AboutPage() {
  return (
    <article className="about-page">
      <header>
        <h2>O projekcie</h2>
        <p>Aplikacja TodoApp — projekt końcowy przedmiotu Zaawansowany interfejs użytkownika (ZIU).</p>
      </header>

      <section aria-labelledby="about-scope-title">
        <h3 id="about-scope-title">Zakres funkcjonalny</h3>
        <ul>
          <li>Dashboard ze statystykami zadań</li>
          <li>Lista zadań z filtrowaniem, wyszukiwaniem i operacjami CRUD</li>
          <li>Wieloetapowy formularz rejestracji z walidacją (React Hook Form + Zod)</li>
          <li>Responsywny layout z menu bocznym i hamburgerem na mobile</li>
          <li>Dostępność WCAG 2.1 AA (semantyka, ARIA, skip link, focus trap)</li>
        </ul>
      </section>

      <section aria-labelledby="about-stack-title">
        <h3 id="about-stack-title">Stos technologiczny</h3>
        <ul>
          <li>React 18 + TypeScript + Vite</li>
          <li>React Router — routing między widokami</li>
          <li>Context API + useReducer — globalny stan zadań</li>
          <li>MUI 6 — komponenty UI (dashboard, spinner)</li>
          <li>Tailwind CSS — panel zadań</li>
          <li>Mock API (fetch + localStorage) — symulacja backendu</li>
        </ul>
      </section>

      <section aria-labelledby="about-ux-title">
        <h3 id="about-ux-title">Decyzje UX</h3>
        <p>
          Aplikacja stosuje heurystykę Nielsena „widoczność statusu systemu” — każda operacja na zadaniu pokazuje
          spinner lub komunikat sukcesu/błędu. Nawigacja jest spójna na desktopie (sidebar) i mobile (drawer +
          hamburger), co odpowiada zasadzie „elastyczności i efektywności użycia”.
        </p>
      </section>
    </article>
  );
}
