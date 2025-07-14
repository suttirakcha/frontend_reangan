import type { PropsWithChildren } from "react";

interface SettingsSectionProps {
  title: string;
  className?: string;
}

function SettingsSection({ title, className, children }: PropsWithChildren<SettingsSectionProps>) {
  return (
    <div className="space-y-2">
      <h2 className="title-sm">{title}</h2>
      <div className={className}>
        {children}
      </div>
    </div>
  )
}

export default SettingsSection