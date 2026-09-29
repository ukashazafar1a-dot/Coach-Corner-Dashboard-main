"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { team } from "@/helpers/DummyData";
import IconDelete from "@/components/icons/IconDelete";
import AddMember from "./AddMember";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApp from "@/context/useApp";
import { getFutureDate } from "@/lib/utils";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";
import UploadFile from "./UploadFile";
import GroupSelect from "@/components/GroupSelect";
import { useParams } from "next/navigation";
import { footballTeamRoles } from "@/lib/teamRoles";

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
type user = {
  email: string;
  fName: string;
  lName: string;
};

const InviteViaEmail = () => {
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const { selectedTeam, setToaster } = useApp();
  const [init, setInit] = useState(false);
  const params = useParams();
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
      groupId: params?.groupId as string,
      inviteType: "Email",
      users: null,
      limited: 0,
      expirationDate: getFutureDate(72),
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
  const [users, setUsers] = useState<user[] | null>([]);
  const role = watch("role");
  const teamRole = watch("teamRole");
  const onSubmit = async (data: formType) => {
    try {
      if (!users || users?.length == 0) {
        setToaster("error", "Please add a invite member");
        return;
      }
      //console.log(data);
      const form = { ...data, users };
      console.log(form);
      const res = await fetchClient(
        `/api/Team/InviteRequests/${selectedTeam?.id}/New`,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );
      console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Invite sent successfully");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = (data: user) => {
    // Check if the email already exists
    const emailExists = users?.some((user) => user.email === data?.email);

    if (emailExists) {
      // Email already exists, show toaster message
      setToaster("error", "This email is already in the members table.");
      return false;
    }
    // Email doesn't exist, add the new user
    setUsers((prevUsers) => {
      return prevUsers ? [...prevUsers, data] : [data];
    });
    setInit(!init);
    return true;
  };
  const handleRemove = (email: string) => {
    const newObj = users?.filter((user) => user.email !== email);
    if (newObj) {
      setUsers(newObj);
    }
  };
  const handleAddInit = async () => {
    setInit(!init);
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
  const handleFileChange = (values:any) => {
    const newArray = values?.map((value:any) => {
      return {
        fName: value?.fName,
        lName: value?.lName,
        email: value?.email,
        role,
        teamRole
      } 
    });
    //console.log(newArray);
    setUsers((prevUsers) => {
      return prevUsers ? [...prevUsers, ...newArray] : newArray;
    });
  }
  //console.log(users);
  return (
    <div className="ivm-wrapper py-6">
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="text-lg md:text-xl font-semibold">Members</p>
        <UploadFile onChange={handleFileChange}/>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="flex items-start justify-start gap-2 w-full flex-col md:flex-row mb-3">
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
            <div className="field basis-full md:basis-1/2 m-0 w-full">
              <label htmlFor="Select Team Role" className="input--label m-0">
                Rules
              </label>
              <p className="text-gray-500 text-xs mb-1">
                Select the criteria to include in your invitation. Mark specific
                fields like age, height, or weight as required to ensure
                invitees provide the necessary information.
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
          </div>
        </div>
        {users && (
          <div className="players-table-wrapper mb-3">
            <Table>
              <TableCaption>A list of your recent players.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">First Name</TableHead>
                  <TableHead className="text-left">Last Name</TableHead>
                  <TableHead className="text-left">Email</TableHead>
                  <TableHead className="text-left">Role</TableHead>
                  <TableHead className="opacity-0">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users && users.length > 0 ? (
                  users?.map((player, index: number) => {
                    return (
                      <TableRow key={index} className="bg-white">
                        <TableCell>{player?.fName}</TableCell>
                        <TableCell>{player?.lName}</TableCell>
                        <TableCell>{player?.email}</TableCell>
                        <TableCell>{watch("role")}</TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() => handleRemove(player?.email)}
                            className=""
                          >
                            <IconDelete classes={"cursor-pointer"} />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No players found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        <div
          className={`flex items-center ${
            init ? "justify-end" : "justify-between"
          } gap-2 flex-wrap mb-4"`}
        >
          {!init && (
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => handleAddInit()}
            >
              Add Invite
            </button>
          )}
          <SubmitButton
            disabled={init || isSubmitting}
            classes="btn btn--primary"
            type="submit"
            loading={isSubmitting}
          >
            Send Invite
          </SubmitButton>
        </div>
      </form>
      {init && (
        <>
          <hr className="py-2 my-1 h-1" />
          <AddMember
            key={"add"}
            onChange={handleAddUser}
            onRemove={() => setInit(!init)}
          />
        </>
      )}
    </div>
  );
};

export default InviteViaEmail;
