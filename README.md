# TodoApp – projekt ZIU

Aplikacja webowa do zarządzania zadaniami (To-Do List), zbudowana w ramach przedmiotu **Zaawansowany Interfejs Użytkownika** na Akademii Tarnowskiej.

## Funkcje

* **Dashboard** – podsumowanie i statystyki zadań
* **Lista zadań** – dodawanie, usuwanie, oznaczanie jako ukończone, filtrowanie i wyszukiwanie
* **Rejestracja** – wieloetapowy formularz z walidacją danych (React Hook Form + Zod)
* **O projekcie** – opis projektu i zastosowanych technologii
* Responsywny interfejs użytkownika (mobile i desktop)
* Dostępność zgodna z WCAG 2.1 AA (semantyczny HTML, ARIA, skip link, focus trap)

## Uruchomienie projektu

### Instalacja zależności

```bash
npm install
```

### Tryb deweloperski

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173
```

### Budowanie wersji produkcyjnej

```bash
npm run build
```

### Podgląd wersji produkcyjnej

```bash
npm run preview
```

## Technologie

| Narzędzie                       | Zastosowanie                              |
| ------------------------------- | ----------------------------------------- |
| React 18 + TypeScript           | Budowa interfejsu użytkownika i typowanie |
| Vite                            | Bundler i serwer deweloperski             |
| React Router 6                  | Routing aplikacji                         |
| Context API + useReducer        | Zarządzanie globalnym stanem zadań        |
| MUI 6                           | Komponenty interfejsu użytkownika         |
| Tailwind CSS 3                  | Stylowanie widoku listy zadań             |
| React Hook Form + Zod           | Obsługa formularzy i walidacja danych     |
| Mock API (fetch + localStorage) | Symulacja komunikacji z backendem         |

## Widoki aplikacji

| Ścieżka        | Widok                  |
| -------------- | ---------------------- |
| `/`            | Dashboard              |
| `/zadania`     | Lista zadań            |
| `/rejestracja` | Formularz rejestracji  |
| `/o-projekcie` | Informacje o projekcie |

## Testowanie błędów API

### Zadania

Aby zasymulować błąd podczas dodawania zadania, wpisz w tytule:

```text
błąd sieci
```

### Rejestracja

* `zajety@test.pl` – błąd 409 (Conflict)
* adres e-mail zawierający `error500` – błąd 500 (Internal Server Error)

## Wdrożenie

Po wykonaniu polecenia:

```bash
npm run build
```

zostanie utworzony katalog `dist/`, który można wdrożyć na platformach takich jak:

* Netlify
* Vercel
* GitHub Pages

## Autor

Projekt wykonany w ramach przedmiotu **Zaawansowany Interfejs Użytkownika** na Akademii Tarnowskiej.
