import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import useStatStore from "@/stores/useStatStore";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const statistics = useStatStore((state) => state.statistics);
  const createStatistics = useStatStore((state) => state.createStatistics);

  useEffect(() => {
    const run = async () => {
      if (!statistics) {
        await createStatistics()
      }
    };

    run()
  }, []);

  return (
    <main className="lg:flex anim-fade">
      <DashboardSidebar className="max-lg:hidden" />
      <div className="max-lg:mt-15 flex w-full max-lg:min-h-[calc(100dvh_-_60px)] min-h-dvh p-8 max-w-[1300px] mx-auto">
        <DashboardHeader />
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardLayout;
