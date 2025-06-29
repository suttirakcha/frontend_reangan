import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  progress: z.array(z.string())
})

export type UserFields = z.infer<typeof userSchema>;