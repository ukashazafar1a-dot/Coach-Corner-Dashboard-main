import { deleteCookie } from "@/app/actions";
import { cookieName } from "@/lib/utils";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";

const fetchAdmin = async (slug?: any, options: any = {}) => {
  try {
    const APIURL = process.env.NEXT_PUBLIC_API_URL as string;
    let authHeader = {};
    const encryptedSessionData = cookies().get(cookieName)?.value;
    if (encryptedSessionData) {
      let user = JSON.parse(encryptedSessionData);
      const { token } = user;
      authHeader = token ? { Authorization: `Bearer ${token}` } : {};
    }
    const headers = {
      "Content-Type": "application/json",
      ...authHeader,
      ...options?.headers,
    };
    const res = await fetch(`${APIURL}/api${slug}`, {
      headers,
    });
    //console.log(res);
    if (res?.status === 403) {
      const result = await res.json();
      // console.log(result)
      return {
        messages: result?.Messages,
        succeeded: result?.Succeeded,
        status: 403,
      };
    }
    if (res?.status == 401) {
      const result = await res.json();
      // console.log(result)
      return { ...result, status: 401 };
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return notFound();
  }
};

export default fetchAdmin;
