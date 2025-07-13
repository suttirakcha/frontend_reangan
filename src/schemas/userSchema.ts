import { z } from "zod";

export const userSchema = z
  .object({
    username: z.string().max(20, "Username cannot be more than 20 characters").nonempty("Username is required"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
  });

export type UserFields = z.infer<typeof userSchema>;
