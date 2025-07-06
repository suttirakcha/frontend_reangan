import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import Loading from "@/components/custom/Loading";
import useUserStore from "@/stores/useUserStore";

const MainLayout = lazy(() => import("@/layout/MainLayout"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));
const MainPage = lazy(() => import("@/pages/dashboard/MainPage"));
const ExplorePage = lazy(() => import("@/pages/dashboard/ExplorePage"));
const ProfilePage = lazy(() => import("@/pages/dashboard/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const LessonPage = lazy(() => import("@/pages/dashboard/LessonPage"));

const QuizLayout = lazy(() => import("@/layout/QuizLayout"));
const QuizPage = lazy(() => import("@/pages/quiz/QuizPage"))

function AppRouter() {
  const user = useUserStore(state => state.user);

  const publicRouter = (children: ReactNode) => {
    return !user ? children : <Navigate to="/dashboard" />
  }

  const protectedRouter = (children: ReactNode) => {
    return user ? children : <Navigate to="/" />
  }

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={publicRouter(<MainLayout />)}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
          </Route>
          <Route path="/dashboard" element={protectedRouter(<DashboardLayout />)}>
            <Route index element={<MainPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="course/:courseId/lessons" element={<LessonPage />} />
            <Route path="*" element={<h1>404 NOT FOUND</h1>}/>
          </Route>
          <Route path="/quiz" element={protectedRouter(<QuizLayout />)}>
            <Route index element={<QuizPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;
