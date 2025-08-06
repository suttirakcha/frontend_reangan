import { create } from "zustand";
import useUserStore from "./useUserStore";
import { instance, questionApi, quizApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { QuestionDetailFields } from "@/schemas/courseDetailSchema";
import type { AdminQuizState } from "@/types";

const useAdminQuizStore = create<AdminQuizState>()((set) => ({
  createQuiz: async (data: { title: string }) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${quizApi}/`, data, addToken(token!));
    return res;
  },
  updateQuiz: async (data: { title: string }, id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.patch(`${quizApi}/${id}`, data, addToken(token!));
    return res;
  },
  deleteQuiz: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.delete(`${quizApi}/${id}`, addToken(token!));
    return res;
  },
  createQuestion: async (data: QuestionDetailFields) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${questionApi}/`, data, addToken(token!));
    return res;
  },
  updateQuestion: async (data: QuestionDetailFields, id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.patch(`${questionApi}/${id}`, data, addToken(token!));
    return res;
  },
  deleteQuestion: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.delete(`${questionApi}/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminQuizStore;
