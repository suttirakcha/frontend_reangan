import type { LoginFields } from "@/schemas/loginSchema";
import type { RegisterFields } from "@/schemas/registerSchema";
import type { AxiosResponse } from "axios";

export interface FormInputProps {
  label: string;
  field: string;
  error: string;
}

export type User = {
  username: string;
  email: string;
}

export type AuthState = {
  user: User | null;
  accessToken: string | null;
  login: (user: LoginFields) => Promise<AxiosResponse<LoginFields>>;
  register: (user: RegisterFields) => Promise<AxiosResponse<RegisterFields>>;
  logout: () => void;
}