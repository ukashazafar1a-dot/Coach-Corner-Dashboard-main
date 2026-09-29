import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
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
  email: z.string().email({ message: "Email is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Body is required" }),
});

type formType = z.infer<typeof schema>;

const ShareViaEmail = () => {
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
      email: "",
      subject: "",
      body: ""
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
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="btn btn--primary gap-1">
        <AiOutlineMail className="w-4 h-4 fill-white" />
        <span>Share via Email</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Play</DialogTitle>
          <DialogDescription>
            <div className="pt-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <label htmlFor="name" className="input--label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    className="input--field"
                    {...register("email")}
                  />
                  {errors?.email && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.email.message}
                    </p>
                  )}
                  <p className="py-2 text-sm text-gray-500">
                  Enter the e-mail address where this play should be sent.
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="subject" className="input--label">
                  Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    autoComplete="off"
                    className="input--field"
                    {...register("subject")}
                  />
                  {errors?.subject && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.subject.message}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="body" className="input--label">
                    Body
                  </label>
                  <textarea
                    rows={3}
                    id="subject"
                    className="input--field"
                    {...register("body")}
                  />
                  {errors?.body && (
                    <p className="py-2 text-sm font-medium text-red-400">
                      {errors?.body.message}
                    </p>
                  )}
                </div>
                <div className="field flex items-center justify-end">
                  <SubmitButton
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Share Play
                  </SubmitButton>
                </div>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareViaEmail;
