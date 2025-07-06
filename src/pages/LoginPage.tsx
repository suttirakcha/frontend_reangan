import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type LoginFields } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackToHomeBtn from "@/components/custom/BackToHomeBtn";
import { Input } from "@/components/ui/input";
import useUserStore from "@/stores/useUserStore";
import { toast } from "sonner";

const initialValues: LoginFields = {
  email: "",
  password: "",
};

function LoginPage() {
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
      await new Promise((resolve, reject) => setTimeout(resolve, 2000));
      const res = await login(data);
      if (res){
        navigate("/dashboard");
        toast.success(res.data.message);
      };
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    } finally {
      reset()
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackToHomeBtn className="justify-center" />
      <h1 className="title text-center mb-6">Login to ReanGan</h1>
      <label className="flex flex-col w-full gap-1">
        Email
        <Input {...register("email")} placeholder="example@mail.com" />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        Password
        <Input type="password" {...register("password")} placeholder="Enter your password" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </label>

      <p className="text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-orange-500 hover:underline">
          Register
        </Link>
      </p>

      <p className="text-center">
        <Link to="/register" className="text-orange-500 hover:underline">
          Forgot Password?
        </Link>
      </p>

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

export default LoginPage;
