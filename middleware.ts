import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  SEO Redirects
  const toolPaths = ["/tool-scout/tools/", "/toolbox/", "/toolzen/tools/"];
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

  const protectedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route)
  );
  if (protectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_AUTH_SECRET,
    });

    if (!token) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(redirectUrl);
    }
    headers.set("x-protected-route", "true");
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};
