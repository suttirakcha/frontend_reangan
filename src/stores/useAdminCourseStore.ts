import { create } from "zustand";
import { courseApi, instance } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { AdminCourseState, DataDetail } from "@/types";

const useAdminCourseStore = create<AdminCourseState>()((set) => ({
  courses: [],
  getCourseById: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${courseApi}/${id}`, addToken(token!));
    return res;
  },
  getCourses: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${courseApi}/`, addToken(token!));
    set({ courses: res.data.courses });
  },
  createCourse: async (data: DataDetail) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${courseApi}/`, data, addToken(token!));
    return res;
  },
  updateCourse: async (data: DataDetail, id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.patch(`${courseApi}/${id}`, data, addToken(token!));
    return res;
  },
  deleteCourse: async (id: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.delete(`${courseApi}/${id}`, addToken(token!));
    return res;
  },
}));

export default useAdminCourseStore;
