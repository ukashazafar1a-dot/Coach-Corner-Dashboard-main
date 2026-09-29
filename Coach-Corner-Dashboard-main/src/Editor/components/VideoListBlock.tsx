import IconDelete from "@/components/icons/IconDelete";
import React from "react";

const VideoListBlock = () => {
  return (
    <div className="drawer-item  pb-3 md:p-4  basis-full">
      <div className="drawer-subitem mb-6">
        <div className="flex items-center justify-start gap-3 flex-wrap">
          <div className="relative max-w-32 md:max-w-52 max-h-32">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
              alt="Video"
            />
            <span className="text-white absolute bottom-0 left-0 p-2 z-1 font-medium one-lines text-sm md:text-base">
              Video Title
            </span>
            <button
              type="button"
              className="bg-white/25 p-1 absolute top-0 right-0 z-1"
            >
              <IconDelete />
            </button>
          </div>
          <div className="relative max-w-32 md:max-w-52 max-h-32">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
              alt="Video"
            />
            <span className="text-white absolute bottom-0 left-0 p-2 z-1 font-medium one-lines text-sm md:text-base">
              Video Title
            </span>
            <button
              type="button"
              className="bg-white/25 p-1 absolute top-0 right-0 z-1"
            >
              <IconDelete />
            </button>
          </div>
          <div className="relative max-w-32 md:max-w-52 max-h-32">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
              alt="Video"
            />
            <span className="text-white absolute bottom-0 left-0 p-2 z-1 font-medium one-lines text-sm md:text-base">
              Video Title
            </span>
            <button
              type="button"
              className="bg-white/25 p-1 absolute top-0 right-0 z-1"
            >
              <IconDelete />
            </button>
          </div>
          <div className="relative max-w-32 md:max-w-52 max-h-32">
            <img
              src="https://res.cloudinary.com/ddkdvh5ps/image/upload/v1726569218/image_60_ttlaa5.png"
              alt="Video"
            />
            <span className="text-white absolute bottom-0 left-0 p-2 z-1 font-medium one-lines text-sm md:text-base">
              Video Title
            </span>
            <button
              type="button"
              className="bg-white/25 p-1 absolute top-0 right-0 z-1"
            >
              <IconDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListBlock;
