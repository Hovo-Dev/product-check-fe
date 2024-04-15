import { useForm } from "react-hook-form";
import Input from "@/atom/Input.tsx";
import { EInputType } from "@/types/input.ts";
import useLoginUser from "@/api/login.api.ts";
import AuthLayout from "@/layout/AuthLayout.tsx";
import type { ILoginPayload } from "@/api/login.api.ts";
import Button from "@/atom/Button.tsx";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    mode: "onSubmit",
  });

  const { executeFn, isLoading } = useLoginUser();

  const onLoginSubmitHandler = async (data: ILoginPayload) => {
    await executeFn(data);
  };

  return (
    <AuthLayout>
      <section className="max-w-[300px] m-auto">
        <h1 className="text-xl text-center mb-14">Login Page</h1>
        <form onSubmit={handleSubmit(onLoginSubmitHandler)} className="flex flex-col space-y-4">
          <Input
            register={register}
            rules={{ required: "Username Required" }}
            maxLength={25}
            placeholder="Username"
            name="username"
            error={errors.username?.message}
          />
          <Input
            register={register}
            rules={{ required: "Password Required" }}
            placeholder="Password"
            name="password"
            type={EInputType.Password}
            error={errors.password?.message}
          />
          <Button type="submit" disabled={isLoading}>
            Login
          </Button>
        </form>
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
