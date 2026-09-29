"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Claims, CookieType } from "@/helpers/types";
import { cookieName, cookieOrgId } from "@/lib/utils";

export const getAuthHeaders = async () => {
  let authHeader = {};
  const encryptedSessionData = cookies().get(cookieName)?.value;
  if (encryptedSessionData) {
    let user = JSON.parse(encryptedSessionData);
    const { token } = user;
    authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {
    "Content-Type": "application/json",
    ...authHeader,
  };
};



export const authenticateAdmin = async (user: any): Promise<any> => {
  //console.log('cookie in authenticateAdmin',user)
  if (user) {
    const decodeToken: Claims = await jwtDecode(user?.token);
    if (!decodeToken) return false;
    if (decodeToken) {
      // if (
      //   decodeToken[
      //     "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      //   ] === "Admin"
      // ) {
      //   return true;
      // } else {
      //   return false;
      // }
      return true;
    }
  } else {
    return false;
  }
};

export async function setCookie(sessionData: any) {
  const userData = JSON.stringify(sessionData);
  cookies().set(cookieName, userData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return true;
}

export async function getCookie() {
  const encryptedSessionData = cookies().get(cookieName)?.value;
  return encryptedSessionData ? JSON.parse(encryptedSessionData) : null;
}

export async function deleteCookie(name:CookieType = "user") {
  cookies().delete(name === "user" ? cookieName : cookieOrgId);
  return true;
}

export const redirectAuthorized = async (result: any) => {
  if (result && result?.status === 401) {
    redirect("/account/login?hardReload=true");
  } else {
    return;
  }
};
