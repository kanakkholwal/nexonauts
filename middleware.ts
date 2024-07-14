import { authOptions } from "app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin", "/feed"];


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  SEO Redirects
  const toolPaths = [
    "/tool-scout/tools/",
    "/toolbox/",
    "/toolzen/tools/",
  ];
  const matchedPath = toolPaths.find((path) => pathname.startsWith(path));

  if (matchedPath) {
    const newUrl = new URL(
      pathname.replace(matchedPath, "/scout/tools/"),
      request.url
    );
    return NextResponse.redirect(newUrl);
  } else if (pathname.startsWith("/toolbox?query")) {
    const newUrl = new URL(
      pathname.replace("/toolbox?query", "/scout/browse?query"),
      request.url
    );
    return NextResponse.redirect(newUrl);
  }

  const headers = new Headers(request.headers);
  const rootUrl = process.env.NEXTAUTH_URL as string;
  headers.set("x-current-path", rootUrl + pathname);

  const protectedRoute = protectedRoutes.find((route) => pathname.startsWith(route));
  if (protectedRoute) {
    headers.set("x-protected-route", "true");
    const session = await getServerSession(authOptions);
    const isAuthorized = !!session?.user;
    if(!isAuthorized){
      const newUrl = new URL(rootUrl + "/login");
      newUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(newUrl, { headers });
    }
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
