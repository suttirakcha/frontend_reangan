import type { PropsWithChildren } from "react";

interface SettingsSectionProps {
  title: string;
}

function SettingsSection({ title, children }: PropsWithChildren<SettingsSectionProps>) {
  return (
    <div>
      <h2 className="title-sm">{title}</h2>
      <div>
        {children}
      </div>
    </div>
  )
}

export default SettingsSection