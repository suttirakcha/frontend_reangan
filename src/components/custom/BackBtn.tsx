import { cn } from "@/lib/utils";
import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface BackBtnProps {
  className?: string;
  link?: string;
  text: string;
}

function BackBtn({ className, link, text }: BackBtnProps) {
  return (
    <div className={cn("h-12 flex items-center", className)}>
      <Link to={link ?? "/"} className="flex items-center gap-2">
        <ChevronLeftCircle className="w-4 h-4" />
        {text}
      </Link>
    </div>
  );
}

export default BackBtn;
