import { create } from "zustand";
import { persist } from "zustand/middleware"
import { type AuthState } from "../types";
import { authApi } from "@/api/authApi";

const useAuthStore = create<AuthState>()(persist((set) => ({
  user: null,
  accessToken: null,
  login: async (data) => {
    const res = await authApi.post("/login", data);
    set({ user: res.data.result, accessToken: res.data.token })
    return res;
  },
  register: async (data) => {
    const res = await authApi.post("/register", data);
    return res;
  },
  logout: () => set({ user: null, accessToken: null })
}), {
  name: "auth-storage"
}))

export default useAuthStore;