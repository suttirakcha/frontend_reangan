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
  const [errorText, setErrorText] = useState("");
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const requestForgotPassword = useUserStore(state => state.requestForgotPassword);

  const onSubmit = async (data: ForgotPasswordFields) => {
    try {
      const res = await requestForgotPassword(data);
      toast.success(res.data.message);
      setErrorText("");
    } catch (err: any){
      setErrorText(err.response?.data.message || err.message)
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
      {errorText && <p>{errorText}</p>}
      {isSubmitSuccessful && !errorText && <p>Your request has sent to your email. Please check your email.</p>}

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}

export default ForgotPasswordPage;
