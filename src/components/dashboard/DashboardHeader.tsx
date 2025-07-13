import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";
import { Menu, UserCircle } from "lucide-react";
import useUserStore from "@/stores/useUserStore";

function DashboardHeader() {
  const user = useUserStore(state => state.user);
  return (
    <div className="w-full lg:hidden bg-orange-200 fixed top-0 left-0 px-6 h-15 flex items-center justify-between">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-8 h-8 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="!max-w-[300px] border-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="h-10 rounded-full px-4 bg-orange-50 flex items-center gap-2">
        <UserCircle />
        {user?.username}
      </div>
    </div>
  );
}

export default DashboardHeader;
