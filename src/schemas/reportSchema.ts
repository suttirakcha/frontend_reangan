import { z } from "zod";

export const reportSchema = z.object({
  issue: z.string().nonempty("Please specify the issue"),
  detail: z.string().nonempty("Please specify the detail of the issue")
})

export type ReportFields = z.infer<typeof reportSchema>;