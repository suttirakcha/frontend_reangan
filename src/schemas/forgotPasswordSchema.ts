import { z } from "zod"

export const forgotPasswordSchema = z.object({
  email: z.string().email().nonempty("Email is required")
})

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().nonempty("New password is required")
})

export type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;