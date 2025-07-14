import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import useSettingsStore from "@/stores/useSettingsStore";

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { lang: "en", text: "English" },
  { lang: "th", text: "ภาษาไทย" },
];

function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  const currentLang = (lang: string) => {
    return lang === "th" ? "ภาษาไทย" : "English";
  };

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>
        {currentLang(language)}
        <ChevronDown className="w-5 h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((l) => (
          <DropdownMenuItem onSelect={() => handleChangeLanguage(l.lang)}>
            {l.text}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
