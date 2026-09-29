import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//Bellow methods are use to get the cookies. As we need to fetch auth values from
//the cookies which are set by the NextJS app.

export const cookieName = "ccda";
export const cookieOrgId = "ccda-org-id";
export const cookieSTId = "ccda-st-id";

export const getCookieId = (type = "user") => {
  if (type === "user") {
    return cookieName;
  } else if (type === "orgId") {
    return cookieOrgId;
  } else if (type === "teamId") {
    return cookieSTId;
  } else {
    return cookieName;
  }
};

export const fetchCookie = (type= "user") => {
  if (typeof document === "undefined") return null;
  const name = getCookieId(type);
  const nameLenPlus = name.length + 1;
  return (
    document?.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
};