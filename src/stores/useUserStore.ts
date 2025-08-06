import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type UserState } from "../types";
import { authApi, instance, userApi } from "@/api/routesApi";
import type { UserFields } from "@/schemas/userSchema";
import { addToken } from "@/lib/utils";
import type {
  ForgotPasswordFields,
  ResetPasswordFields,
} from "@/schemas/forgotPasswordSchema";

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      resetPasswordToken: null,
      login: async (data) => {
        const res = await instance.post(`${authApi}/login`, data, {
          withCredentials: true,
        });
        set({ user: res.data.result });
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return res;
      },
      register: async (data) => {
        const res = await instance.post(`${authApi}/register`, data);
        return res;
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null });
      },
      updateUser: async (data: UserFields) => {
        const token = localStorage.getItem("accessToken");
        const res = await instance.patch(`${authApi}/me`, data, addToken(token!));
        set({ user: res.data.result });
        return res;
      },
      deleteUser: async () => {
        const token = localStorage.getItem("accessToken");
        const res = await instance.delete(`${authApi}/me`, addToken(token!));
        return res;
      },
      requestForgotPassword: async (data: ForgotPasswordFields) => {
        const res = await instance.post(`${authApi}/forgot-password`, data);
        set({ resetPasswordToken: res.data.resetPasswordToken });
        return res;
      },
      resetPassword: async (data: ResetPasswordFields, token: string) => {
        const res = await instance.patch(`${authApi}/reset-password/${token}`, data);
        set({ resetPasswordToken: null });
        return res;
      },
      refreshToken: async () => {
        const res = await instance.get(`${authApi}/refresh-token`);
        return res;
      }
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
