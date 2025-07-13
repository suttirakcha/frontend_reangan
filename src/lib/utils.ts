import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addToken = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const checkIfAuthPage = (pages: string) => {
  const publicPages = ["login", "register", "forgot-password", "reset-password"];
  const isAuthPage = publicPages.some((page) => pages.includes(page));

  return isAuthPage;
};

export const shuffleArray = (arr: string[], shuffle: number) => {
  return arr.sort(() => shuffle);
};