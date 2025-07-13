import { Toaster } from "@/components/ui/sonner";
import AppRouter from "./routes/AppRouter";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import useSettingsStore from "./stores/useSettingsStore";
import { useEffect } from "react";

function App() {
  const { language } = useSettingsStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language])

  return (
    <I18nextProvider i18n={i18n}>
      <AppRouter />
      <Toaster position="top-right"/>
    </I18nextProvider>
  );
}

export default App;
