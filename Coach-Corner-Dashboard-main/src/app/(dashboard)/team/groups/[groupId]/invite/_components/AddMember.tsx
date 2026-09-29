import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";

const schema = z
  .object({
    fName: z.string().min(3, { message: "First name is required" }),
    lName: z.string().min(3, { message: "Last name is required" }),
    email: z.string().email("Invalid email address"),
  });
type formType = z.infer<typeof schema>;
const AddMember = ({ onChange, onRemove }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
    },
  });
  const onSubmit = (data: formType) => {
    onChange(data);
  };
  return (
    <div className="w-full block">
      <form
        className="form-wrapper p-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="mb-2 text-base text-gray-800 font-semibold">Add Member</p>
        <div className="flex items-start justify-center gap-2 w-full flex-col md:flex-row">
          <div className="field basis-full md:basis-auto m-0 w-full">
            <label htmlFor="fName" className="input--label">
              First Name
            </label>
            <input
              type="text"
              id="fName"
              className="input--field"
              {...register("fName")}
            />
            {errors.fName && (
              <p className="text-red-400 py-2 text-sm">
                {errors.fName.message}
              </p>
            )}
          </div>
          <div className="field basis-full md:basis-auto m-0 w-full">
            <label htmlFor="lName" className="input--label">
              Last Name
            </label>
            <input
              type="text"
              id="lName"
              className="input--field"
              {...register("lName")}
            />
            {errors.lName && (
              <p className="text-red-400 py-2 text-sm">
                {errors.lName.message}
              </p>
            )}
          </div>
          <div className="field basis-full md:basis-auto m-0 w-full">
            <label htmlFor="email" className="input--label">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="on"
              className="input--field"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 py-2 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => onRemove()}
              className="btn btn--secondary"
            >
              Cancel
            </button>
            <SubmitButton
              loading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
            >
              Save
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
