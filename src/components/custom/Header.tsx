import { checkIfAuthPage, cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isAuthPage = checkIfAuthPage(location.pathname);

  return (
    <header
      className={cn(
        "text-orange-400 w-full bg-white fixed inset-x-0 top-0 transition-all duration-500 mt-0 opacity-100 visible z-2",
        { "-mt-18 opacity-0 invisible": isAuthPage }
      )}
    >
      <nav className="flex items-center justify-between px-12 py-4 max-w-[1300px] mx-auto">
        <Link to="/" className="text-4xl font-bold">
          ReanGan
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:opacity-80">{t("Login")}</Link>
          <Link to="/register" className="hover:opacity-80">{t("Register")}</Link>
          <LanguageSwitcher className="flex items-center gap-2"/>
        </div>
      </nav>
    </header>
  );
}

export default Header;
