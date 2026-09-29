import React from "react";
import PlayerShapeCircleIcon from "@/components/icons/editor/PlayerShapeCircleIcon";
import PlayerShapeOvalIcon from "@/components/icons/editor/PlayerShapeOvalIcon";
import PlayerShapePolygon from "@/components/icons/editor/PlayerShapePolygon";
import PlayerShapeRectangle from "@/components/icons/editor/PlayerShapeRectangle";
import PlayerShapeSquareIcon from "@/components/icons/editor/PlayerShapeSquareIcon";
import PlayerShapeSquareTurnedIcon from "@/components/icons/editor/PlayerShapeSquareTurnedIcon";
import PlayerShapeTriangleIcon from "@/components/icons/editor/PlayerShapeTriangleIcon";
import PlayerSizeIcon from "@/components/icons/editor/PlayerSizeIcon";
import { playerSize } from "@/lib/Editor";

const PlayerSizeShape = () => {
  return (
    <div className="drawer-item pb-3 md:p-4 flex flex-col md:border-r border-[#dddddd] basis-full">
      <div className="drawer-subitem mb-6">
        <div className="drawer-subitem--title mb-6 font-semibold text-base text-[#989898]">
          <span>Player Shape</span>
        </div>
        <div className="drawer-subitem--items flex items-center justify-start gap-4 flex-wrap">
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeCircleIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeOvalIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeSquareIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeRectangle />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeTriangleIcon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapePolygon />
          </button>
          <button type="button" className="drawer-subitem--item">
            <PlayerShapeSquareTurnedIcon />
          </button>
        </div>
      </div>
      <div className="drawer-subitem mb-6">
        <p className="drawer-subitem--title mb-5 font-semibold text-base text-[#989898]">Player Size</p>
        <div className="drawer-subitem--items flex items-center justify-start gap-4 flex-wrap">
          {playerSize?.map((size) => {
            return (
              <button type="button" className="drawer-subitem--item" key={size?.id}>
                <PlayerSizeIcon width={size?.value} height={size?.value} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerSizeShape;
