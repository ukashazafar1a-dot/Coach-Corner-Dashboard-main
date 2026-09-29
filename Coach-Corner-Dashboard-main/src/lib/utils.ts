import {
  Coachclaim,
  CookieType,
  orderObject,
  OrganizationAddress,
  registerForm,
  User,
} from "@/helpers/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "timeago.js";
export const baseURL = process.env.NEXT_PUBLIC_API_URL as string;
export const chatURL = process.env.NEXT_PUBLIC_CHAT_URL as string;
export const chatSocketURL = process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string;

export const cookieName = "ccda";
export const cookieOrgId = "ccda-org-id";
export const cookieSTId = "ccda-st-id";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getCookieId = (type: CookieType = "user") => {
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
export const fetchCookie = (type: CookieType = "user") => {
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
export const getOrderObject = (original: registerForm): orderObject => {
  return {
    billType: original?.billType,
    user: {
      organizationName: original?.organizationName,
      organizationType: original?.organizationType,
      organizerAddress: {
        street: original?.street,
        areaTown: original?.areaTown,
        city: original?.city,
        state: original?.state,
        zipCode: original?.zipCode,
        country: original?.country,
      },
      description: original?.bio,
      fName: original?.fName,
      lName: original?.lName,
      email: original?.email,
      password: original?.password,
      billType: original?.billType,
    },
    packageId: original?.packageId,
  };
};

export const isTokenExpired = (userToken: User): boolean => {
  const currentTime = new Date();
  const tokenExpiryTime = new Date(userToken?.expireAt as any);
  // Compare the current time with the token expiry time
  return currentTime > tokenExpiryTime;
};
export const currencyFormatter = (currency: number) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
export const avatars = [
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1727099653/cc-site-assets/dashboard-assets/27470334_7309681_tndh4k.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585487/cc-site-assets/avatars/375238354_11475215_pgohnb.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585486/cc-site-assets/avatars/androgynous-avatar-non-binary-queer-person_spy57u.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585486/cc-site-assets/avatars/27470357_7309685_tumn8y.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585486/cc-site-assets/avatars/27470370_7309687_zkkaxl.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585485/cc-site-assets/avatars/27470336_7294793_ecdm35.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585485/cc-site-assets/avatars/27470355_7309678_zi3t4y.jpg",
  "https://res.cloudinary.com/ddkdvh5ps/image/upload/v1729585485/cc-site-assets/avatars/27470333_7309693_zsrkik.jpg",
];

export const getAvatar = (id?: number) => {
  if (id !== undefined && id >= 0 && id < avatars.length) {
    return avatars[id];
  }
  const randomId = Math.floor(Math.random() * avatars.length);
  return avatars[randomId];
};

export const isDeviceMobile = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth < 768) {
      return true;
    }
    return false;
  }
};

export const timeAgo = (date: string) => {
  if (!date) return;
  return format(date);
};

export const hoursAgo = (isoString: string) => {
  if (!isoString) return;

  const date = new Date(isoString);
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisWeek =
    now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000 &&
    date.getTime() < now.getTime();

  if (isToday) {
    // Format as `h:mm A` for today
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else if (isThisWeek) {
    // Format as `Wednesday, h:mm A` for dates in this week
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  } else {
    // Format as `MM-DD-YY, h:mm A` for older dates
    return `${date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
    })}, ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  }
};


export const returnAddress = (address: OrganizationAddress) => {
  return [
    address.street,
    address.areaTown,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ]
    .filter((part) => part && part.trim() !== "") // Remove null or empty strings
    .join(", ");
};

export const getFutureDate = (hours: number) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString(); // Use ISO string format as value
};

/**
 * Formats an ISO date string into a readable format.
 * @param isoDate - The ISO date string to format (e.g., "2024-11-05T12:46:39.466153+00:00").
 * @returns A formatted, readable date string (e.g., "November 5, 2024, 12:46 PM").
 */
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

/**
 * Extracts all error messages from the errors object in the API response.
 * @param errors - The API response Errors containing the errors messages.
 * @returns An array of error messages.
 */
export const extractErrorMessages = (
  errors: Record<string, string[]>
): string[] => {
  const messages: string[] = [];
  // Loop through each key in the errors object
  for (const key in errors) {
    if (errors[key] && Array.isArray(errors[key])) {
      // Concatenate messages from each field
      messages.push(...errors[key]);
    }
  }
  return messages;
};

export const returnAge = (dateString: string) => {
  if (!dateString) return "";
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  // Adjust age if the birth month/day has not yet occurred this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
};

/**
 * Checks if a specific claim exists in an array of coach claims.
 * @param claims - Array of Coachclaim types.
 * @param claimToCheck - The claim to check for.
 * @returns true if the claim exists in the array, false otherwise.
 */
export const hasClaim = (
  claims: Coachclaim[] | null | undefined,
  claimToCheck: Coachclaim
): boolean => {
  if (claims) {
    return claims?.includes(claimToCheck);
  } else {
    return false;
  }
};
