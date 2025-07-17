import { cn } from "@/lib/utils";
import useUserStore from "@/stores/useUserStore";
import { LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Menu } from "@/types";

interface SidebarProps {
  className?: string;
  menus: Menu[];
  type: string;
}

function Sidebar({ className, menus, type = "dashboard" }: SidebarProps) {
  const { t } = useTranslation();
  const sidebarLink = (link: string) => `/${type}${link}`;
  const { user, logout } = useUserStore();
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
    <nav
      className={cn(
        "min-h-dvh max-w-[300px] space-y-4 p-4 bg-orange-200 w-full content-box h-full",
        className
      )}
    >
      <h1 className="text-center text-4xl font-bold text-orange-500">
        ReanGan
      </h1>
      <div className="bg-orange-50 w-full px-4 py-3 rounded-full flex items-center gap-2">
        <UserCircle className="w-8 h-8" />
        <div>
          <p className="text-sm">{t(randomText)}</p>
          <p className="text-lg leading-6">{user?.username || "Guest"}</p>
        </div>
      </div>
      <section className="flex flex-col h-auto justify-between gap-6">
        <div className="flex flex-col gap-4">
          {menus.map((menu) => (
            <Link
              key={menu.text}
              to={sidebarLink(menu.link)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 hover:bg-orange-100 duration-200 rounded-full",
                {
                  "bg-orange-100": location.pathname === sidebarLink(menu.link),
                }
              )}
            >
              {menu.icon}
              {menu.text}
            </Link>
          ))}
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="cursor-pointer w-full text-base bg-orange-300 hover:bg-orange-100 text-orange-800 duration-200 rounded-full"
        >
          <LogOut />
          {t("Logout")}
        </Button>
      </section>
    </nav>
  );
}

export default Sidebar;
