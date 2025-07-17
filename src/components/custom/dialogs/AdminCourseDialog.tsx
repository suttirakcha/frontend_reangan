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
  courseDetailSchema,
  type CourseDetailFields,
} from "@/schemas/courseDetailSchema";
import useAdminCourseStore from "@/stores/useAdminCourseStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface AdminCourseDialogProps {
  trigger: ReactNode;
  id?: number;
}

function AdminCourseDialog({ trigger, id }: AdminCourseDialogProps) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { createCourse, getCourses, updateCourse, courses } =
    useAdminCourseStore();
  const { register, handleSubmit, formState } = useForm<CourseDetailFields>({
    resolver: zodResolver(courseDetailSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: CourseDetailFields) => {
    try {
      const res = await (id
        ? updateCourse(data, id)
        : createCourse(data));
      toast.success(t(res.data.message));
      await getCourses();
      setOpenModal(false);
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };

  const findCourse = id
    ? courses?.find((course) => course.id === id)
    : undefined;

  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{id ? "Update course" : "Add course"}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col w-full gap-1">
            {t("Course title")}
            <Input
              {...register("title")}
              placeholder={t("Enter the course title")}
              defaultValue={id ? findCourse?.title : ""}
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
              defaultValue={id ? findCourse?.description : ""}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {t(errors.description?.message!)}
              </p>
            )}
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

export default AdminCourseDialog;
