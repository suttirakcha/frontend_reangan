import { instance, statApi } from "@/api/routesApi";
import { create } from "zustand";
import { addToken } from "@/lib/utils";
import type { StatisticsState, Statistics } from "@/types";

const useStatStore = create<StatisticsState>()((set) => ({
  statistics: null,
  achievements: [],
  getStatistics: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${statApi}/`, addToken(token!));
    set({ statistics: res.data.statistics });
  },
  createStatistics: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${statApi}/`, {
      exp: 0,
      incorrect_answered: 0,
      correct_answered: 0
    }, addToken(token!));
    set({ statistics: res.data.statistics });
  },
  updateExp: async (data: Statistics) => {
    const token = localStorage.getItem("accessToken");
    await instance.patch(`${statApi}/`, data, addToken(token!));
  },
}));

export default useStatStore;
