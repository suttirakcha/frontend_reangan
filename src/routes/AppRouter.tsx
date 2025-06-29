import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/components/custom/Loading";
import useAuthStore from "@/stores/useAuthStore";

const MainLayout = lazy(() => import("@/layout/MainLayout"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));
const MainPage = lazy(() => import("@/pages/dashboard/MainPage"));

function AppRouter() {
  const user = useAuthStore(state => state.user);
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/" />}>
            <Route index element={<MainPage />} />
            <Route path="learn" element={<h1>Learn</h1>} />
            <Route path="learn2" element={<h1>Learn2</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;
