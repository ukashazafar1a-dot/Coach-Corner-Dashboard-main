import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineDelete } from "react-icons/md";
import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";

type props = {
  id: any;
  handleRefetch?: () => void;
};
const DeleteMember = ({ id, handleRefetch }: props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToaster } = useApp();

  const handleDelete = async () => {
    if (!id) {
      setToaster("error", "Something went wrong");
      return;
    }
    try {
      setLoading(true);
      const res = await fetchClient(`/api/Team/Groups/Members/${id}/Delete`, {
        method: "DELETE",
      });
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", "Member removed successfully");
        setOpen(false);
        if (handleRefetch) {
          handleRefetch();
        }
      } else {
        setToaster("error", "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger type="button">
        <MdOutlineDelete className="fill-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently remove your
            member.
          </DialogDescription>
          <div className="flex items-center justify-end">
            <SubmitButton
              classes="btn btn--primary"
              loading={loading}
              disabled={loading}
              onClick={() => handleDelete()}
              type="button"
            >
              Remove
            </SubmitButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMember;
