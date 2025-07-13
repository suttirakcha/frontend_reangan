import { z } from "zod";

export const lessonSchema = z.object({
  id: z.number(),
  question: z.string(),
  correct_answer: z.string(),
  choices: z.array(z.string())
})

export type Lesson = z.infer<typeof lessonSchema>;