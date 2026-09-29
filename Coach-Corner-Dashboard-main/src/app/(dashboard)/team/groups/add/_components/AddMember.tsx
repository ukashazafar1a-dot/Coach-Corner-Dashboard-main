import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";
import { footballTeamRoles } from "@/lib/teamRoles";

const schema = z
  .object({
    fName: z.string().min(1, { message: "First name is required" }),
    lName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email("Invalid email address"),
    teamRole: z.string().nullable().optional(),
    role: z.string().min(1, { message: "Role is required" }),
  })
  .refine((data) => data.role !== "Player" || data.teamRole, {
    message: "Team role is required.",
    path: ["teamRole"], 
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
      teamRole: "",
      role: "",
      fName: "",
      lName: "",
      email: "",
    },
  });
  const inviteRole = watch("role");
  const onSubmit = (data: formType) => {
    onChange(data);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <form
        className="form-wrapper p-2 border rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        </div>
        <div className="flex items-start justify-center gap-2 w-full flex-col md:flex-row">
          <div className="field basis-full md:basis-auto m-0 w-full">
            <label htmlFor="email" className="input--label">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              className="input--field"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-400 py-2 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="field basis-full md:basis-auto m-0 w-full">
            <label htmlFor="role" className="input--label">
              Role
            </label>
            <select
              id="role"
              value={watch("role")}
              onChange={(e) => {
                if(e.target.value == "Coach"){
                  setValue("role","Coach");
                  setValue("teamRole","Coach");
                }else{
                  setValue("role",e.target?.value)
                }
              }}
              className="input--field select--field"
            >
              <option value="" disabled>Select a role</option>
              <option value="Coach">Coach</option>
              <option value="Player">Player</option>
            </select>
            {errors.role && (
              <p className="text-red-400 py-2 text-sm">{errors.role.message}</p>
            )}
          </div>
        </div>
        {inviteRole === "Player" && (
          <div className="field">
            <label htmlFor="teamRole" className="input--label">
              Select Team Role
            </label>
            <select
              id="teamRole"
              className="input--field select--field"
              {...register("teamRole")}
            >
              {footballTeamRoles?.map((role) => (
                <option key={role?.value} value={role?.value}>
                  {role?.label}
                </option>
              ))}
            </select>
            {errors.teamRole && (
              <p className="text-red-400 py-2 text-sm">
                {errors.teamRole.message}
              </p>
            )}
          </div>
        )}
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
              type="button"
              onClick={handleSubmit(onSubmit)}
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
