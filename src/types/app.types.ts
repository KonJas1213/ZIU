export const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/zadania": "Zadania",
  "/rejestracja": "Rejestracja",
  "/o-projekcie": "O projekcie",
};

export function getRouteTitle(pathname: string): string {
  return routeTitles[pathname] ?? "TodoApp";
}
