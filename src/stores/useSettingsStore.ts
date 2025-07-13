import { type SettingsState } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create<SettingsState>()(persist((set) => ({
  darkMode: false,
  setDarkMode: (val: boolean) => {
    set({ darkMode: !val })
  },
  language: 'en',
  setLanguage: (lang: string) => {
    set({ language: lang })
  }
}), {
  name: "settings-storage"
}))

export default useSettingsStore;