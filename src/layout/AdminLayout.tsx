import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <main className="lg:flex anim-fade">
      <AdminSidebar className="max-lg:hidden" />
      <div className="max-lg:mt-15 flex w-full max-lg:min-h-[calc(100dvh_-_60px)] min-h-dvh p-8 max-w-[1300px] mx-auto">
        <DashboardHeader />
        <Outlet />
      </div>
    </main>
  );
}

export default AdminLayout;
