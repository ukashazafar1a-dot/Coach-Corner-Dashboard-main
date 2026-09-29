import IconLike from "@/components/icons/IconLike";
import IconMessage from "@/components/icons/IconMessage";
import IconSend from "@/components/icons/IconSend";
import ReturnImage from "@/helpers/ReturnImage";
import { CommentItem, PostItem } from "@/helpers/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WriteComment from "./WriteComment";
import fetchClient from "@/hooks/fetchClient";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Site } from "@/helpers/Site";
import { timeAgo } from "@/lib/utils";
import LikeComment from "./LikeComment";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import DeleteComment from "./DeleteComment";
import useApp from "@/context/useApp";
type props = {
  post: PostItem;
  trigger: boolean;
  onTriggerChange: (value: boolean) => void;
};
const PostComment = ({ post, trigger, onTriggerChange }: props) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<CommentItem[] | null>(null);
  const { user } = useApp();
  const getComments = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Communication/Post/${id}/Comments?skip=0`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setComments(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleRefetch = async () => {
    getComments(post?.id);
  };
  useEffect(() => {
    if (post) {
      getComments(post?.id);
    }
  }, [post]);
  useEffect(() => {
    if (trigger) {
      handleRefetch();
      onTriggerChange(false);
    }
  }, [trigger]);

  //console.log(comments)
  return (
    <>
      <div className="px-3 py-1 relative">
        <div className="h-0.5 w-full absolute top-0 bg-red-400">
          <span></span>
        </div>
        <>
          {comments &&
            comments?.map((comment) => {
              return (
                <div
                  className="block bg-chat-message w-fit rounded-sm p-2 mb-1"
                  key={comment?.id}
                >
                  <div className="flex items-center justify-start gap-3">
                    <Image
                      src={`${
                        comment.user?.image
                          ? comment?.user?.image
                          : Site?.placeholder
                      }`}
                      width={20}
                      height={20}
                      className="rounded-full object-cover object-center"
                      alt="User Image"
                    />
                    <div>
                      <p className="text-xs inline font-semibold m-0">
                        {comment.user?.fName} {comment?.user?.lName}
                        <span className="inline ps-2 text-black opacity-40 font-medium">
                          {timeAgo(comment?.dated)}
                        </span>
                      </p>
                      <p className="text-xs m-0 leading-3  text-black opacity-40">
                        {comment?.user?.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-base leading-none">
                    <p className=" sm:text-sm text-xs font-normal mb-1">
                      {comment?.message}
                    </p>
                    <div className="flex items-center justify-end gap-2">
                      <LikeComment postId={post?.id} comment={comment} />
                      {comment?.user?.email == user?.email ? (
                        <>
                          <MdOutlineModeEditOutline />
                          <DeleteComment
                            postId={post?.id}
                            comment={comment}
                            handleRefetch={handleRefetch}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      {/* <div className="flex items-center gap-1">
                          <span className="cursor-pointer">
                            <IconMessage classess="fill-[#9FA8D0]" />
                          </span>
                          <span className="text-xs text-[#9FA8D0] ">0</span>
                        </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </>
        {loading && (
          <div className="flex items-center justify-center">
            <AiOutlineLoading3Quarters
              className={`w-5 h-5 fill-primary animate-spin`}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default PostComment;
