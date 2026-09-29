import IconLike from "@/components/icons/IconLike";
import useApp from "@/context/useApp";
import { CommentItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type props = {
  postId: any;
  comment: CommentItem;
};
const LikeComment = ({ postId, comment }: props) => {
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToaster } = useApp();

  const handleLike = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Communication/Post/${postId}/Comments/${comment?.id}/Like`
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
    if (comment) {
      setLike(comment?.iliked);
    }
  }, [comment]);

  return (
    <div className="flex items-center gap-1">
      <button type="button" className="cursor-pointer" onClick={handleLike}>
        {loading ? (
          <AiOutlineLoading3Quarters className={`fill-primary animate-spin`} />
        ) : (
          <IconLike classess={`${like ? 'fill-primary' : 'fill-gray-500'}`} />
        )}
      </button>
      <span className="text-xs text-themePrimary">{comment?.tLikes}</span>
    </div>
  );
};

export default LikeComment;
