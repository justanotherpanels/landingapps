import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "default_secret_key";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const session = request.cookies.get("session")?.value;

    // 1. Admin Routes Protection (/admin/...)
    if (pathname.startsWith("/admin")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        try {
            const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
            
            // Check if user is NOT an admin (level is 'Member')
            if (payload?.level === "Member") {
                // Redirect Members away from admin area
                return NextResponse.redirect(new URL("/user", request.url));
            }
            
            return NextResponse.next();
        } catch (error) {
            const response = NextResponse.redirect(new URL("/auth/login", request.url));
            response.cookies.delete("session");
            return response;
        }
    }

    // 2. User Protected Routes Check (/user/...)
    if (pathname.startsWith("/user")) {
        if (!session) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        try {
            await jwtVerify(session, key, { algorithms: ["HS256"] });
            return NextResponse.next();
        } catch (error) {
            const response = NextResponse.redirect(new URL("/auth/login", request.url));
            response.cookies.delete("session");
            return response;
        }
    }

    // 3. Redirect logged-in users away from auth pages
    if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
        if (session) {
            try {
                const { payload } = await jwtVerify(session, key, { algorithms: ["HS256"] });
                // If already logged in, send to their respective dashboard
                const target = payload?.level === "Admin" ? "/admin" : "/user";
                return NextResponse.redirect(new URL(target, request.url));
            } catch (error) {
                // Session invalid, let them access login
            }
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/user", "/user/:path*", "/admin", "/admin/:path*", "/auth/login", "/auth/register"],
};
