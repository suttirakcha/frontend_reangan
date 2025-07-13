import type { DashboardSectionProps } from "@/types";
import type { PropsWithChildren } from "react";

function DashboardSection({
  title,
  description,
  className,
  children,
}: PropsWithChildren<DashboardSectionProps>) {
  return (
    <div className="space-y-6 w-full anim-fade-fast">
      <div className="space-y-2">
        <h1 className="title">{title}</h1>
        <p>{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

export default DashboardSection;
