import useApp from "@/context/useApp";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/SubmitButton";
import fetchClient from "@/hooks/fetchClient";
import { hasClaim } from "@/lib/utils";

const schema = z.object({
  id: z.string().nullable(),
  name: z.string().min(1, { message: "Name is required" }),
  logo: z.string().nullable(),
  icon: z.string().nullable(),
  sportId: z.number().min(0, { message: "Sport is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
type formType = z.infer<typeof schema>;
type props = {
  handleRefetch: () => void;
  onBack: () => void;
};
const CreateTeam = ({ handleRefetch, onBack }: props) => {
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
      id: null,
      name: "",
      logo: null,
      icon: null,
      description: "",
      sportId: undefined,
    },
  });
  const { setToaster, sports, user, logout, plan, organization } = useApp();
  const sport = watch("sportId");
  const onSubmit = async (data: formType) => {
    try {
      const form = new FormData();
      form.append("Id", data?.id ? data?.id : "");
      form.append("Name", data?.name);
      form.append("Logo", data?.logo || "");
      form.append("Icon", data?.icon || "");
      form.append("SportId", sport?.toString() || "");
      form.append("Description", data?.description);
      const res = await fetchClient(`/api/team/Upsert`, {
        method: "POST",
        body: form,
      });
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Team created successfully");
        reset();
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const canCreateTeam = plan
    ? plan?.features?.some(
        (feature) => feature.type === "Teams" && feature.remainingQouta > 0
      )
    : false;

  return (
    <>
      {canCreateTeam &&
      hasClaim(organization?.claims, "Permission.Teams.Create") ? (
        <>
          <h3 className="mb-0">Create your first team</h3>
          <p className="text-sm mb-3 text-gray-500">
            Create your first team to start your journey with the coachcorner.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="name" className="input--label">
                Name
              </label>
              <input
                type="text"
                id="organizationType"
                autoComplete="organization Name"
                className="input--field"
                {...register("name")}
              />
              {errors?.name && (
                <p className="py-2 text-sm font-medium text-red-400">
                  {errors?.name.message}
                </p>
              )}
            </div>
            <div className="field">
              <label htmlFor="sport" className="input--label">
                Sport
              </label>
              <Select
                value={sport ? String(sport) : ""}
                onValueChange={(sport) => setValue("sportId", Number(sport))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports?.map((sport) => (
                    <SelectItem key={sport.id} value={String(sport?.id)}>
                      {sport.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.sportId && (
                <p className="py-2 text-sm font-medium text-red-400">
                  {errors?.sportId.message}
                </p>
              )}
            </div>
            <div className="field mb-4">
              <label htmlFor="description" className="input--label">
                Description
              </label>
              <input
                type="text"
                id="description"
                autoComplete="description"
                className="input--field"
                {...register("description")}
              />
              {errors?.description && (
                <p className="py-2 text-sm font-medium text-red-400">
                  {errors?.description.message}
                </p>
              )}
            </div>
            <div className="field flex items-center justify-between">
              <button
                className="btn btn--secondary"
                type="button"
                onClick={() => onBack()}
              >
                <span aria-hidden="true" className="rotate-180 me-2 text-sm">
                  &rarr;
                </span>{" "}
                Back
              </button>
              <SubmitButton
                loading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
              >
                Create Team
              </SubmitButton>
            </div>
          </form>
          {user && (
            <div className="block">
              <p className="m-0 text-base">
                Logged in as {user?.fName} {user?.lName}.{" "}
                <button
                  type="button"
                  className="text-primary font-medium"
                  onClick={() => logout()}
                >
                  Log Out
                </button>
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="block w-full transition-all duration-200 ease-linear">
            <div className="text-center">
              <h2 className=" text-gray-700 text-lg text-center mb-0">
                {`You don't have permission to create a team.`}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Please try again later or contact support.
              </p>
              <button
                type="button"
                className="btn btn--primary mx-auto"
                onClick={() => logout()}
              >
                Try Again
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateTeam;
