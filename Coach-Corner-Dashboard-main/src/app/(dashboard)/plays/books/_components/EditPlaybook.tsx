import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlaybookItem } from "@/helpers/types";

type props = {
  book: PlaybookItem;
  handleRefetch: () => void;
  open: boolean;
  onClose: () => void;
};
const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

type formType = z.infer<typeof schema>;
const EditPlayBook = ({ book, handleRefetch, open, onClose }: props) => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { setToaster, selectedTeam } = useApp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: book?.name || "",
      description: book?.description || "",
    },
  });

  const onSubmit = async (data: formType) => {
    try {
      const res = await fetchClient(
        `/api/Playbook/${selectedTeam?.id}/${book?.id}/Edit`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Playbook updated successfully"
        );
        onClose();
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Edit Playbook</DialogTitle>
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
                  autoFocus={false}
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlayBook;
