"use client";
import PasswordField from "@/snippets/PasswordField";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useApp from "@/context/useApp";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SubmitButton from "@/components/SubmitButton";

const schema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Password is required" }),
});
type formType = z.infer<typeof schema>;
const LoginForm = () => {
  const { logIn, setToaster, setLoading } = useApp();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>([]);
  const [success, setSuccess] = useState(false);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const onSubmit = async (data: formType) => {
    try {
      setErrorMessage([]);
      const response = await logIn(data);
      //console.log("in login form", response);
      if (response && response?.succeeded) {
        router.push(
          `/organizations?hardReload=true${
            searchParams?.get("rb") ? "&rb=" + searchParams?.get("rb") : ""
          }`
        );
        router.refresh();
        setToaster("success", "Login successful. Redirecting to main page...");
        setSuccess(true);
        setErrorMessage([]);
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong!");
        setSuccess(false);
        setErrorMessage(response?.messages);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value);
  };
  useEffect(() => {
    if (searchParams && searchParams?.get("hardReload")) {
      const reload = searchParams?.get("hardReload");
      if (reload === "true") {
        router.push(pathname + "?" + createQueryString("hardReload", "false"));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {success ? (
        <>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-3">
              <AiOutlineLoading3Quarters className="icon icon-loading animate-spin !w-10 !h-10 fill-primary text-primary" />
            </div>
            <CardTitle>Almost done!</CardTitle>
            <CardDescription>{`We’re preparing everything and will be ready shortly.`}</CardDescription>
          </CardHeader>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="block bg-blur w-full"
          >
            <h2 className="text-left text-gray-700 text-lg">Login Form</h2>
            <div className="form-wrapper p-0 w-full">
              <div className="field w-full">
                <label htmlFor="Email" className="input--label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  autoComplete="email"
                  className="input--field"
                  {...register("email")}
                />
                {errors?.email && (
                  <p className="py-2 text-red-500 text-sm">
                    {errors?.email?.message}
                  </p>
                )}
              </div>
              <div className="field !mb-4">
                <label htmlFor="password" className="input--label">
                  Password
                </label>
                <PasswordField
                  name="password"
                  placeholder=""
                  value={watch("password")}
                  onChange={handlePasswordChange}
                />
                {errors?.password && (
                  <p className="py-2 text-red-500 text-sm">
                    {errors?.password?.message}
                  </p>
                )}
              </div>
            </div>
            {errorMessage &&
              errorMessage?.map((msg: any, index: number) => {
                return (
                  <p key={index} className="py-2 text-red-400 text-sm">
                    {msg}
                  </p>
                );
              })}
            <div className="w-full md:text-end">
              <Link
                href={"/account/forgetpassword?hardReload=true"}
                className="text-red-500 font-medium"
              >
                Forget Password ?
              </Link>
            </div>
            <div className="field">
              <SubmitButton
                loading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
              >
                Submit
              </SubmitButton>
            </div>

            <div className="block">
              <p className="m-0">
                New to Coach Corner?{" "}
                <a
                  href="https://coachcorner.pages.dev/pricing"
                  target="_blank"
                  className="text-primary font-medium"
                >
                  Create New Account<span aria-hidden="true">&rarr;</span>
                </a>
              </p>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default LoginForm;
