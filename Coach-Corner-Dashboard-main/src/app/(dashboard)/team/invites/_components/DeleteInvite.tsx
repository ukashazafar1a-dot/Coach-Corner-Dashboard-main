import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InviteLinkItem } from "@/helpers/types";
import SubmitButton from "@/components/SubmitButton";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
type props = {
  link: InviteLinkItem;
  handleRefetch: () => void;
};
const DeleteInvite = ({ link, handleRefetch }: props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { setToaster, selectedTeam } = useApp();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetchClient(
        `/api/team/InviteRequests/${selectedTeam?.id}/delete/${link.id}`,
        {
          method: "DELETE",
        }
      );
      if (response && response?.succeeded) {
        setToaster(
          "success",
          response?.messages[0] || "Invite deleted successfully"
        );
        setOpen(false);
        handleRefetch();
      } else {
        setToaster("error", response?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="btn btn--secondary">Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
          <div className="flex items-center justify-end">
            <SubmitButton
              loading={loading}
              disabled={loading}
              onClick={handleDelete}
            >
              Delete
            </SubmitButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteInvite;
