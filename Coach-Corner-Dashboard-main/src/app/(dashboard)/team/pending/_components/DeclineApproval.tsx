"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useApp from "@/context/useApp";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";

const schema = z.object({
  message: z.string().min(1, { message: "Message is required" }),
  approvalId: z.any().nullable(),
});

type formType = z.infer<typeof schema>;

type DeclineApprovalProps = {
  id: number;
  handleRefetch: () => void;
};

const DeclineApproval = ({ id, handleRefetch }: DeclineApprovalProps) => {
  const { setToaster, selectedTeam } = useApp();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: "",
      approvalId: id,
    },
  });

  const onSubmit: SubmitHandler<formType> = async (data) => {
    try {
      const response = await fetchClient(
        `/api/Team/${selectedTeam?.id}/Approvals/Decline`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] || "Approval declined successfully!"
        );
        reset();
        setOpen(false);
        handleRefetch();
      } else {
        setToaster(
          "error",
          response?.messages[0] ||
            "Failed to decline approval. Please try again."
        );
      }
    } catch (error) {
      setToaster("error", "An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          onClick={() => setOpen(true)}
          className="btn btn--secondary no-underline"
        >
          Decline
        </DialogTrigger>
        <DialogContent aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Approval Decline</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <label htmlFor={`message-${id}`}>Approval Decline Message</label>
              <textarea
                {...register("message")}
                placeholder="Message"
                className="input--field"
              />
              {errors.message && (
                <span className="text-red-500 text-sm">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="justify-between space-x-2 mt-5">
              <SubmitButton loading={isSubmitting} disabled={isSubmitting}>
                {" "}
                Submit
              </SubmitButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeclineApproval;
