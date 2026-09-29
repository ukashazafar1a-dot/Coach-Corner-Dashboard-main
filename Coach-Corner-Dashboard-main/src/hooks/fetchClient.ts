import { chatURL, extractErrorMessages, fetchCookie } from "@/lib/utils";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
/**
 * Type definition for the options parameter in fetchClient function.
 */
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Centralized fetch function to handle common setup and processing.
 * @param {string} endpoint - The endpoint URL (relative to the base URL).
 * @param {FetchOptions} [options={}] - The fetch options including method, body, etc.
 * @param {boolean} [base=true] - Whether to include the base URL in the endpoint.
 * @returns {Promise<any>} The response from the fetch request.
 */
async function fetchClient(
  endpoint: string,
  options: FetchOptions = {},
  base: boolean = true
): Promise<any> {
  const user = JSON.parse(fetchCookie() as string);
  const org = JSON.parse(fetchCookie("orgId") as string);
  const defaultHeaders: Record<string, string> = {};

  if (user?.token) {
    defaultHeaders["Authorization"] = `Bearer ${user?.token}`;
  }
  if (org?.id) {
    defaultHeaders["OrgId"] = org?.id;
  }
  const headers: Record<string, string> = {
    ...defaultHeaders,
    ...options.headers,
  };

  // Only set Content-Type for non-FormData bodies
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  const url = `${base ? BASE_URL : chatURL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    if (response?.status == 400) {
      const res = await response.json();
      const msgs = extractErrorMessages(res?.errors);
      const newRes = {
        succeeded: false,
        messages: [...msgs, ...(res?.messages ? res?.messages : []), res?.title],
      };
      return newRes;
    }
    if (response?.status === 403) {
      const result = await response?.json();
      // console.log(result)
      return {
        messages: result?.Messages,
        succeeded: result?.Succeeded,
        status: 403,
      };
    }
    if (response?.status === 500) {
      const result = await response?.json();
      // console.log(result)
      return {
        data: result?.Data,
        messages: result?.Messages,
        succeeded: result?.Succeeded,
        status: 500,
      };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch Client Error:", error);
    return null;
  }
}

export default fetchClient;
