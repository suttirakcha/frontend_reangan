import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginFields } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";
import BackBtn from "@/components/custom/BackBtn";
import { useTranslation } from "react-i18next";

const initialValues: LoginFields = {
  email: "",
  password: "",
};

function LoginPage() {
  const { t } = useTranslation();
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    defaultValues: initialValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await login(data);

      const { role } = res.data?.result;
      if (res) {
        navigate(role === "ADMIN" ? "/admin" : "/dashboard");
        toast.success(t(res.data.message));
      }
    } catch (err: any) {
      toast.error(t(err.response?.data?.message));
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
      <h1 className="title text-center mb-6">{t("Login to ReanGan")}</h1>
      <label className="flex flex-col w-full gap-1">
        {t("Email")}
        <Input {...register("email")} placeholder="example@mail.com" />
        {errors.email && (
          <p className="text-red-500 text-sm">{t(errors.email?.message!)}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        {t("Password")}
        <Input
          type="password"
          {...register("password")}
          placeholder={t("Enter your password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{t(errors.password?.message!)}</p>
        )}
      </label>

      <p className="text-center">
        {t("Don't have an account?")}{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
          {t("Register")}
        </Link>
      </p>

      <p className="text-center">
        <Link to="/forgot-password" className="text-orange-500 hover:underline">
          {t("Forgot password?")}
        </Link>
      </p>

      <Button disabled={isSubmitting} className="main-btn">
        {t(isSubmitting ? "Logging in..." : "Login")}
      </Button>
    </form>
  );
}

export default LoginPage;
