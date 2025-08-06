import { create } from "zustand";
import { instance, lessonApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { AdminLessonState, DataDetail } from "@/types";

const useAdminLessonStore = create<AdminLessonState>()((set) => ({
  lessons: [],
  getLessonById: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${lessonApi}/${id}`, addToken(token!));
    return res;
  },
  getLessons: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${lessonApi}/`, addToken(token!));
    set({ lessons: res.data.lessons });
  },
  createLesson: async (data: DataDetail) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${lessonApi}/`, data, addToken(token!));
    return res;
  },
  updateLesson: async (data: DataDetail, id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.patch(`${lessonApi}/${id}`, data, addToken(token!));
    return res;
  },
  deleteLesson: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.delete(`${lessonApi}/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminLessonStore;
