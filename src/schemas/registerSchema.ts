import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
    // accept_terms: z.boolean({ required_error: "You must accept the terms and conditions" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password does not match",
    path: ["confirm_password"],
  });


export type RegisterFields = z.infer<typeof registerSchema>;