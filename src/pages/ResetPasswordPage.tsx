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
  const { resetPassword, resetPasswordToken } = useUserStore();

  const onSubmit = async (data: ResetPasswordFields) => {
    try {
      const res = await resetPassword(data, resetPasswordToken!);
      toast.success(t(res.data.message));
    } catch (err: any){
      toast.error(t(err.response?.data.message || err.message))
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
      <BackBtn className="justify-center" text={t("Back to Homepage")} />
      <h1 className="title text-center mb-6">{t("Enter your new password")}</h1>
      <label className="flex flex-col w-full gap-1">
        {t("New password")}
        <Input {...register("password")} type="password" placeholder={t("Enter your new password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{t(errors.password?.message!)}</p>
        )}
      </label>

      <Button disabled={isSubmitting} className="main-btn">
        {t(isSubmitting ? "Submitting..." : "Submit")}
      </Button>
    </form>
  );
}

export default ResetPasswordPage;
