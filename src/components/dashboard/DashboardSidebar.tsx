import { cn } from "@/lib/utils";
import useUserStore from "@/stores/useUserStore";
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  UserCircle,
  UserPen,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    text: "Home",
    link: "/",
    icon: <LayoutDashboard />,
  },
  {
    text: "Profile",
    link: "/profile",
    icon: <UserPen />,
  },
  {
    text: "Explore",
    link: "/explore",
    icon: <BookOpen />,
  },
  {
    text: "Settings",
    link: "/settings",
    icon: <Settings />,
  },
];

function DashboardSidebar() {
  const sidebarLink = (link: string) => `/dashboard${link}`;
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  const greetingTexts = [
    "Welcome back",
    "Hello",
    "How's it going?",
    "Good to see you",
  ];
  const [randomText] = useState(
    greetingTexts[Math.floor(Math.random() * greetingTexts.length)]
  );

  return (
    <nav className="h-dvh max-w-[300px] space-y-4 p-4 bg-orange-200 w-full content-box">
      <h1 className="text-center text-4xl font-bold text-orange-500">
        ReanGan
      </h1>
      <div className="bg-orange-50 w-full px-4 py-3 rounded-full flex items-center gap-2">
        <UserCircle className="w-8 h-8" />
        <div>
          <p className="text-sm">{randomText}</p>
          <p className="text-lg leading-6">{user?.username || "Guest"}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {menus.map((menu) => (
          <Link
            key={menu.text}
            to={sidebarLink(menu.link)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 hover:bg-orange-100 duration-200 rounded-full",
              { "bg-orange-100": location.pathname === sidebarLink(menu.link) }
            )}
          >
            {menu.icon}
            {menu.text}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default DashboardSidebar;
