"use client";
import useApp from "@/context/useApp";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubmitButton from "./SubmitButton";

const LogoutPopup = () => {
  const { toggleLogout, logoutTrigger } = useApp();
  const { logout } = useApp();
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={logoutTrigger} onOpenChange={(value) => toggleLogout(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogDescription className="pb-4">{`Click 'Logout' to end your session or 'Cancel' to stay logged in.`}</DialogDescription>
          <div className="flex items-center justify-end gap-2">
            <button
              className="btn btn--secondary"
              onClick={() => toggleLogout(false)}
            >
              Cancel
            </button>
            <SubmitButton
              loading={loading}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                logout();
                setLoading(false);
              }}
            >
              Logout
            </SubmitButton>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutPopup;
