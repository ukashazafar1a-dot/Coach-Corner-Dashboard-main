"use client";
import GroupSelect from "@/components/GroupSelect";
import SubmitButton from "@/components/SubmitButton";
import { Switch } from "@/components/ui/switch";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import { footballTeamRoles } from "@/lib/teamRoles";
import { getFutureDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SuccessLink from "./SuccessLink";

const schema = z.object({
  groupId: z.string().nullable(),
  inviteType: z.string().min(3, { message: "InviteType is required" }),
  users: z.any().nullable(),
  limited: z.coerce.number().min(0, { message: "Limited is required" }),
  expirationDate: z.string().min(3, { message: "Expiration Date is required" }),
  status: z.string().min(3, { message: "Status is required" }),
  role: z.enum(["Player", "Coach"]),
  teamRole: z.string().min(1, { message: "Team Role is required" }),
  rules: z.object({
    isPhoneRequired: z.boolean(),
    isAgeRequired: z.boolean(),
    isHeighRequired: z.boolean(),
    isWeightRequired: z.boolean(),
    isParentEmailRequired: z.boolean(),
    isParentPhoneRequired: z.boolean(),
  }),
});

type formType = z.infer<typeof schema>;
type objeItem = {
  inviteCode: string;
  expireAt: string;
};
const InviteViaLink = () => {
  const { selectedTeam, setToaster } = useApp();
  const [limit, setLimit] = useState(true);
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
      groupId: null,
      inviteType: "Link",
      users: null,
      limited: 0,
      expirationDate: undefined,
      status: "Active",
      role: "Coach",
      teamRole: "Coach",
      rules: {
        isPhoneRequired: true,
        isAgeRequired: true,
        isHeighRequired: true,
        isWeightRequired: true,
        isParentEmailRequired: true,
        isParentPhoneRequired: true,
      },
    },
  });
  const role = watch("role");
  const [noGroup, setNoGroup] = useState(true);
  const [success, setSuccess] = useState(false);
  const [obje, setObje] = useState<objeItem | null>(null);
  const onSubmit = async (data: formType) => {
    try {
      //console.log(data);
      const res = await fetchClient(
        `/api/Team/InviteRequests/${selectedTeam?.id}/New`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (res && res?.succeeded) {
        setObje(res?.data);
        setSuccess(true);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("role", value as any);
    if (value == "Coach") {
      setValue("teamRole", "Coach");
    } else {
      setValue("teamRole", "");
    }
  };
  return (
    <div className="p-0 md:p-4">
      {success ? (
        <SuccessLink obj={obje}/>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h3 className="text-xl mb-2">Configure Your Invitation Link</h3>
            <p className="text-gray-600 text-sm">
              Set up your link preferences to control group, role, expiration,
              and other settings. Once ready, generate a link to invite members
              to your team seamlessly.
            </p>
          </div>
          <div className="mb-3">
            <div className="flex items-start justify-start gap-2 w-full flex-col md:flex-row mb-3">
              {noGroup && (
                <div className="field basis-full md:basis-1/3 m-0 w-full">
                  <label htmlFor="Select Team Role" className="input--label">
                    Select Group{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <GroupSelect
                    id={watch("groupId")}
                    onChange={(value) => setValue("groupId", value)}
                    label={false}
                    onEmpty={(value) => setNoGroup(value)}
                  />
                  {errors?.groupId && (
                    <p className="py-2 text-red-400 text-sm">
                      {errors?.groupId?.message}
                    </p>
                  )}
                </div>
              )}
              <div className="field basis-full md:basis-1/3 m-0 w-full">
                <label htmlFor="role" className="input--label">
                  Select Role
                </label>
                <select
                  value={role}
                  onChange={(e) => handleRoleChange(e)}
                  id="role"
                  className="input--field select--field"
                >
                  <option value="Player">Player</option>
                  <option value="Coach">Coach</option>
                </select>
                {errors?.role && (
                  <p className="py-2 text-red-400 text-sm">
                    {errors?.role?.message}
                  </p>
                )}
              </div>
              {role === "Player" && (
                <div className="field basis-full md:basis-1/3 m-0 w-full">
                  <label htmlFor="teamRole" className="input--label">
                    Select Team Role
                  </label>
                  <select
                    {...register("teamRole")}
                    id="role"
                    className="input--field select--field"
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {footballTeamRoles?.map((role) => (
                      <option key={role?.value} value={role?.value}>
                        {role?.label}
                      </option>
                    ))}
                  </select>
                  {errors?.teamRole && (
                    <p className="py-2 text-red-400 text-sm">
                      {errors?.teamRole?.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-start justify-start gap-2 w-full flex-col md:flex-row mb-3">
              <div className="field basis-full md:basis-1/3 m-0 w-full">
                <label htmlFor="Select Team Role" className="input--label m-0">
                  Rules
                </label>
                <p className="text-gray-500 text-xs mb-1">
                  Select the criteria to include in your invitation. Mark
                  specific fields like age, height, or weight as required to
                  ensure invitees provide the necessary information.
                </p>
                <div className="block">
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="Age"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isAgeRequired")}
                    />
                    <label
                      htmlFor="Age"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Age
                    </label>
                  </div>
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="Height"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isHeighRequired")}
                    />
                    <label
                      htmlFor="Height"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Height
                    </label>
                  </div>
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="Weight"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isWeightRequired")}
                    />
                    <label
                      htmlFor="Weight"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Weight
                    </label>
                  </div>
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="Contact"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isPhoneRequired")}
                    />
                    <label
                      htmlFor="Contact"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Contact No.
                    </label>
                  </div>
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="parentEmail"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isParentEmailRequired")}
                    />
                    <label
                      htmlFor="parentEmail"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Parent Email
                    </label>
                  </div>
                  <div className="mb-1 flex items-center justify-start gap-2">
                    <input
                      type="checkbox"
                      id="parentPhone"
                      className="checkbox--field flex-shrink-0"
                      {...register("rules.isParentPhoneRequired")}
                    />
                    <label
                      htmlFor="parentPhone"
                      className="input--label block m-0 cursor-pointer"
                    >
                      Parent Contact No.
                    </label>
                  </div>
                </div>
              </div>
              <div className="field basis-full md:basis-1/3 m-0 w-full">
                <div className="flex items-start space-x-2 mb-2">
                  <Switch
                    id="airplane-mode"
                    className="mt-2"
                    checked={limit}
                    onCheckedChange={(checked) => {
                      setLimit(checked);
                      if (checked) {
                        setValue("limited", 0);
                      }
                    }}
                  />
                  <div className="flex items-center justify-start flex-col gap-1 text-left">
                    <label
                      htmlFor="airplane-mode"
                      className="m-0 text-left block w-full cursor-pointer"
                    >
                      {limit ? "Unlimited" : "Limit"} Submissions
                    </label>
                    <span className="text-gray-500 text-xs leading-tight">
                      Disable this option to set a maximum number of submissions
                      for this invitation link.
                    </span>
                  </div>
                </div>
                {!limit && (
                  <>
                    <input
                      type="number"
                      id="limited"
                      className="input--field"
                      {...register("limited")}
                      min={0}
                    />
                    {errors?.limited && (
                      <p className="py-2 text-red-400 text-sm">
                        {errors?.limited?.message}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="field basis-full md:basis-1/3 m-0 w-full">
                <label htmlFor="expire" className="input--label">
                  Invitation Expire
                </label>
                <select
                  {...register("expirationDate")}
                  id="expire"
                  className="input--field select--field"
                >
                  <option value={getFutureDate(24)}>24 Hours</option>
                  <option value={getFutureDate(48)}>48 Hours</option>
                  <option value={getFutureDate(72)}>72 Hours</option>
                </select>
                {errors?.expirationDate && (
                  <p className="py-2 text-red-400 text-sm">
                    {errors?.expirationDate?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-end">
              <SubmitButton
                loading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
                classes="btn btn--primary"
              >
                Generate Link
              </SubmitButton>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default InviteViaLink;
