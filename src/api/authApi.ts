import axios from "axios";

export const getApi = (url: string) => {
  const mainUrl = import.meta.env.BACKEND_URL || "http://localhost:8000";
  return axios.create({
    baseURL: mainUrl + url,
  });
};

export const authApi = getApi("/auth");
export const courseApi = getApi("/courses");
