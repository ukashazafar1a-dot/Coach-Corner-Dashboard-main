import React from "react";
import PostLike from "./PostLike";
import Image from "next/image";
import { PostItem } from "@/helpers/types";
import { Site } from "@/helpers/Site";
import { timeAgo } from "@/lib/utils";
import PostActions from "./PostActions";
type props = {
  post: PostItem;
  handleRefetch: () => void;
};
const PostCard = ({ post, handleRefetch }: props) => {
  return (
    <div className="rounded-chat object shadow-cardshadow border border-themePrimary w-2/4 m-auto overflow-hidden max-lg:w-3/4 max-sm:w-full">
      <div className="p-3">
        <div className="flex gap-3 items-center justify-between rounded-lg relative">
          <div className=" flex gap-3 items-center">
            <Image
              src={`${
                post?.user?.image ? post?.user?.image : Site?.placeholder
              }`}
              width={38}
              height={38}
              className="rounded-full object-cover object-center"
              alt="User Image"
            />

            <div className="text-base font-semibold">
              <p className="sm:text-base text-sm inline ">
                <span>
                  {post.user?.fName} {post?.user?.lName}
                </span>
                <span className="text-sm font-medium inline ps-2 text-black opacity-40 ">
                  {timeAgo(post?.createdAt)}
                </span>
              </p>
              <p className="sm:text-base text-sm font-medium  text-black opacity-40">
                {post?.user?.role}
              </p>
            </div>
          </div>
          <PostActions post={post} handleRefetch={handleRefetch} />
        </div>
        {post?.message && (
          <div
            className="rte prose"
            dangerouslySetInnerHTML={{ __html: post?.message }}
          />
        )}
      </div>
      {post?.media && (
        <div className="relative flex items-center justify-center text-center max-h-80 min-h-80 bg-slate-100 overflow-hidden">
          <img
            src={`${post?.media}`}
            className="mx-auto max-h-80 w-auto"
            alt="Post Image"
          />
        </div>
      )}
      <PostLike post={post} key={post?.id} />
    </div>
  );
};

export default PostCard;
