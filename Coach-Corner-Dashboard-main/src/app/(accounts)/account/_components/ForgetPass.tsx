"use client";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import z from "zod";
import useApp from "@/context/useApp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import fetchClient from "@/hooks/fetchClient";

const schema = z.object({
  email: z.string().email({ message: "Email is required" }),
});
type formType = z.infer<typeof schema>;
const ForgetPass = () => {
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
    },
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [success, setSuccess] = useState("");
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
      setSuccess("");
      const res = await fetchClient(`/api/Accounts/ForgotPassword?email=${data?.email}`);
      if(res && res?.succeeded){
        setSuccess(res?.messages[0]);
      }else{
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchParams && searchParams?.get("hardReload")) {
      const reload = searchParams?.get("hardReload");
      if (reload === "true") {
        router.push(pathname + "?" + createQueryString("hardReload", "false"));
      }
    }
  }, [searchParams]);

  return (
    <div className="wrapper-form">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[600px] mx-auto">
        <h2 className="h3 mb-4">Confirm Email</h2>
        {success && (
          <p className="py-4 font-medium text-green-600 px-2 border-green-300 border rounded mb-2 text-sm">
            {success}
          </p>
        )}
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
        <div className="field">
          <SubmitButton
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Submit
          </SubmitButton>
        </div>
        <div className="field">
          <span className="wrapper-create-account">
            <span>Already Have an account? </span>
            <Link href={"/account/login"} className="text-secondary font-medium">
              Log In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgetPass;
