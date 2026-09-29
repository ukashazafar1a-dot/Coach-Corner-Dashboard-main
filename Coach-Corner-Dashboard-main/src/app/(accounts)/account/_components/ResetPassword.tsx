"use client";
import SubmitButton from "@/components/SubmitButton";
import { Skeleton } from "@/components/ui/skeleton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import PasswordField from "@/snippets/PasswordField";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

const schema = z
  .object({
    email: z.string().nullable(),
    code: z.string().nullable(),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Confirm password doesn't match with password.",
      path: ["confirmPassword"],
    }
  );
type formType = z.infer<typeof schema>;
const ResetPassword = () => {
  const searchParams = useSearchParams();
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: searchParams.get("e") || "",
      code: searchParams.get("code") || "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { setToaster, user } = useApp();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<any>([]);
  const [brokenLink, setBrokenLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const newPass = watch("newPassword");
  const pathname = usePathname();
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
      if (!data.email || !data.code) {
        setErrorMessage(["Invalid Link"]);
        return;
      }
      const res = await fetchClient("/api/Accounts/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res && res?.succeeded) {
        setSuccessMessage(res.messages[0]);
        reset();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  useEffect(() => {
    if (searchParams) {
      const email = searchParams.get("e");
      const code = searchParams.get("code");
      if (!email || !code) {
        setBrokenLink(true);
      } else {
        setBrokenLink(false);
        setValue("email", email);
        setValue("code", code);
      }
    }
    if (searchParams && searchParams?.get("hardReload")) {
      const reload = searchParams?.get("hardReload");
      if (reload === "true") {
        router.push(pathname + "?" + createQueryString("hardReload", "false"));
      }
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <>
          <Skeleton className="h-14 w-full mb-3" />
          <Skeleton className="h-14 w-full mb-3" />
          <Skeleton className="h-14 w-full mb-3" />
        </>
      ) : (
        <>
          {brokenLink ? (
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Opss! Something went wrong.
              </h1>
              <p className="text-gray-500 mb-3">
                The link you are trying to access is broken. Please try again.
              </p>
              <Link href="/" className="btn btn--primary w-fit mx-auto">
                Back to Home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-[600px] mx-auto"
            >
              <h2 className="h3 mb-2">Reset Password</h2>
              {successMessage ? (
                <>
                  <div className="py-4 font-medium text-green-600 px-2 border-green-300 border rounded mb-3">
                    {successMessage}
                  </div>
                  <Link href={"/account/login"} className="btn btn--primary">
                    Login Now
                  </Link>
                </>
              ) : (
                <>
                  <div className="field !mb-4">
                    <label htmlFor="password" className="input--label">
                      Password
                    </label>
                    <PasswordField
                      name="password"
                      placeholder=""
                      value={watch("newPassword")}
                      onChange={(e) => setValue("newPassword", e.target.value)}
                    />
                    {errors?.newPassword && (
                      <p className="py-2 text-red-500 text-sm">
                        {errors?.newPassword?.message}
                      </p>
                    )}
                  </div>
                  {!errorMessage && (
                    <>
                      {newPass?.length > 3 && !errors?.newPassword && (
                        <div className="py-2">
                          <p className="text-sm text-gray-700">
                            Least 8 characters, at least one number (0-9) or
                            symbol, and a combination of lowercase (a-z) and
                            uppercase (A-Z).
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <div className="field mb-3">
                    <label htmlFor="confirmPassword" className="input--label">
                      Confirm Password
                    </label>
                    <PasswordField
                      name="confirmPassword"
                      placeholder=""
                      value={watch("confirmPassword")}
                      onChange={(e) =>
                        setValue("confirmPassword", e.target.value)
                      }
                    />
                    {errors?.confirmPassword && (
                      <p className="py-2 text-sm font-medium text-red-400">
                        {errors?.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                  {errorMessage &&
                    errorMessage?.map((msg: any, index: number) => {
                      return (
                        <p key={index} className="py-2 text-red-400 text-sm">
                          {msg}
                        </p>
                      );
                    })}
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
                      <span>Already Remember the password? </span>
                      <Link href={"/account/login"} className="text-secondary">
                        Login Now
                      </Link>
                    </span>
                  </div>
                </>
              )}
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
