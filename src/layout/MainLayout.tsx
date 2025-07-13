import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/custom/Header";
import { checkIfAuthPage, cn } from "@/lib/utils";
import Footer from "@/components/custom/Footer";

function MainLayout() {
  const location = useLocation();
  const isAuthPage = checkIfAuthPage(location.pathname);

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
      {!isAuthPage && <Footer />}
    </main>
  );
}

export default MainLayout;
