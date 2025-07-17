import axios from "axios";

export const getApi = (url: string) => {
  const mainUrl = (import.meta.env.BACKEND_URL || "http://localhost:8000") + "/api";
  return axios.create({
    baseURL: mainUrl + url,
  });
};

export const authApi = getApi("/auth");
export const userApi = getApi("/users");
export const courseApi = getApi("/courses");
export const lessonApi = getApi("/lessons");
export const quizApi = getApi("/quiz")
export const questionApi = getApi("/questions")
export const statApi = getApi("/statistics")
export const reportApi = getApi("/reports")