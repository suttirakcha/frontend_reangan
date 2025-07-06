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

function DeleteAccountDialog({ onConfirm } : DeleteAccountDialogProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Dialog onOpenChange={setOpenModal} open={openModal}>
      <DialogTrigger className="text-red-500 hover:text-red-400 w-fit cursor-pointer">Delete account</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Are you sure to delete your account?</DialogTitle>
          <DialogDescription>
            NOTE: This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>
            Sure, delete my account
          </Button>
          <Button variant="ghost" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountDialog;
