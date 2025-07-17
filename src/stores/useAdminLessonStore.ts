import { create } from "zustand";
import useUserStore from "./useUserStore";
import { lessonApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { AdminLessonState, DataDetail } from "@/types";

const useAdminLessonStore = create<AdminLessonState>()((set) => ({
  lessons: [],
  getLessonById: async (id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await lessonApi.get(`/${id}`, addToken(token!));
    return res;
  },
  getLessons: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await lessonApi.get("/", addToken(token!));
    set({ lessons: res.data.lessons });
  },
  createLesson: async (data: DataDetail) => {
    const token = useUserStore.getState().accessToken;
    const res = await lessonApi.post("/", data, addToken(token!));
    return res;
  },
  updateLesson: async (data: DataDetail, id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await lessonApi.patch(`/${id}`, data, addToken(token!));
    return res;
  },
  deleteLesson: async (id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await lessonApi.delete(`/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminLessonStore;
