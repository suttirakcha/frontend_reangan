import { cn } from "@/lib/utils";
import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BackToHomeBtnProps {
  className?: string;
}

function BackToHomeBtn({ className }: BackToHomeBtnProps) {
  return (
    <div className={cn("h-12 flex items-center px-6 anim-fade", className)}>
      <Link to="/" className="flex items-center gap-2">
        <ChevronLeftCircle className="w-4 h-4" />
        Back to Homepage
      </Link>
    </div>
  );
}

export default BackToHomeBtn;
