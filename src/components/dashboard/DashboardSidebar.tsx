import useAuthStore from "@/stores/useAuthStore";
import { UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function DashboardSidebar() {
  const linkTo = (link: string) => `/dashboard/${link}`;
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  return (
    <nav className="h-dvh max-w-[300px] p-8 bg-orange-200 w-full content-box">
      <div className="bg-orange-100 w-full p-2 rounded-full flex items-center gap-2">
        <UserCircle />
        {user?.username}
      </div>
      <div className="flex flex-col gap-4">
        <Link to={linkTo("learn")}>Learn</Link>
        <Link to={linkTo("learn2")}>Learn2</Link>
        <Button onClick={logout}>Logout</Button>
      </div>
    </nav>
  );
}

export default DashboardSidebar;
