import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useApp from "@/context/useApp";
import fetchClient from "@/hooks/fetchClient";
import SectionLoader from "@/components/loaders/SectionLoader";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddMemberItem } from "@/helpers/types";
import PlayerItem from "../../add/_components/PlayerItem";
import SubmitButton from "@/components/SubmitButton";
type props = {
  handleRefetch: () => void;
  groupId: any;
};
const getPayload = (members: AddMemberItem[]) => {
  const newArray = members?.map((member: AddMemberItem) => ({
    userId: member?.userId,
    teamRole: member?.teamRole,
  }));
  return newArray;
};
const AddPlayers = ({ handleRefetch, groupId }: props) => {
  const [open, setOpen] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AddMemberItem[] | null>(null);
  const [selected, setSelected] = useState<AddMemberItem[] | null>(null);
  const [sloading, setSloading] = useState(false);

  const getPlayers = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Groups/${selectedTeam?.id}/TeamMembers/${groupId}/SelectTeamMember`
      );
      console.log(res);
      if (res && res?.succeeded) {
        const { data } = res;
        setData(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = (obj: AddMemberItem) => {
    setSelected([...(selected || []), obj]);
  };
  const handleSave = async () => {
    if (!selected || selected?.length === 0) {
      setToaster("error", "Please add at least one member");
      return;
    }
    //console.log(selected);
    try {
      setSloading(true);
      const form = getPayload(selected);
      const res = await fetchClient(
        `/api/Team/Groups/${selectedTeam?.id}/TeamMembers/${groupId}/AddTeamMembersOnly`,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Added successfully");
        setOpen(false);
        handleRefetch();
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSloading(false);
    }
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      getPlayers();
    }
  }, [open]);

  //console.log(selected);
  return (
    <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
      <SheetTrigger className="btn btn--primary">Add Members</SheetTrigger>
      <SheetContent className="member-sheet-size" side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Add Members</SheetTitle>
        </SheetHeader>
        {loading ? (
          <SectionLoader />
        ) : (
          <div>
            <Table>
              <TableCaption>A list of your recent players.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-nowrap">Team Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data &&
                  data?.map((player, index: number) => {
                    let active = false;
                    if (selected) {
                      active = selected?.some(
                        (item) => item.userId === player?.userId
                      );
                    }
                    //console.log(active, player?.userId);
                    return (
                      <PlayerItem
                        player={player}
                        key={index}
                        active={active}
                        onAdd={handleAddUser}
                        selected={selected?.find(
                          (item) => item?.userId === player?.userId
                        )}
                      />
                    );
                  })}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <SubmitButton
                loading={sloading}
                disabled={sloading}
                type="button"
                onClick={() => handleSave()}
              >
                Save
              </SubmitButton>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddPlayers;
