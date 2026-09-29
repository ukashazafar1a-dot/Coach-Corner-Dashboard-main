import { PendingInviteItem } from "@/helpers/types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";

type props = {
  invite: PendingInviteItem;
  handleRefetch: () => void;
};
const ApproveInvite = ({ invite, handleRefetch }: props) => {
  const [open, setOpen] = React.useState(false);
  const { setToaster, selectedTeam } = useApp();
  const [loading, setLoading] = React.useState(false);
  const handleApprove = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/${selectedTeam?.id}/Approvals/${invite?.id}/Approve`
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster(
          "success",
          res?.messages[0] || "Invite approved successfully"
        );
        handleRefetch();
        setOpen(false);
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
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="btn btn--primary">Approve</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-0">Approve Invite</DialogTitle>
          <div className="mb-3 py-2">
            <p className="mb-3">
              Are you sure you want to approve this invite?
            </p>
          </div>
          <div className="flex items-center justify-end">
            <SubmitButton
              loading={loading}
              onClick={handleApprove}
              disabled={loading}
              classes="btn btn--primary"
            >
              Approve
            </SubmitButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveInvite;
