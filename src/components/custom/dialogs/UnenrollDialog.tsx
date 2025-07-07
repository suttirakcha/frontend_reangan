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
import { useState } from "react";

interface DeleteAccountDialogProps {
  onConfirm: () => void;
}

function UnenrollDialog({ onConfirm } : DeleteAccountDialogProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger>
        <Button variant="destructive">Unenroll</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Unenroll this course?</DialogTitle>
          <DialogDescription>
            NOTE: You will no longer access this course until you enroll it again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>
            Unenroll
          </Button>
          <Button variant="ghost" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UnenrollDialog;
