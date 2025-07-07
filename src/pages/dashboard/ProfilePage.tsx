import DashboardSection from "@/components/dashboard/DashboardSection";
import DeleteAccountDialog from "@/components/custom/dialogs/DeleteAccountDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type UserFields, userSchema } from "@/schemas/userSchema";
import useUserStore from "@/stores/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const logout = useUserStore((state) => state.logout);
  const { register, formState, handleSubmit, reset } = useForm<UserFields>({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
    resolver: zodResolver(userSchema),
  });
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data: UserFields) => {
    try {
      const res = await updateUser(data);
      toast.success(res.data.message);
      reset();
    } catch (err: any) {
      toast.error(err.response?.data.error || err.message);
    }
  };

  return (
    <DashboardSection
      title="Profile"
      description="Your profile information will display here, you can also update your profile here"
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col w-full gap-1">
          Username
          <Input {...register("username")} placeholder="Enter your username" />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          Email
          <Input {...register("email")} placeholder="Enter your email" />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          Current password
          <Input
            {...register("current_password", {
              required: false,
            })}
            type="password"
            placeholder="Enter your current password"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </label>
        <label className="flex flex-col w-full gap-1">
          New password
          <Input
            {...register("new_password", {
              required: false,
            })}
            type="password"
            placeholder="Enter your new password"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username?.message}</p>
          )}
        </label>

        <Button disabled={isSubmitting} className="main-btn">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>

        <div className="flex items-center justify-between">
          <DeleteAccountDialog onConfirm={() => {}} />
          <Button
            variant="ghost"
            className="ghost-btn !w-fit p-0"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </form>
    </DashboardSection>
  );
}

export default ProfilePage;
