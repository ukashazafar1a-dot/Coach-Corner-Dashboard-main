"use client";
import IconSend from "@/components/icons/IconSend";
import useApp from "@/context/useApp";
import ReturnImage from "@/helpers/ReturnImage";
import { Site } from "@/helpers/Site";
import { PostItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { z } from "zod";

type props = {
  post: PostItem;
  handleRefetch: () => void;
};
const schema = z.object({
  id: z.number(),
  message: z.string().min(3, { message: "Message is required" }),
});
type formType = z.infer<typeof schema>;
const WriteComment = ({ post,handleRefetch }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: 0,
      message: "",
    },
  });
  const {setToaster} = useApp();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: formType) => {
    try {
      console.log(data);
      const res = await fetchClient(
        `/api/Communication/Post/${post?.id}/Comments/New`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (res && res?.succeeded) {
        setToaster("success", "Comment added successfully");
        reset();
        handleRefetch();
      }else{
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="user-chat-actions p-3 w-full  bg-blur">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center gap-2"
      >
        <div className="quick-actions flex items-center gap-2">
          <ReturnImage
            url={`${post.user?.image ? post?.user?.image : Site?.placeholder}`}
            alt={"User Image"}
            width={34}
            height={34}
            classess={"object-center object-cover"}
          />
        </div>
        <div className="input-wrap w-full">
          <input
            type="text"
            {...register("message")}
            className="input--field w-full rounded-full px-2 py-1 placeholder:text-black placeholder:opacity-50"
            placeholder="Write Comment"
          />
        </div>
        <button
          type="submit"
          className="sendbtn bg-primary rounded-full p-1 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <AiOutlineLoading3Quarters
              className={`w-5 h-5 fill-white animate-spin`}
            />
          ) : (
            <IconSend classes="w-6 h-6" />
          )}
        </button>
      </form>
      {errors?.message && (
        <p className="p-1 text-sm text-red-500">{errors.message?.message}</p>
      )}
    </div>
  );
};

export default WriteComment;
