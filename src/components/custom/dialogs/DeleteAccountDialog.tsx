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
import { useState } from "react";
import { toast } from "sonner";
import useUserStore from "@/stores/useUserStore";
import { useTranslation } from "react-i18next";

function DeleteAccountDialog() {
  const { t } = useTranslation();
  const { deleteUser, logout } = useUserStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await deleteUser();
      toast.success(t(res.data.message));
      logout();
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-red-500 hover:text-red-400 w-fit cursor-pointer">
        {t("Delete account")}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("Are you sure to delete your account?")}</DialogTitle>
          <DialogDescription>
            {t("NOTE")}:{" "}
            {t(
              "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteAccount}
          >
            {t(isDeleting ? "Deleting..." : "Sure, delete my account")}
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountDialog;
