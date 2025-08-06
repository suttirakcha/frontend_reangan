import { courseApi, instance } from "@/api/routesApi";
import { type CourseState } from "@/types";
import { create } from "zustand";
import { addToken } from "@/lib/utils";

const useCourseStore = create<CourseState>()((set) => ({
  courses: [],
  enrolledCourses: [],
  currentCourse: null,
  loading: true,
  getCourses: async () => {
    const res = await instance.get(`${courseApi}/`);
    set({ courses: res.data.courses, loading: false, currentCourse: null });
  },
  enrollCourse: async (courseId: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${courseApi}/${courseId}`, {}, addToken(token!));
    return res;
  },
  unenrollCourse: async (courseId: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.delete(`${courseApi}/${courseId}`, addToken(token!));
    return res;
  },
  getEnrolledCourses: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${courseApi}/enrolled`, addToken(token!));
    set({ enrolledCourses: res.data.courses, loading: false });
  },
  getLessonsFromEnrolledCourse: async (courseId: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${courseApi}/${courseId}/lessons`, addToken(token!));
    const data = {
      title: res.data.title,
      description: res.data.description,
      lessons: res.data.lessons,
    };
    set({ currentCourse: data, loading: false });
  },
  clearCourse: () => {
    set({ currentCourse: null });
  },
}));

export default useCourseStore;
