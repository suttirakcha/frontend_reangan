import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  question: z.string(),
  correct_choice: z.number(),
  choices: z.array(z.string())
})

export type Lesson = z.infer<typeof lessonSchema>;