import { NextRequest, NextResponse } from "next/server";
import jwt_decode from "jwt-decode";

export async function middleware(request: NextRequest) {
  const API_URL = request.cookies.get("apiUrl")?.value;

  if (request.cookies.has("x-token")) {
    const token = request.cookies.get("x-token")?.value;

    const decoded: any = jwt_decode(token!);

    if (decoded.exp * 1000 < Date.now()) {
      request.cookies.delete("x-token");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const resp = await fetch(`${API_URL}/getuserid/${decoded.id}`, {
      method: "GET",
    });

    const { user } = await resp.json();

    if (!user) {
      request.cookies.delete("x-token");
      return NextResponse.redirect(new URL("/", request.url));
    } else if (
      (request.nextUrl.pathname.includes("/add") ||
        request.nextUrl.pathname.includes("/edit") ||
        request.nextUrl.pathname.includes("/add-chapter") ||
        request.nextUrl.pathname.includes("/content")) &&
      user.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
