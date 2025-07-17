import {
  BookOpen,
  LayoutDashboard,
  NotepadText,
  Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import Sidebar from "../custom/Sidebar";

interface DashboardSidebarProps {
  className?: string;
}

function AdminSidebar({ className }: DashboardSidebarProps) {
  const { t } = useTranslation();

  const menus = [
    {
      text: t("Home"),
      link: "",
      icon: <LayoutDashboard />,
    },
    {
      text: t("Courses"),
      link: "/courses",
      icon: <BookOpen />,
    },
    {
      text: t("Reports"),
      link: "/reports",
      icon: <NotepadText />,
    },
    {
      text: t("Settings"),
      link: "/settings",
      icon: <Settings />,
    },
  ];

  return <Sidebar menus={menus} type="admin" className={className} />;
}

export default AdminSidebar;
