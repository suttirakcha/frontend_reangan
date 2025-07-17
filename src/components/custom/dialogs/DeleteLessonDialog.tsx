import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAdminLessonStore from "@/stores/useAdminLessonStore";
import { Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface DeleteAccountDialogProps {
  id: number;
  setId: () => void;
}

function DeleteLessonDialog({
  id,
  setId,
}: DeleteAccountDialogProps) {
  const { t } = useTranslation();
  const { getLessons, deleteLesson } = useAdminLessonStore();

  const handleLessonCourse = async () => {
    try {
      const res = await deleteLesson(id);
      toast.success(t(res.data.message));
      await getLessons();
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="text-red-600 w-5 h-5" onClick={setId} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this lesson?</DialogTitle>
        </DialogHeader>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleLessonCourse}
          >
            {t("Delete")}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteLessonDialog;
