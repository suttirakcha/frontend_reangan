import { z } from "zod";

export const courseDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type CourseDetailFields = z.infer<typeof courseDetailSchema>;

export const questionsSchema = z.object({
  question: z.string(),
  correct_answer: z.string(),
  choices: z.string(),
  question_type: z.enum(["multiple_choices", "typing"])
})

export const quizzesSchema = z.object({
  title: z.string(),
  // questions: z.array(questionsSchema)
})

export const lessonDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  courseId: z.string(),
  quizzes: z.array(quizzesSchema)
});

export type LessonDetailFields = z.infer<typeof lessonDetailSchema>;