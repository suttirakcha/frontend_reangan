import { instance } from "@/api/routesApi";
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
        await createStatistics();
      }
    };

    run();
  }, []);

  //   const test = async () => {
  //   try {
  //     const res = await instance.get('/testtoken');
  //     console.log(res);
  //   } catch (error: any) {
  //     console.log(error);
  //     // if (error?.response?.status === 401) {
  //     //   alert('Token expired, please login again.');
  //     // }
  //   }
  // };

  return (
    <main className="lg:flex anim-fade">
      <DashboardSidebar className="max-lg:hidden" />
      {/* <button onClick={test}>Click to test</button> */}
      <div className="max-lg:mt-15 flex w-full max-lg:h-[calc(100dvh_-_60px)] overflow-auto h-dvh max-h-dvh p-8 max-w-[1300px] mx-auto">
        <DashboardHeader />
        <Outlet />
      </div>
    </main>
  );
}

export default DashboardLayout;
