import { create } from "zustand";
import { instance, reportApi } from "@/api/routesApi";
import { addToken } from "@/lib/utils";
import type { Report, ReportState } from "@/types";

const useReportStore = create<ReportState>()((set, get) => ({
  reports: [],
  getReports: async () => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${reportApi}/`, addToken(token!));
    set({ reports: res.data.reports });
  },
  getReportById: async (reportId: number) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.get(`${reportApi}/${reportId}`, addToken(token!));
    return res;
  },
  sendReport: async (data: Report) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${reportApi}/`, data, addToken(token!));
    return res;
  },
  resolveIssues: async (isResolved: boolean) => {
    const token = localStorage.getItem("accessToken");
    const res = await instance.post(`${reportApi}/`, { isResolved }, addToken(token!));
    return res;
  },
}));

export default useReportStore;
