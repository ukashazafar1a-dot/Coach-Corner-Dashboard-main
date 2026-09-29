export const returnHours = (value: string) => {
  const date = new Date(value);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesFormatted = minutes.toString().padStart(2, "0");
  return `${hours}:${minutesFormatted} ${ampm}`;
};
export const returnImageSrc = (src: string) => {
  if (!src) return null;
  let w256 = src.replace("upload/", "upload/f_auto,w_256,c_fill/");
  let w512 = src.replace("upload/", "upload/f_auto,w_512,c_fill/");
  let w768 = src.replace("upload/", "upload/f_auto,w_786,c_fill/");
  let w1024 = src.replace("upload/", "upload/f_auto,w_1024,c_fill/");
  let w1280 = src.replace("upload/", "upload/f_auto,w_1280,c_fill/");
  let srcset =
    w256 +
    " 256w," +
    w512 +
    " 512w," +
    w768 +
    " 768w," +
    w1024 +
    " 1024w," +
    w1280 +
    " 1280w";
  return srcset;
};
