"use client";
import IconLike from "@/components/icons/IconLike";
import IconMessage from "@/components/icons/IconMessage";
import useApp from "@/context/useApp";
import { PostItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import PostComment from "./PostComment";
import WriteComment from "./WriteComment";

type props = {
  post: PostItem;
};
const PostLike = ({ post }: props) => {
  const [like, setLike] = useState(false);
  const { selectedTeam, setToaster } = useApp();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const handleLike = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Communication/Posts/${selectedTeam?.id}/${post?.id}/Like`
      );
      if (res && res?.succeeded) {
        setLike(!like);
        setToaster("success", res?.messages[0] || "Liked successfully");
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post) {
      setLike(post?.iLiked);
    }
  }, [post]);

  return (
    <>
      <div className="bg-[#FAFAFA] flex sm:justify-evenly justify-between items-center">
        <button
          type="button"
          onClick={handleLike}
          className="flex items-center justify-center sm:gap-2 gap-1 cursor-pointer basis-auto w-full p-3"
        >
          <span>
            {loading ? (
              <AiOutlineLoading3Quarters
                className={`w-4 h-4 fill-[#9FA8B0] animate-spin`}
              />
            ) : (
              <IconLike
                classess={`w-4 h-4 fill-[#9FA8B0] ${
                  post?.iLiked || like ? "fill-themePrimary" : ""
                }`}
              />
            )}
          </span>
          {post?.tLikes > 0 && (
            <span
              className={`text-[#9FA8B0] text-xs ${
                post?.iLiked && "text-themePrimary"
              }`}
            >
              {post?.tLikes > 1
                ? `${post?.tLikes} likes`
                : `${post?.tLikes} like`}
            </span>
          )}
        </button>
        <button
          type="button"
          className={`flex items-center justify-center sm:gap-2 gap-1 cursor-pointer w-full basis-auto p-3 ${
            open ? "bg-gray-100" : ""
          }`}
          onClick={() => setOpen(!open)}
        >
          <span>
            <IconMessage classess={`w-4 h-4 fill-[#9FA8B0] `} />
          </span>
          <span
            className={`text-[#9FA8B0] text-xs ${open ? "text-primary" : ""}`}
          >
            {post?.tComments > 1
              ? `${post?.tComments} comments`
              : `${post?.tComments} comment`}
          </span>
        </button>
        {/* <div
        className="flex items-center justify-center sm:gap-2 gap-1 cursor-pointer "
        onClick={() => toggleColor("share")}
      >
        <span>
          <IconShare
            classess={`w-4 h-4 fill-[#9FA8B0] ${
              iconColors.share && "fill-themePrimary"
            }`}
          />
        </span>
        <span
          className={`text-[#9FA8B0] text-xs ${
            iconColors.share && "text-themePrimary"
          }`}
        >
          30 shares
        </span>
      </div> */}
      </div>
      {open && (
        <PostComment
          post={post}
          trigger={trigger}
          onTriggerChange={(value) => setTrigger(value)}
        />
      )}
      <WriteComment
        post={post}
        key={post?.id}
        handleRefetch={() => setTrigger(true)}
      />
    </>
  );
};

export default PostLike;
