import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type UserState } from "../types";
import { authApi, userApi } from "@/api/routesApi";
import type { UserFields } from "@/schemas/userSchema";
import { addToken } from "@/lib/utils";
import type { ForgotPasswordFields, ResetPasswordFields } from "@/schemas/forgotPasswordSchema";

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      resetPasswordToken: null,
      login: async (data) => {
        const res = await authApi.post("/login", data);
        set({ user: res.data.result, accessToken: res.data.accessToken });
        return res;
      },
      register: async (data) => {
        const res = await authApi.post("/register", data);
        return res;
      },
      logout: () => set({ user: null, accessToken: null }),
      updateUser: async (data: UserFields) => {
        const token = get().accessToken;
        const res = await userApi.patch("/me", data, addToken(token!));
        set({ user: res.data.result });
        return res;
      },
      deleteUser: async () => {
        const token = get().accessToken;
        const res = await userApi.delete("/me", addToken(token!));
        return res;
      },
      requestForgotPassword: async (data: ForgotPasswordFields) => {
        const res = await authApi.post("/forgot-password", data);
        set({ resetPasswordToken: res.data.resetPasswordToken });
        return res;
      },
      resetPassword: async (data: ResetPasswordFields, token: string) => {
        const res = await authApi.patch(`/reset-password/${token}`, data);
        set({ resetPasswordToken: null });
        return res;
      }
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
