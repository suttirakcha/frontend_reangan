import BackBtn from "@/components/custom/BackBtn";
import { type ForgotPasswordFields } from "@/schemas/forgotPasswordSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";
import { useState } from "react";

function ForgotPasswordPage() {
  const { register, handleSubmit, formState } = useForm<ForgotPasswordFields>();
  const { errors, isSubmitting } = formState;

  const [requestLink, setRequestLink] = useState("");
  const requestForgotPassword = useUserStore(state => state.requestForgotPassword);

  const onSubmit = async (data: ForgotPasswordFields) => {
    try {
      const res = await requestForgotPassword(data);
      toast.success(res.data.message);
      setRequestLink(`/reset-password/${res.data.resetPasswordToken}`);
    } catch (err: any){
      toast.error(err.response?.data.message || err.message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackBtn className="justify-center" text="Back to Homepage" />
      <h1 className="title text-center mb-6">Forgot password?</h1>
      <label className="flex flex-col w-full gap-1">
        Enter your email
        <Input {...register("email")} placeholder="example@mail.com" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </label>

      <p>You will receive the link to reset the password.</p>
      {requestLink && <a href={requestLink}>Click here to reset password</a>}

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default ForgotPasswordPage;
