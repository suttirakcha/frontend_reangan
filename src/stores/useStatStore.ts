import { statApi } from "@/api/routesApi";
import { create } from "zustand";
import useUserStore from "./useUserStore";
import { addToken } from "@/lib/utils";
import type { StatisticsState, Statistics } from "@/types";

const useStatStore = create<StatisticsState>()((set, get) => ({
  statistics: null,
  achievements: [],
  getStatistics: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await statApi.get("/", addToken(token!));
    set({ statistics: res.data.statistics });
  },
  createStatistics: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await statApi.post("/", {}, addToken(token!));
    set({ statistics: res.data.statistics });
  },
  updateExp: async (data: Statistics) => {
    const token = useUserStore.getState().accessToken;
    await statApi.patch("/", data, addToken(token!));
  },
}));

export default useStatStore;
