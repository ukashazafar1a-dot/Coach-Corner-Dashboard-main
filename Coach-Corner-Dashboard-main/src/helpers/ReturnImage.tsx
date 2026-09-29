import React from "react";
import { returnImageSrc } from "./generals";

type props = {
  url: any;
  alt?: any;
  classess?: any;
  width?: any;
  height?: any;
};

const ReturnImage = ({ url, alt, classess, width, height }: props) => {
  if (url) {
    const srcset = returnImageSrc(url);
    return (
      <img
        data-src={url}
        src={url}
        srcSet={srcset ? srcset : url}
        data-srcset={srcset}
        alt={alt ? alt : "BlueTicks"}
        className={`${classess ? classess : ""} lazyload`}
        loading="lazy"
        width={width ? width : ""}
        height={height ? height : ""}
      />
    );
  } else {
    return (
      <img
        src={
          "https://res.cloudinary.com/dzmrdbwqh/image/upload/v1704718066/blue-tickets/placeholder-image_m1vdsz.png"
        }
        data-src={
          "https://res.cloudinary.com/dzmrdbwqh/image/upload/v1704718066/blue-tickets/placeholder-image_m1vdsz.png"
        }
        alt={"Placeholder - BlueTicks"}
        className={`${classess ? classess : ""} lazyload `}
        loading="lazy"
        width={width ? width : ""}
        height={height ? height : ""}
      />
    );
  }
};

export default ReturnImage;
