import { z } from "zod";

export const courseDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type CourseDetailFields = z.infer<typeof courseDetailSchema>;

export const questionsSchema = z.object({
  question: z.string().nonempty("Question is a required field"),
  correct_answer: z.string(),
  choices: z.string(),
  question_type: z.enum(["multiple_choices", "typing"]),
  quizId: z.number().optional()
}).refine((data) => (data.choices as string).includes(data.correct_answer), {
    message: "No correct answer included",
    path: ["choices"],
  });

export const quizzesSchema = z.object({
  title: z.string(),
  lessonId: z.number().optional()
})

export const lessonDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  courseId: z.number().optional()
});

export type LessonDetailFields = z.infer<typeof lessonDetailSchema>;
export type QuizDetailFields = z.infer<typeof quizzesSchema>;
export type QuestionDetailFields = z.infer<typeof questionsSchema>;