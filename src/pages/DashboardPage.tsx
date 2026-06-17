import { Link } from "react-router-dom";
import StatsGrid from "../components/dashboard/StatsGrid";

export default function DashboardPage() {
  return (
    <article className="dashboard-page">
      <section aria-labelledby="dashboard-intro-title">
        <h2 id="dashboard-intro-title">Witaj w TodoApp</h2>
        <p>
          Zarządzaj zadaniami, filtruj listę i śledź postępy. Aplikacja została zbudowana w ramach przedmiotu
          Zaawansowany interfejs użytkownika.
        </p>
        <Link to="/zadania" className="dashboard-cta">
          Przejdź do listy zadań
        </Link>
      </section>

      <section aria-label="Podsumowanie statystyk">
        <StatsGrid />
      </section>
    </article>
  );
}
