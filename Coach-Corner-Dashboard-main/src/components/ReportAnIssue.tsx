"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TbMessageReportFilled } from "react-icons/tb";

const ReportAnIssue = () => {
  const id = React.useId();

  return (
    <Dialog>
      <DialogTrigger className={`flex gap-3 sideBarItem w-full `}>
        <TbMessageReportFilled className="icon" />
        <p className="sideBarTitle">Report an issue</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report an issue</DialogTitle>
          <DialogDescription>
            What area are you having problems with?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor={`area-${id}`}>Area</label>
              <Select defaultValue="billing">
                <SelectTrigger id={`area-${id}`} aria-label="Area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="deployments">Deployments</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor={`security-level-${id}`}>Security Level</label>
              <Select defaultValue="2">
                <SelectTrigger
                  id={`security-level-${id}`}
                  className="w-full "
                  aria-label="Security Level"
                >
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Severity 1 (Highest)</SelectItem>
                  <SelectItem value="2">Severity 2</SelectItem>
                  <SelectItem value="3">Severity 3</SelectItem>
                  <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor={`subject-${id}`}>Subject</label>
            <input
              type="text"
              id={`subject-${id}`}
              placeholder="I need help with..."
              className="input--field"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor={`description-${id}`}>Description</label>
            <textarea
              id={`description-${id}`}
              placeholder="Please include all information relevant to your issue."
            />
          </div>
          <div className="justify-between space-x-2">
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <Button size="sm">Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportAnIssue;
