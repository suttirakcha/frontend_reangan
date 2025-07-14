import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type RegisterFields } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useUserStore from "@/stores/useUserStore";
import BackBtn from "@/components/custom/BackBtn";
import { useTranslation } from "react-i18next";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerUser = useUserStore(state => state.register);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    defaultValues: initialValues,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await registerUser(data);
      toast.success(t(res.data.message));
      navigate("/login")
    } catch (err: any) {
      toast.error(t(err.response?.data?.message))
    } finally {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackBtn className="justify-center" text={t("Back to Homepage")} />
      <h1 className="title text-center mb-6">{t("Register to start learning")}</h1>
      <label className="flex flex-col w-full gap-1">
        {t("Username")}
        <Input {...register("username")}placeholder={t("Enter your username")} />
        {errors.username && (
          <p className="text-red-500 text-sm">{t(errors.username?.message!)}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        {t("Email")}
        <Input {...register("email")} placeholder={t("Enter your email")} />
        {errors.email && (
          <p className="text-red-500 text-sm">{t(errors.email?.message!)}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        {t("Password")}
        <Input type="password" {...register("password")} placeholder={t("Enter your password")} />
        {errors.password && (
          <p className="text-red-500 text-sm">{t(errors.password?.message!)}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        {t("Confirm password")}
        <Input type="password" {...register("confirm_password")} placeholder={t("Enter your confirm password")} />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">
            {t(errors.confirm_password?.message!)}
          </p>
        )}
      </label>

      <p className="text-center">
        {t("Already have an account?")}{" "}
        <Link to="/login" className="text-orange-500 hover:underline">
          {t("Login")}
        </Link>
      </p>

      <Button disabled={isSubmitting} className="main-btn">
        {t(isSubmitting ? "Registering..." : "Register")}
      </Button>
    </form>
  );
}

export default RegisterPage;
