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
import {
  lessonDetailSchema,
  type LessonDetailFields,
} from "@/schemas/courseDetailSchema";
import useAdminLessonStore from "@/stores/useAdminLessonStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import AdminQuizzesSection from "../AdminQuizzesSection";

interface AdminLessonDialogProps {
  trigger: ReactNode;
  courseId?: number;
  id?: number;
}

function AdminLessonDialog({ trigger, courseId, id }: AdminLessonDialogProps) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { createLesson, updateLesson, lessons } = useAdminLessonStore();
  const { register, handleSubmit, formState } = useForm<LessonDetailFields>({
    resolver: zodResolver(lessonDetailSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: LessonDetailFields) => {
    try {
      const res = await (id
        ? updateLesson(data, id)
        : createLesson({
            title: data.title,
            description: data.description,
            courseId,
            quizzes: [],
          }));
      toast.success(t(res.data.message));
      setOpenModal(false);
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };

  const findLesson = id
    ? lessons?.find((lesson: any) => lesson.id === id)
    : undefined;

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? "Update lesson" : "Add lesson"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col w-full gap-1">
            {t("Lesson title")}
            <Input
              {...register("title")}
              placeholder={t("Enter the lesson title")}
              defaultValue={id ? findLesson?.title : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">
                {t(errors.title?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Description")}
            <Input
              {...register("description")}
              placeholder={t("Describe what your course is about")}
              defaultValue={id ? findLesson?.description : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {t(errors.description?.message!)}
              </p>
            )}
          </label>
          <label className="flex flex-col w-full gap-1">
            {t("Quizzes")}
            <AdminQuizzesSection
              quizzes={findLesson?.quizzes!}
              lessonId={findLesson?.id!}
            />
          </label>
          <Button
            type="submit"
            className="main-btn w-full"
            disabled={isSubmitting}
          >
            {id ? "Update" : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdminLessonDialog;
