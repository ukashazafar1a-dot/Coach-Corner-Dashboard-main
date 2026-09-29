import React, { useState } from "react";
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
type props = {
  id: any;
  handleRefetch: () => void;
};
const DeletePost = ({id,handleRefetch}:props) => {
  const [open, setOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { setToaster,selectedTeam } = useApp();

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const res = await fetchClient(`/api/Communication/Posts/${selectedTeam?.id}/${id}/Delete`, {
        method: "DELETE",
      });
      if (res && res?.succeeded) {
        setToaster("success", "Notice deleted successfully");
        handleRefetch();
        setOpen(false)
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
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
  );
};

export default DeletePost;
