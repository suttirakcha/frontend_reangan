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

interface UnenrollDialogProps {
  courseId: number;
}

function UnenrollDialog({ courseId }: UnenrollDialogProps) {
  const navigate = useNavigate();
  const { unenrollCourse } = useCourseStore();
  const handleUnenroll = async (courseId: number) => {
    try {
      const res = await unenrollCourse(courseId);
      toast.success(res.data.message);
      navigate("/dashboard/explore");
    } catch (err: any) {
      toast.error(err.response?.data.message || err.message);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Unenroll</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Unenroll this course?</DialogTitle>
          <DialogDescription>
            NOTE: You will no longer access this course until you enroll it
            again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => handleUnenroll(courseId)}
          >
            Unenroll
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UnenrollDialog;
