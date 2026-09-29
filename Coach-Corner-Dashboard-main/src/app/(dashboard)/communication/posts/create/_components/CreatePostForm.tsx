"use client";
import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import RichTextEditor from "@/hooks/RichTextEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

const schema = z.object({
  id: z.string().nullable(),
  message: z.string().min(1, { message: "Message is required" }),
  media: z.any(),
});
type formType = z.infer<typeof schema>;
type Props = {};

function CreatePostForm({}: Props) {
  const { selectedTeam, setToaster } = useApp();
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
      message: "",
      media: null,
    },
  });
  const [file, setFile] = useState<any>(null);
  const router = useRouter();
  const onSubmit = async (data: formType) => {
    try {
      //console.log(data);
      const form = new FormData();
      form.append("id", "");
      form.append("message", data?.message);
      form.append("media", data?.media);
      const res = await fetchClient(
        `/api/Communication/Posts/${selectedTeam?.id}/New`,
        {
          method: "POST",
          body: form,
        }
      );
      if (res && res?.succeeded) {
        setToaster("success", "Post created successfully");
        reset();
        setFile(null);
        router.back();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileSelect = (file: File | null) => {
    setValue("media", file);
  };

  return (
    <div className="max-w-3xl mx-auto bg-blur">
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label htmlFor="Enter your thoughts" className="input--label">
            Enter your thoughts
          </label>
          <RichTextEditor
            type="mini"
            value={watch("message")}
            onChange={(Value) => setValue("message", Value)}
          />
          {errors?.message && (
            <p className="py-2 text-sm text-red-400">
              {errors?.message?.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="cover-photo" className="input--label">
            Cover photo
          </label>
          <FileUpload
            onFileSelect={handleFileSelect}
            acceptedFileTypes="image/png, image/jpeg"
            maxSize={10}
          />
        </div>
        <div className="field">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="btn btn--secondary">
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
}

export default CreatePostForm;
