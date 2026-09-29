"use client";
import { CookieType } from "@/helpers/types";
import { cookieName, cookieOrgId, getCookieId } from "@/lib/utils";
import { useCallback } from "react";

/**
 * A custom React hook for managing cookies.
 */

const useCookie = () => {
  /**
   * Gets the value of a cookie by name.
   * @returns {string | undefined} The value of the cookie, or undefined if not found.
   */
  const getCookie = useCallback((type: CookieType = "user") => {
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
  }, []);

  /**
   * Sets a cookie.
   * @param {string} value The value of the cookie.
   * @param {number} days The number of days until the cookie expires.
   */
  const setCookie = useCallback((value: any, type: CookieType = "user") => {
    if (typeof document === "undefined") return null;
    const expires = new Date(value?.expireAt).toUTCString();
    const stringValue = encodeURIComponent(JSON.stringify(value));
    //console.log(expires,stringValue);
    const name = getCookieId(type);
    document.cookie = `${name}=${stringValue}; expires=${expires}; path=/; Secure; SameSite=Strict`;
  }, []);

  /**
   * Deletes a cookie by name.
   */
  const deleteCookie = useCallback((type: CookieType = "user") => {
    if (typeof document === "undefined") return null;
    const name = getCookieId(type);
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }, []);

  return { getCookie, setCookie, deleteCookie };
};

export default useCookie;
