"use client";
import { Member, MemberItem } from "@/helpers/types";
import React, { useState } from "react";
import PlayerModel from "./PlayerModel";
import { getAvatar } from "@/lib/utils";

type props = {
  player: MemberItem;
};

const PlayerCard = ({ player }: props) => {
  const [open, setOpen] = useState(false);
  const handleOnClose = () => {
    setOpen(!open);
  };
  return (
    <>
      {open && (
        <PlayerModel open={open} handleClose={handleOnClose} player={player} />
      )}
      <div
        className={`player--card card-view`}>
        <div className="card-part relative">
          <div className="relative w-full mb-2">
            <div className="card-block h-64 w-full overflow-hidden flex justify-center bg-gray-100 rounded">
              {/* <img
                src={`https://res.cloudinary.com/ddkdvh5ps/image/upload/v1706534897/cc-site-assets/dashboard-assets/image_38_ppdvmy.png`}
                alt="Player Background"
                className="absolute inset-0 h-full w-full background-board"
              /> */}
              <img
                src={player?.image ? player?.image : getAvatar(player?.memberId)}
                alt="Player Background"
                className="mx-auto relative z-1 max-w-full"
                loading="lazy"
              />
            </div>
          </div>
          <h3
            className="player-btn p-2 cursor-pointer bg-primary text-white text-center rounded text-base h-full w-full"
            onClick={() => setOpen(!open)}
          >
            {player?.fName} {player?.lName}
            <br />({player?.teamRole})
          </h3>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
