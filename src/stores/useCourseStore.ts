import { courseApi } from "@/api/routesApi";
import { type CourseState } from "@/types";
import { create } from "zustand";
import useUserStore from "./useUserStore";
import { addToken } from "@/lib/utils";

const useCourseStore = create<CourseState>()((set) => ({
  courses: [],
  enrolledCourses: [],
  currentCourse: null,
  loading: true,
  getCourses: async () => {
    const res = await courseApi.get("/");
    set({ courses: res.data.courses, loading: false, currentCourse: null });
  },
  enrollCourse: async (courseId: number) => {
    const { accessToken: token } = useUserStore.getState();
    const res = await courseApi.post(`/${courseId}`, {}, addToken(token!));
    return res;
  },
  getEnrolledCourses: async () => {
    const { accessToken: token } = useUserStore.getState();
    const res = await courseApi.get(`/enrolled`, addToken(token!));
    set({ enrolledCourses: res.data.courses, loading: false });
  },
  getLessonsFromEnrolledCourse: async (courseId: number) => {
    const { accessToken: token } = useUserStore.getState();
    const res = await courseApi.get(`/${courseId}/lessons`, addToken(token!));
    const data = {
      title: res.data.title,
      description: res.data.description,
      lessons: res.data.lessons
    }
    set({ currentCourse: data, loading: false })
  },
}));

export default useCourseStore;
