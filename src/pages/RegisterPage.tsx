import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema, type RegisterFields } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackToHomeBtn from "@/components/custom/BackToHomeBtn";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useUserStore from "@/stores/useUserStore";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

function RegisterPage() {
  const registerUser = useUserStore(state => state.register);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    defaultValues: initialValues,
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await registerUser(data);
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto flex flex-col gap-4 p-5 w-full h-[80vh] anim-fade"
    >
      <BackToHomeBtn className="justify-center" />
      <h1 className="title text-center mb-6">Register to start learning</h1>
      <label className="flex flex-col w-full gap-1">
        Username
        <Input {...register("username")}placeholder="Enter your username" />
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
        Password
        <Input type="password" {...register("password")} placeholder="Enter your password" />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        )}
      </label>
      <label className="flex flex-col w-full gap-1">
        Confirm password
        <Input type="password" {...register("confirm_password")} placeholder="Enter your confirm password" />
        {errors.confirm_password && (
          <p className="text-red-500 text-sm">
            {errors.confirm_password?.message}
          </p>
        )}
      </label>

      <p className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 hover:underline">
          Login
        </Link>
      </p>

      <Button disabled={isSubmitting} className="main-btn">
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default RegisterPage;
