import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/custom/Header";
import { cn } from "@/lib/utils";

function MainLayout() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return (
    <main>
      <Header />
      <div
        className={cn("mt-18 anim-fade", {
          "h-dvh flex items-center justify-center absolute inset-0 mt-0":
            isAuthPage,
        })}
      >
        <Outlet />
      </div>
    </main>
  );
}

export default MainLayout;
