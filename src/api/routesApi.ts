import axios from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

const mainUrl = import.meta.env.BACKEND_URL || "http://localhost:8000";
export const instance = axios.create({
  baseURL: mainUrl,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers!["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const response = await instance.get("/api/auth/refresh-token", {
          _retry: true,
        });
        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (error) {
        console.error("Refresh token failed:", error);
        localStorage.removeItem("accessToken");
        return Promise.reject(error);
      }
    }
  }
);

export const authApi = "/api/auth";
export const userApi = "/api/users";
export const courseApi = "/api/courses";
export const lessonApi = "/api/lessons";
export const quizApi = "/api/quiz";
export const questionApi = "/api/questions";
export const statApi = "/api/statistics";
export const reportApi = "/api/reports";
export const testApi = "/testtoken";
