import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { reportSchema, type ReportFields } from "@/schemas/reportSchema";
import useReportStore from "@/stores/useReportStore";
import type { Report } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface SubmitReportDialogProps {
  quizId: number;
}

function SubmitReportDialog({ quizId } : SubmitReportDialogProps) {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<ReportFields>({
    resolver: zodResolver(reportSchema)
  });
  const { errors, isSubmitting } = formState;
  const { sendReport } = useReportStore();

  const onSubmit = async (data: ReportFields) => {
    const result = {
      issue: data.issue,
      detail: data.detail,
      quizId
    }

    try {
      const res = await sendReport(result as Report);
      toast.success(t(res.data.message));
      setOpenModal(false);
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message))
    }
  };

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger className="main-btn px-4 w-fit">Report</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit the report</DialogTitle>
          <DialogDescription>
            Report what issue you have experienced
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col w-full gap-1">
            {t("Issue")}
            <Input
              {...register("issue")}
              placeholder={t("Enter the issue")}
            />
            {errors.issue && (
              <p className="text-red-500 text-sm">
                {t(errors.issue?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Detail")}
            <Textarea
              {...register("detail")}
              placeholder={t("Enter the detail")}
            />
            {errors.detail && (
              <p className="text-red-500 text-sm">
                {t(errors.detail?.message!)}
              </p>
            )}
          </label>

          <Button type="submit" className="main-btn w-full" disabled={isSubmitting}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitReportDialog;
