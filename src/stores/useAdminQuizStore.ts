import { create } from "zustand";
import useUserStore from "./useUserStore";
import { quizApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";

const useAdminQuizStore = create((set) => ({
  createQuiz: async (data: { title: string }) => {
    const token = useUserStore.getState().accessToken;
    const res = await quizApi.post("/", data, addToken(token!));
    return res;
  },
  updateQuiz: async (data: { title: string }, id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await quizApi.patch(`/${id}`, data, addToken(token!));
    return res;
  },
  deleteQuiz: async (id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await quizApi.delete(`/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminQuizStore;
