import DashboardSection from "@/components/dashboard/DashboardSection";
import SettingsSection from "@/components/dashboard/SettingsSection";
import { Button } from "@/components/ui/button";
import useSettingsStore from "@/stores/useSettingsStore";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { setLanguage } = useSettingsStore();

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    toast.success(`Changed language to ${lang === "th" ? "Thai" : "English"}`)
  };

  return (
    <DashboardSection title="Settings" description="Update your settings here">
      <SettingsSection title="Languages">
        <h1>Switch language</h1>
        <div className="flex items-center gap-2">
          <Button className="main-btn" onClick={() => handleChangeLanguage("en")}>English</Button>
          <Button className="main-btn" onClick={() => handleChangeLanguage("th")}>Thai</Button>
        </div>
      </SettingsSection>
    </DashboardSection>
  );
}

export default SettingsPage;
