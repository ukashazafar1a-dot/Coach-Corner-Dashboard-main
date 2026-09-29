import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieName, cookieOrgId, cookieSTId } from "./lib/utils";
import { authenticateAdmin } from "./app/actions";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  //console.log('on the server, all the cookies are => ',request.cookies)
  const currentUserCookie =  request.cookies.get(cookieName)?.value;
  const currentOrgIdCookie = request.cookies.get(cookieOrgId)?.value;
  const currentSelectTeam =  request.cookies.get(cookieSTId)?.value;
  //console.log("Pathname:", pathname);
  //console.log("User:", currentUserCookie);
  //console.log("OrgId:", currentOrgIdCookie);
  //console.log("SelectTeam:", currentSelectTeam);

  // Bypass requests for static files and Next.js internal assets
  if (pathname.startsWith("/_next") || pathname.startsWith("/static")) {
    return NextResponse.next();
  }

  // Allow access to account-related pages for unauthenticated users
  if (pathname.startsWith("/account")) {
    if (!currentUserCookie) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to the login page
  if (!currentUserCookie) {
    request.nextUrl.pathname = "/account/login";
    return NextResponse.redirect(
      new URL(`/account/login?hardReload=true&rb=${pathname}`, request.url)
    );
  }

  try {
    // Parse user cookie and authenticate
    const user = JSON.parse(currentUserCookie);
    const isAuthenticated = await authenticateAdmin(user);
    if (isAuthenticated) {
      // If both orgId & selected team exit let it go to any page. 
      if (currentOrgIdCookie && currentSelectTeam) {
        return NextResponse.next();
      }
      // Redirect to organizations page if orgId exists but select team is missing
      if (currentOrgIdCookie && !currentSelectTeam) {
        return pathname === "/organizations"
          ? NextResponse.next()
          : NextResponse.redirect(new URL(`/organizations?hardReload=true&rb=${pathname}`, request.url));
      }
      // Redirect to organizations page if orgId is missing
      if (!currentOrgIdCookie && pathname !== "/organizations") {
        return NextResponse.redirect(new URL(`/organizations?hardReload=true&rb=${pathname}`, request.url));
      }
      // Allow access to /organizations page if no orgId or select team is present
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Authentication error:", error);
  }

  // Redirect non-admin or unauthenticated users to the homepage
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
