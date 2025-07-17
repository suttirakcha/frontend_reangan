import { create } from "zustand";
import useUserStore from "./useUserStore";
import { courseApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { AdminCourseState, DataDetail } from "@/types";

const useAdminCourseStore = create<AdminCourseState>()((set) => ({
  courses: [],
  getCourseById: async (id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await courseApi.get(`/${id}`, addToken(token!));
    return res;
  },
  getCourses: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await courseApi.get("/", addToken(token!));
    set({ courses: res.data.courses });
  },
  createCourse: async (data: DataDetail) => {
    const token = useUserStore.getState().accessToken;
    const res = await courseApi.post("/", data, addToken(token!));
    return res;
  },
  updateCourse: async (data: DataDetail, id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await courseApi.patch(`/${id}`, data, addToken(token!));
    return res;
  },
  deleteCourse: async (id: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await courseApi.delete(`/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminCourseStore;
