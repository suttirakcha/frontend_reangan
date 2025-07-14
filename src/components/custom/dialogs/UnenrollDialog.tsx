import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCourseStore from "@/stores/useCourseStore";
import { useTranslation } from "react-i18next";

interface UnenrollDialogProps {
  courseId: number;
}

function UnenrollDialog({ courseId }: UnenrollDialogProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { unenrollCourse } = useCourseStore();
  const handleUnenroll = async (courseId: number) => {
    try {
      const res = await unenrollCourse(courseId);
      toast.success(t(res.data.message));
      navigate("/dashboard/explore");
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{t("Unenroll")}</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("Unenroll this course?")}</DialogTitle>
          <DialogDescription>
            {t("NOTE")}:{" "}
            {t(
              "You will no longer access this course until you enroll it again."
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => handleUnenroll(courseId)}
          >
            {t("Unenroll")}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UnenrollDialog;
