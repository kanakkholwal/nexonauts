import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //  SEO Redirects
  const toolPaths = [
    "/tool-scout/tools/",
    "/toolbox/tools/",
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
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
