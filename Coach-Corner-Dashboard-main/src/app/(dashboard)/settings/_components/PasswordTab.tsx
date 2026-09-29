"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
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
const PasswordTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const {setToaster} = useApp();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false)
  const newPass = watch("newPassword");
  const onSubmit = async (data: formType) => {
    try {
      const res = await fetchClient(`/api/Accounts/ChangePassword`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if(res && res?.succeeded){
        setToaster("success", res?.messages[0] || "Password updated successfully");
        reset();
      }else{
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="pb-8 max-w-screen-sm me-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="block">
          <div className="basis-full md:basis-auto w-full password mb-3">
            <label htmlFor="oldPassword" className="input_label">
              Old Password
            </label>
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                id="oldPassword"
                className="input--field"
                {...register("oldPassword")}
              />
              <span
                className="absolute right-0 top-[10px] me-2 cursor-pointer"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? (
                  <AiOutlineEye className="icon icon-eye !w-5 !h-5" />
                ) : (
                  <AiOutlineEyeInvisible className="icon icon-eye !w-5 !h-5" />
                )}
              </span>
            </div>
            {errors?.oldPassword && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.oldPassword?.message}
              </p>
            )}
          </div>
          <div className="basis-full md:basis-auto w-full password mb-3">
            <label htmlFor="newPassword" className="input_label">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="input--field"
                {...register("newPassword")}
              />
              <span
                className="absolute right-0 top-[10px] me-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEye className="icon icon-eye !w-5 !h-5" />
                ) : (
                  <AiOutlineEyeInvisible className="icon icon-eye !w-5 !h-5" />
                )}
              </span>
            </div>
            {errors?.newPassword && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.newPassword?.message}
              </p>
            )}
          </div>
          <div className="basis-full md:basis-auto w-full password mb-3">
            <label htmlFor="c-password" className="input_label">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="c-password"
                className="input--field"
                {...register("confirmPassword")}
              />
              <span
                className="absolute right-0 top-[10px] me-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEye className="icon icon-eye !w-5 !h-5" />
                ) : (
                  <AiOutlineEyeInvisible className="icon icon-eye !w-5 !h-5" />
                )}
              </span>
            </div>
            {errors?.confirmPassword && (
              <p className="py-2 text-red-400 font-medium text-sm">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>
        </div>
        {newPass?.length > 3 && !errors?.newPassword && (
          <div className="py-2">
            <p className="text-sm text-gray-700">
              Least 8 characters, at least one number (0-9) or symbol, and a
              combination of lowercase (a-z) and uppercase (A-Z).
            </p>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 p-2">
          <SubmitButton
            className="btn btn--primary"
            loading={isSubmitting}
            disabled={isSubmitting}
            type="submit"
          >
            Update
          </SubmitButton>
        </div>
      </form>
    </div>
  );
};

export default PasswordTab;
