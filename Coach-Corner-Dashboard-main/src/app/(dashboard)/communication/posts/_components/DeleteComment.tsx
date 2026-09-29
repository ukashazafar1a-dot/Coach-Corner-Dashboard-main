import useApp from "@/context/useApp";
import { CommentItem } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
type props = {
  postId: any;
  comment: CommentItem;
  handleRefetch: () => void;
};
const DeleteComment = ({ postId, comment, handleRefetch }: props) => {
  const [loading, setLoading] = useState(false);
  const { setToaster } = useApp();

  const handleLike = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Communication/Post/${postId}/Comments/${comment?.id}/Delete`,
        {
          method: "DELETE",
        }
      );
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Comment deleted successfully"
        );
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button type="button" onClick={handleLike}>
      {loading ? (
        <AiOutlineLoading3Quarters className={`fill-primary animate-spin`} />
      ) : (
        <MdDeleteOutline />
      )}
    </button>
  );
};

export default DeleteComment;
