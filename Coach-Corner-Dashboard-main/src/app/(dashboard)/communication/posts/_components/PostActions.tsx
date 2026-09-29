import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconDots from "@/components/icons/IconDots";
import { IoLogOutOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { PostItem } from "@/helpers/types";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";
import { hasClaim } from "@/lib/utils";
type props = {
  post: PostItem;
  handleRefetch: () => void;
};
const PostActions = ({ post, handleRefetch }: props) => {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { setToaster, selectedTeam, organization } = useApp();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const res = await fetchClient(
        `/api/Communication/Posts/${selectedTeam?.id}/${post?.id}/Delete`,
        {
          method: "DELETE",
        }
      );
      if (res && res?.succeeded) {
        setToaster("success", "Notice deleted successfully");
        handleRefetch();
        setOpen(false);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  if (
    hasClaim(organization?.claims, "Permission.Posts.Delete") ||
    hasClaim(organization?.claims, "Permission.Posts.Edit")
  ) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-100 bg-gray-50 rounded-full p-3 ">
            <IconDots classes={`fill-[#2C2C2E] h-4 w-4`} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {hasClaim(organization?.claims, "Permission.Posts.Edit") && (
              <DropdownMenuItem asChild>
                <Link
                  href={`/communication/posts/${post?.id}`}
                  className="flex items-center justify-start gap-2 border-0 bg-transparent shadow-none outline-none w-full cursor-pointer"
                >
                  <AiOutlineEdit className=" w-5 h-5" />
                  <span className="inline-block w-full text-left">Edit</span>
                </Link>
              </DropdownMenuItem>
            )}
            {hasClaim(organization?.claims, "Permission.Posts.Delete") && (
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="flex items-center justify-start gap-2 border-0 bg-transparent shadow-none outline-none w-full cursor-pointer"
                >
                  <MdDeleteOutline className="fill-red-500 w-5 h-5" />
                  <span className="inline-block w-full text-left text-red-500">
                    Delete
                  </span>
                </button>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription className="mb-4">
                This action cannot be undone. This will permanently delete and
                remove your data from our servers.
              </DialogDescription>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  className="btn btn--secondary no-underline"
                  disabled={deleteLoading}
                >
                  Discard
                </button>
                <SubmitButton
                  loading={deleteLoading}
                  disabled={deleteLoading}
                  onClick={handleDelete}
                >
                  Yes, delete it
                </SubmitButton>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  } else {
    return <></>;
  }
};

export default PostActions;
