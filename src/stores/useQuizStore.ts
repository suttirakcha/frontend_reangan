import { courseApi, instance, quizApi } from "@/api/routesApi";
import { create } from "zustand";

import { addToken } from "@/lib/utils";
import { type QuizState } from "@/types";
import { persist } from "zustand/middleware";

const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentQuiz: null,
      loading: false,
      incorrectAnsweredQuestions: [],
      finishedQuizzes: [],
      getFinishedQuizzes: async () => {
        const token = localStorage.getItem("accessToken");
        const res = await instance.get(`${quizApi}/finished`, addToken(token!));
        set({ finishedQuizzes: res.data.finishedQuizzes });
      },
      getCurrentQuiz: async (
        courseId: number,
        lessonId: number,
        quizId: number
      ) => {
        set({ loading: true });
        const token = localStorage.getItem("accessToken");
        const res = await instance.get(
          `${courseApi}/${courseId}/lessons/${lessonId}/quiz/${quizId}`,
          addToken(token!)
        );
        set({ currentQuiz: res.data.quiz, loading: false });
      },
      completeQuiz: async (
        courseId: number,
        lessonId: number,
        quizId: number
      ) => {
        const token = localStorage.getItem("accessToken");
        await instance.post(
          `${courseApi}/${courseId}/lessons/${lessonId}/quiz/${quizId}`,
          {},
          addToken(token!)
        );
      },
      clearQuiz: () => {
        set({
          currentQuiz: null,
          loading: true,
          incorrectAnsweredQuestions: [],
        });
      },
    }),
    { name: "quiz-storage" }
  )
);

export default useQuizStore;
