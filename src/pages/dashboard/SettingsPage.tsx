import DashboardSection from "@/components/dashboard/DashboardSection";
import SettingsSection from "@/components/dashboard/SettingsSection";
import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const { t } = useTranslation();
  return (
    <DashboardSection title={t("Settings")} description={t("Update your settings here")}>
      <SettingsSection
        title={t("Languages")}
        className="flex items-center justify-between"
      >
        <h1>{t("Switch language")}</h1>
        <LanguageSwitcher className="flex items-center justify-between gap-2 border border-orange-500 px-4 py-2 rounded-lg shadow-md shadow-orange-100" />
      </SettingsSection>
    </DashboardSection>
  );
}

export default SettingsPage;
