import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import Loading from "@/components/custom/Loading";
import useUserStore from "@/stores/useUserStore";

// Public components
const MainLayout = lazy(() => import("@/layout/MainLayout"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ForgotPasswordPage = lazy(() => import("@/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("@/pages/ResetPasswordPage"));

// Dashboard components
const DashboardLayout = lazy(() => import("@/layout/DashboardLayout"));
const MainPage = lazy(() => import("@/pages/dashboard/MainPage"));
const ExplorePage = lazy(() => import("@/pages/dashboard/ExplorePage"));
const ProfilePage = lazy(() => import("@/pages/dashboard/ProfilePage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const LessonPage = lazy(() => import("@/pages/dashboard/LessonPage"));

// Admin components
const AdminLayout = lazy(() => import("@/layout/AdminLayout"));
const MainAdminPage = lazy(() => import("@/pages/admin/MainAdminPage"));
const ReportsPage = lazy(() => import("@/pages/admin/ReportsPage"));
const AdminCoursesPage = lazy(() => import("@/pages/admin/AdminCoursesPage"));
const SingleReportPage = lazy(() => import("@/pages/admin/SingleReportPage"));
const SingleCoursePage = lazy(() => import("@/pages/admin/SingleCoursePage"))

// Quiz components
const QuizLayout = lazy(() => import("@/layout/QuizLayout"));
const QuizPage = lazy(() => import("@/pages/quiz/QuizPage"));

const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function AppRouter() {
  const { user } = useUserStore();
  const currentRole = user?.role;

  const publicRouter = (children: ReactNode) => {
    return !user ? (
      children
    ) : (
      <Navigate
        to={currentRole === "ADMIN" ? "/admin" : "/dashboard"}
        replace
      />
    );
  };

  const protectedRouter = (children: ReactNode, { role }: { role: string }) => {
    return user && currentRole === role ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <Loading />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={publicRouter(<MainLayout />)}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            path="/dashboard"
            element={protectedRouter(<DashboardLayout />, { role: "USER" })}
          >
            <Route index element={<MainPage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="course/:courseId/lessons" element={<LessonPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            path="/admin"
            element={protectedRouter(<AdminLayout />, { role: "ADMIN" })}
          >
            <Route index element={<MainAdminPage />} />
            <Route path="courses" element={<AdminCoursesPage />} />
            <Route path="courses/:courseId" element={<SingleCoursePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="reports/:reportId" element={<SingleReportPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            path="/course/:courseId/lesson/:lessonId/quiz/:quizId"
            element={protectedRouter(<QuizLayout />, { role: "USER" })}
          >
            <Route index element={<QuizPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;
