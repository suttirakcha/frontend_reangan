import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");
  return (
    <header
      className={cn(
        "text-orange-400 w-full bg-white fixed inset-x-0 top-0 transition-all duration-500 mt-0 opacity-100 visible",
        { "-mt-18 opacity-0 invisible": isAuthPage }
      )}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-[1000px] mx-auto">
        <Link to="/" className="text-4xl font-bold">
          ReanGan
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:opacity-80">Login</Link>
          <Link to="/register" className="hover:opacity-80">Register</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
