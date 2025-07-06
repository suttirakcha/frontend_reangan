import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <main className="lg:flex anim-fade">
      <DashboardSidebar />
      <div className="flex w-full h-dvh p-8 max-w-[1300px] mx-auto">
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardLayout;
