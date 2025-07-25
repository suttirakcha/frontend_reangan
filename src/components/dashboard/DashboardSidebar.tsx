import {
  BookOpen,
  LayoutDashboard,
  NotebookPen,
  Settings,
  UserPen,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Sidebar from "../custom/Sidebar";

interface DashboardSidebarProps {
  className?: string;
}

function DashboardSidebar({ className }: DashboardSidebarProps) {
  const { t } = useTranslation();

  const menus = [
    {
      text: t("Home"),
      link: "",
      icon: <LayoutDashboard />,
    },
    {
      text: t("Profile"),
      link: "/profile",
      icon: <UserPen />,
    },
    {
      text: t("Explore"),
      link: "/explore",
      icon: <BookOpen />,
    },
    {
      text: t("Settings"),
      link: "/settings",
      icon: <Settings />,
    },
    {
      text: t("Practise"),
      link: "/practise",
      icon: <NotebookPen />,
    },
  ];

  return <Sidebar menus={menus} type="dashboard" className={className} />;
}

export default DashboardSidebar;
