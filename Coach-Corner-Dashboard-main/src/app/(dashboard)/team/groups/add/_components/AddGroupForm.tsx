"use client";
import PlusIcon from "@/components/icons/PlusIcon";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import { useEffect, useState } from "react";
import fetchClient from "@/hooks/fetchClient";
import { IoImagesOutline } from "react-icons/io5";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CoachSelect from "@/components/CoachSelect";
import SubmitButton from "@/components/SubmitButton";
import GroupMembers from "./GroupMembers";
import AddPlayers from "./AddPlayers";
import { AddMemberItem, GroupInviteItem } from "@/helpers/types";
import PlayerMembers from "./PlayerMembers";

const schema = z.object({
  teamId: z.string().min(1, { message: "Name is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().nullable(),
  coachId: z.string().min(1, { message: "Coach is required" }),
  members: z.any(),
  invites: z.any(),
});

type formType = z.infer<typeof schema>;
const getPayload = (inputObject: formType) => {
  return {
    ...inputObject,
    members: inputObject?.members
      ? inputObject?.members.map((member: AddMemberItem) => ({
          userId: member?.userId,
          teamRole: member?.teamRole,
        }))
      : null,
  };
};
const AddGroupForm = () => {
  const { setToaster, organization, selectedTeam } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
    getValues
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      teamId: selectedTeam?.id || "",
      name: "",
      description: null,
      coachId: "",
      members: null,
      invites: null,
    },
  });
  const router = useRouter();
  const [init, setInit] = useState(false);
  const users = watch("invites");
  const members = watch("members");
  const onSubmit = async (data: any) => {
    try {
      //console.log('data to send',data);
      if ((!data?.invites || data?.invites?.length === 0) && (!data?.members || data?.members?.length === 0)) {
        setToaster("error", "Please add at least one member");
        return;
      }
      //console.log(data);
      const form = getPayload(data);
      //console.log(form);
      const res = await fetchClient(`/api/team/Groups/Add`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Group created successfully");
        //console.log(res);
        reset();
        router.push("/team/groups");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddUser = (data: GroupInviteItem) => {
    // Check if the email already exists
    const emailExists = users?.some(
      (user: GroupInviteItem) => user.email === data?.email
    );

    if (emailExists) {
      // Email already exists, show toaster message
      setToaster("error", "This email is already in the members table.");
      return false;
    }
    // Email doesn't exist, add the new user
    setValue("invites", [...(users || []), data]);
    setInit(!init);
    return true;
  };
  const handleRemove = (email: string) => {
    const newObj = users?.filter(
      (user: GroupInviteItem) => user.email !== email
    );
    if (newObj) {
      setValue("invites", newObj);
    }
  };
  const handleRemoveMember = (userId: any) => {
    const newObj = members?.filter(
      (user: AddMemberItem) => user?.userId !== userId
    );
    //console.log(userId, newObj);
    setValue("members", newObj);
  };
  //console.log(getValues(),errors)
  return (
    <>
      <div className="relative">
        <div className="max-w-3xl mx-auto bg-blur ">
          <div
            className="pt-12 pb-4 mb-4 px-4 flex items-center justify-start gap-3 cursor-pointer"
            onClick={() => router.back()}
          >
            <IoArrowBack className="w-5 h-5" />
            <p className="font-semibold text-2xl">Create New Group</p>
          </div>
          <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="name" className="input--label">
                Group Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="input--field"
              />
              {errors?.name && (
                <p className="text-red-500 text-sm py-2">
                  {errors?.name.message}
                </p>
              )}
            </div>
            <div className="field mb-4">
              <label htmlFor="description" className="input--label">
                Description
              </label>
              <textarea
                rows={3}
                {...register("description")}
                className="input--field"
              />
              {errors?.description && (
                <p className="text-red-500 text-sm py-2">
                  {errors?.description.message}
                </p>
              )}
            </div>
            <CoachSelect
              onChange={(value: string) => setValue("coachId", value)}
            />
            {errors?.coachId && (
              <p className="text-red-500 text-sm py-2">
                {errors?.coachId.message}
              </p>
            )}
            <div className="field">
              <div className="flex justify-between items-center flex-wrap mb-4">
                <label
                  htmlFor="Select Team Role"
                  className="input--label text-xl font-semibold text-themeTextColor   "
                >
                  Group Members
                </label>
                <AddPlayers
                  members={members}
                  onChange={(value: any) => setValue("members", value)}
                />
              </div>
              <PlayerMembers members={members} onRemove={handleRemoveMember} />
              <GroupMembers
                invites={watch("invites")}
                init={init}
                onInitChange={(value: boolean) => setInit(value)}
                onChange={(value: any) => handleAddUser(value)}
                onRemove={handleRemove}
              />
            </div>
            <div className="field">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href={"/team/groups"} className="btn btn--secondary">
                  Cancel
                </Link>
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
      </div>
    </>
  );
};

export default AddGroupForm;
