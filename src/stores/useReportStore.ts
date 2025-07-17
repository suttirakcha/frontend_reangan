import { create } from "zustand";
import useUserStore from "./useUserStore";
import { reportApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { Report, ReportState } from "@/types";

const useReportStore = create<ReportState>()((set, get) => ({
  reports: [],
  getReports: async () => {
    const token = useUserStore.getState().accessToken;
    const res = await reportApi.get("/", addToken(token!));
    set({ reports: res.data.reports });
  },
  getReportById: async (reportId: number) => {
    const token = useUserStore.getState().accessToken;
    const res = await reportApi.get(`/${reportId}`, addToken(token!));
    return res;
  },
  sendReport: async (data: Report) => {
    const token = useUserStore.getState().accessToken;
    const res = await reportApi.post("/", data, addToken(token!));
    return res;
  },
  resolveIssues: async (isResolved: boolean) => {
    const token = useUserStore.getState().accessToken;
    const res = await reportApi.post("/", { isResolved }, addToken(token!));
    return res;
  },
}));

export default useReportStore;
