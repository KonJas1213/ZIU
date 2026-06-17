import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <BrowserRouter>
        <TodoProvider>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="zadania" element={<TasksPage />} />
              <Route path="rejestracja" element={<RegisterPage />} />
              <Route path="o-projekcie" element={<AboutPage />} />
            </Route>
          </Routes>
        </TodoProvider>
      </BrowserRouter>
    </>
  );
}
