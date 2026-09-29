import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SubmitButton from "@/components/SubmitButton";

const DeleteGroup = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { setToaster } = useApp();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Groups/Delete/${params?.groupId}`,
        {
          method: "DELETE",
        }
      );
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Group deleted successfully");
        router.back();
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
    <Dialog>
      <DialogTrigger className="btn btn--secondary no-underline">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            group and remove your data from our servers.
          </DialogDescription>
          <div className="flex items-center justify-end">
            <SubmitButton
              type="button"
              loading={loading}
              classes="btn btn--primary"
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

export default DeleteGroup;
