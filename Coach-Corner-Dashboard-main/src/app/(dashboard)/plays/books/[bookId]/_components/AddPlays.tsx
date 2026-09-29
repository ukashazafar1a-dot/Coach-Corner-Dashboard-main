import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import fetchClient from "@/hooks/fetchClient";
import useApp from "@/context/useApp";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitButton from "@/components/SubmitButton";

type play = {
  id: number;
  name: string;
  isCommunityPlay: boolean;
};
type props = {
  id: any;
  handleRefetch: () => void;
};
const AddPlays = ({ id, handleRefetch }: props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToaster, selectedTeam } = useApp();
  const [plays, setPlays] = useState<play[] | null>(null);
  const [selected, setSelected] = useState<number[] | null>(null);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onPlayChange = (id: number) => {
    if (selected) {
      if (selected.includes(id)) {
        setSelected(selected.filter((item) => item !== id));
      } else {
        setSelected([...selected, id]);
      }
    } else {
      setSelected([id]);
    }
  };

  const onSubmit = async () => {
    //console.log(selected);
    if (!selected || selected.length === 0) {
      setToaster("error", "Please select at least one play");
      return;
    }
    try {
      setIsSubmiting(true);
      const res = await fetchClient(
        `/api/Playbook/${selectedTeam?.id}/book/${id}/AddPlays`,
        {
          method: "POST",
          body: JSON.stringify(selected),
        }
      );
      //console.log(res);
      if (res && res?.succeeded) {
        setToaster("success", res?.messages[0] || "Plays added successfully");
        handleRefetch();
        setOpen(false);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  };

  const getPlays = async () => {
    try {
      setLoading(true);
      const res = await fetchClient(
        `/api/PlayBook/${selectedTeam?.id}/book/${id}/SelectPlays`
      );
      if (res && res?.succeeded) {
        const { data } = res;
        setPlays(data);
      } else {
        setToaster("error", res?.messages[0] || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      getPlays();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger className="btn btn--primary">Add plays</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add plays</DialogTitle>
          {loading ? (
            <>
              <Skeleton className="h-12 w-full mb-3" />
              <Skeleton className="h-12 w-full mb-3" />
            </>
          ) : (
            <div className="block">
              <p className="text-sm text-gray-500 mb-2">
                {selected ? selected?.length : 0} Selected
              </p>
              <div className="block mb-3">
                {plays && plays?.length > 0 ? (
                  plays?.map((play, index: number) => {
                    const active = selected?.includes(play?.id);
                    return (
                      <div
                        className="border p-2 rounded flex items-center justify-start gap-2 mb-1"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          id={`play-${play?.id}`}
                          value={play?.id}
                          onChange={() => onPlayChange(play?.id)}
                          checked={active}
                          className="checkbox--field"
                        />
                        <label htmlFor={`play-${play?.id}`} className="m-0">
                          {play?.name}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>No Play found!</p>
                )}
              </div>
              <div className="flex items-center justify-end">
                <SubmitButton
                  onClick={() => onSubmit()}
                  loading={isSubmiting}
                  disabled={isSubmiting}
                >
                  Submit
                </SubmitButton>
              </div>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlays;
