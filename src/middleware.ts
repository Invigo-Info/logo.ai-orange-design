import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(
    /^\/(logo-examples|logo-mockups)\/([^/]+)\/(\d+)\.webp$/
  );
  if (!match) return NextResponse.next();

  const category = match[2];
  const num = match[3];
  const filename = `${category}-logo-${num}.webp`;

  const response = NextResponse.next();
  response.headers.set("Content-Disposition", `attachment; filename="${filename}"`);
  return response;
}

export const config = {
  matcher: ["/logo-examples/:path*", "/logo-mockups/:path*"],
};
