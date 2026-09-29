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
import PlayerItem from "./PlayerItem";
import { AddMemberItem } from "@/helpers/types";
type props = {
  members: AddMemberItem[] | null;
  onChange: any;
};
const AddPlayers = ({ onChange, members }: props) => {
  const [open, setOpen] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AddMemberItem[] | null>(null);
  const [selected, setSelected] = useState<AddMemberItem[] | null>(members);

  const getPlayers = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/Team/Members/${selectedTeam?.id}/Select`
      );
      //console.log(res);
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
  const handleSave = () => {
    if (!selected || selected?.length === 0) {
      setToaster("error", "Please add at least one member");
      return;
    }
    //console.log(selected);
    onChange(selected);
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      getPlayers();
    }
  }, [open]);

  useEffect(() => {
    setSelected(members);
  }, [members]);

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
              <button
                className="btn btn--primary"
                type="button"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AddPlayers;
