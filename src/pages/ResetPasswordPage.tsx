import BackBtn from "@/components/custom/BackBtn";
import { type ResetPasswordFields } from "@/schemas/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ResetPasswordPage() {
  const { t } = useTranslation();
  const { token } = useParams();
  const { register, handleSubmit, formState } = useForm<ResetPasswordFields>();
  const { errors, isSubmitting } = formState;

  const resetPassword = useUserStore(state => state.resetPassword);
  const resetPasswordToken = useUserStore(state => state.resetPasswordToken);

  const onSubmit = async (data: ResetPasswordFields) => {
    try {
      const res = await resetPassword(data, resetPasswordToken!);
      toast.success(t(res.data.message));
    } catch (err: any){
      toast.error(err.response?.data.message || err.message)
    }
  };

  if (token !== resetPasswordToken){
    return <Navigate to="/" />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackBtn className="justify-center" text="Back to Homepage" />
      <h1 className="title text-center mb-6">Enter your new password?</h1>
      <label className="flex flex-col w-full gap-1">
        New password
        <Input {...register("password")} type="password" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </label>

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default ResetPasswordPage;
