import BackBtn from "@/components/custom/BackBtn";
import { type ForgotPasswordFields } from "@/schemas/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<ForgotPasswordFields>();
  const [errorText, setErrorText] = useState("");
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const requestForgotPassword = useUserStore(
    (state) => state.requestForgotPassword
  );

  const onSubmit = async (data: ForgotPasswordFields) => {
    try {
      const res = await requestForgotPassword(data);
      toast.success(t(res.data.message));
      setErrorText("");
    } catch (err: any) {
      setErrorText(t(err.response?.data.message || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackBtn className="justify-center" text={t("Back to Homepage")} />
      <h1 className="title text-center mb-6">{t("Forgot password?")}</h1>
      <label className="flex flex-col w-full gap-1">
        {t("Enter your email")}
        <Input {...register("email")} placeholder="example@mail.com" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </label>

      <div className="text-center space-y-1">
        <p>You will receive the link to reset the password.</p>
        {errorText && <p className="text-red-500">{errorText}</p>}
        {isSubmitSuccessful && !errorText && (
          <p>Your request has sent to your email. Please check your email.</p>
        )}
      </div>

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default ForgotPasswordPage;
