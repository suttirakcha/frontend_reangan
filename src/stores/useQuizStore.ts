import { courseApi, quizApi } from "@/api/routesApi";
import { create } from "zustand";
import useUserStore from "./useUserStore";
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
        const { accessToken: token } = useUserStore.getState();
        const res = await quizApi.get("/finished", addToken(token!));
        set({ finishedQuizzes: res.data.finishedQuizzes })
      },
      getCurrentQuiz: async (
        courseId: number,
        lessonId: number,
        quizId: number
      ) => {
        set({ loading: true });
        const { accessToken: token } = useUserStore.getState();
        const res = await courseApi.get(
          `/${courseId}/lessons/${lessonId}/quiz/${quizId}`,
          addToken(token!)
        );
        set({ currentQuiz: res.data.quiz, loading: false });
      },
      completeQuiz: async (
        courseId: number,
        lessonId: number,
        quizId: number
      ) => {
        const { accessToken: token } = useUserStore.getState();
        await courseApi.post(
          `/${courseId}/lessons/${lessonId}/quiz/${quizId}`,
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
