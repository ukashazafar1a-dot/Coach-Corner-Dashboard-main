import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "@/components/SubmitButton";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

type formType = z.infer<typeof schema>;
type props = {
  handleRefetch: () => void;
};
const AddPlayBook = ({ handleRefetch }: props) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const { setToaster, selectedTeam } = useApp();
  const onSubmit = async (data: formType) => {
    try {
      const res = await fetchClient(`/api/Playbook/${selectedTeam?.id}/New`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Playbook created successfully"
        );
        reset();
        setOpen(false);
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="btn btn--secondary no-underline rounded-full">
        Add Book
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Playbook</DialogTitle>
        </DialogHeader>
        <div className="pt-3">
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
              <label htmlFor="description" className="input--label">
                Description
              </label>
              <textarea
                rows={3}
                id="description"
                className="input--field"
                {...register("description")}
              />
              {errors?.description && (
                <p className="py-2 text-sm font-medium text-red-400">
                  {errors?.description.message}
                </p>
              )}
            </div>
            <div className="field flex items-center justify-end">
              <SubmitButton
                loading={isSubmitting}
                disabled={isSubmitting}
                type="submit"
              >
                Create
              </SubmitButton>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayBook;
