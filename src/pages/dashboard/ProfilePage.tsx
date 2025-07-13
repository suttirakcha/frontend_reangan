import DashboardSection from "@/components/dashboard/DashboardSection";
import DeleteAccountDialog from "@/components/custom/dialogs/DeleteAccountDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type UserFields, userSchema } from "@/schemas/userSchema";
import useUserStore from "@/stores/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import StatCard from "@/components/dashboard/StatCard";
import { useTranslation } from "react-i18next";

function ProfilePage() {
  const { t } = useTranslation();
  const { user, updateUser, logout } = useUserStore();
  const { register, formState, handleSubmit, reset } = useForm<UserFields>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
    resolver: zodResolver(userSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<UserFields> = async (data: UserFields) => {
    try {
      const res = await updateUser(data);
      toast.success(t(res.data.message));
      reset();
    } catch (err: any) {
      toast.error(t(err.response?.data.message || err.message));
    }
  };

  return (
    <DashboardSection
      title={t("Profile")}
      description={t("Your profile information will display here, you can also update your profile here")}
      className="grid grid-cols-5 gap-12"
    >
      <form
        className="flex flex-col gap-4 col-span-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col w-full gap-1">
          {t("Username")}
          <Input {...register("username")} placeholder={t("Enter your username")} />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          {t("Email")}
          <Input {...register("email")} placeholder={t("Enter your email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          {t("Current password")}
          <Input
            {...register("current_password", {
              required: false,
            })}
            type="password"
            placeholder={t("Enter your current password")}
          />
          {errors.current_password && (
            <p className="text-red-500 text-sm">
              {errors.current_password?.message}
            </p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          {t("New password")}
          <Input
            {...register("new_password", {
              required: false,
            })}
            type="password"
            placeholder={t("Enter your new password")}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm">
              {errors.new_password?.message}
            </p>
          )}
        </label>

        <Button disabled={isSubmitting} className="main-btn">
          {isSubmitting ? t("Updating...") : t("Update")}
        </Button>

        <div className="flex items-center justify-between">
          <DeleteAccountDialog />
          <Button
            variant="ghost"
            className="ghost-btn !w-fit p-0"
            onClick={logout}
          >
            {t("Logout")}
          </Button>
        </div>
      </form>
      <div className="space-y-6 col-span-2">
        <div className="space-y-2">
          <h2 className="title">{user?.username}</h2>
          <p>{user?.email}</p>
        </div>

        <StatCard />
      </div>
    </DashboardSection>
  );
}

export default ProfilePage;
