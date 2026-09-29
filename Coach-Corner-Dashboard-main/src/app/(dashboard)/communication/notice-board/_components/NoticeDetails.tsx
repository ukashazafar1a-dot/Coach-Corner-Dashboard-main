import LoadingSvg from "@/components/loaders/LoadingSvg";
import useApp from "@/context/useApp";
import { NoticeItem, NoticeObject } from "@/helpers/types";
import fetchClient from "@/hooks/fetchClient";
import React, { useEffect, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoArrowBack } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/SubmitButton";
import { hasClaim } from "@/lib/utils";

type props = {
  notice: NoticeItem;
  onBack: () => void;
  handleRefetch: () => void;
};
const NoticeDetails = ({ notice, onBack, handleRefetch }: props) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<NoticeObject | null>(null);
  const { setToaster, organization } = useApp();
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const res = await fetchClient(`/api/Notice/${content?.id}`, {
        method: "DELETE",
      });
      if (res && res?.succeeded) {
        setToaster("success", "Notice deleted successfully");
        onBack();
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  const getNotice = async (id: any) => {
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Notice/Details/${id}`);
      if (res && res?.succeeded) {
        const { data } = res;
        //console.log(data);
        setContent(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (notice) {
      getNotice(notice?.id);
    }
  }, [notice]);
  //console.log(content);
  //console.log(organization?.claims,hasClaim(organization?.claims, "Permission.Noticeboards.Edit"));
  return (
    <>
      <div className="block p-3 md:p-6 h-full">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSvg />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3 mb-3 md:hidden">
              <button className="cursor-pointer" type="button" onClick={onBack}>
                <IoArrowBack className="w-5 h-5 fill-primary text-primary" />
              </button>
              {hasClaim(organization?.claims, "Permission.Noticeboards.Edit") ||
              hasClaim(
                organization?.claims,
                "Permission.Noticeboards.Delete"
              ) ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 rounded-full bg-gray-200 flex items-center justify-center">
                    <RxDotsVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="me-6">
                    {hasClaim(
                      organization?.claims,
                      "Permission.Noticeboards.Edit"
                    ) && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/communication/notice-board/${notice?.id}`}
                          className="justify-start gap-3 w-full"
                        >
                          <CiEdit />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {hasClaim(
                      organization?.claims,
                      "Permission.Noticeboards.Delete"
                    ) && (
                      <DropdownMenuItem asChild>
                        <button
                          type="button"
                          className="justify-start gap-3 w-full"
                          onClick={() => setOpen(true)}
                        >
                          <AiOutlineDelete />
                          <span>Delete</span>
                        </button>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <></>
              )}
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start justify-start gap-2">
                <img
                  src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg"
                  alt=""
                  className="w-8 h-8 object-cover rounded-full"
                />
                <div className="block">
                  <p className="m-0">
                    <span className="font-semibold text-base leading-tight">
                      Jhon Deo
                    </span>
                    <span className="text-gray-700 text-sm ms-3">12:00 PM</span>
                  </p>
                  <span className="text-gray-400 text-sm">Head Coach</span>
                </div>
              </div>
              {hasClaim(organization?.claims, "Permission.Noticeboards.Edit") ||
              hasClaim(
                organization?.claims,
                "Permission.Noticeboards.Delete"
              ) ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 rounded-full bg-gray-200 items-center justify-center hidden md:flex">
                    <RxDotsVertical className="w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="me-6">
                    {hasClaim(
                      organization?.claims,
                      "Permission.Noticeboards.Edit"
                    ) && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/communication/notice-board/${notice?.id}`}
                          className="justify-start gap-3 w-full"
                        >
                          <CiEdit />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {hasClaim(
                      organization?.claims,
                      "Permission.Noticeboards.Delete"
                    ) && (
                      <DropdownMenuItem asChild>
                        <button
                          type="button"
                          className="justify-start gap-3 w-full"
                          onClick={() => setOpen(true)}
                        >
                          <AiOutlineDelete />
                          <span>Delete</span>
                        </button>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <></>
              )}
            </div>
            <h2>{content?.title}</h2>
            {content?.shotDescription && (
              <p className="py-2 mb-3 text-gray-700">
                {content?.shotDescription}
              </p>
            )}
            {content?.description && (
              <div
                className="rte prose"
                dangerouslySetInnerHTML={{ __html: content?.description }}
              />
            )}
          </>
        )}
      </div>
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
};

export default NoticeDetails;
