import DashboardSection from "@/components/dashboard/DashboardSection";
import SettingsSection from "@/components/dashboard/SettingsSection";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";

function SettingsPage() {
  return (
    <DashboardSection title="Settings" description="Update your settings here">
      <SettingsSection
        title="Languages"
        className="flex items-center justify-between"
      >
        <h1>Switch language</h1>
        <LanguageSwitcher className="flex items-center justify-between gap-2 border border-orange-500 px-4 py-2 rounded-lg shadow-md shadow-orange-100" />
      </SettingsSection>
    </DashboardSection>
  );
}

export default SettingsPage;
