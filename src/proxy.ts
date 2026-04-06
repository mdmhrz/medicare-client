import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
    getDefaultDashboardRoute,
    getRouteOwner,
    isAuthRoute,
    UserRole,
} from "./lib/authUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import { refreshTokenMiddleware } from "./services/auth.services";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const tokenResult = accessToken
        ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
        : null;

    const isValidAccessToken = tokenResult?.success ?? false;
    const decoded = tokenResult?.data;

    const rawRole = decoded?.role as UserRole | undefined;
    const userRole: UserRole | null = rawRole
        ? rawRole === "SUPER_ADMIN" ? "ADMIN" : rawRole
        : null;

    const needPasswordChange = decoded?.needPasswordChange ?? false;
    const emailVerified = decoded?.emailVerified ?? false;

    const routeOwner = getRouteOwner(pathname);
    const authRoute = isAuthRoute(pathname);   // your existing function

    // Refresh token logic (optional but good to keep)
    if (accessToken && refreshToken && isValidAccessToken && (await isTokenExpiringSoon(accessToken))) {
        try {
            await refreshTokenMiddleware(refreshToken);
        } catch (e) {
            console.error("Token refresh failed", e);
        }
    }


    // FORCE RESET PASSWORD - HIGHEST PRIORITY
    if (needPasswordChange && isValidAccessToken) {

        // If user is already on reset-password page → allow
        if (pathname === "/reset-password") {
            return NextResponse.next();
        }

        // Otherwise → forcefully redirect to reset-password
        const redirectUrl = new URL("/reset-password", request.url);
        redirectUrl.searchParams.set("redirect", pathname); // optional: remember where they wanted to go
        return NextResponse.redirect(redirectUrl);
    }


    // Reset Password Page Logic (when needPasswordChange is FALSE)
    if (pathname === "/reset-password") {
        if (!isValidAccessToken || !userRole) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // If they don't need to change password anymore → redirect to dashboard
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole), request.url));
    }


    // Verify Email Page
    if (pathname === "/verify-email") {
        if (!isValidAccessToken) {
            return NextResponse.next(); // guest can access
        }
        if (emailVerified) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole!), request.url));
        }
        return NextResponse.next();  // not verified → allow
    }


    // Block logged-in users from other Auth pages (Login, Register, etc.)
    if (isValidAccessToken && authRoute) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
    }

    // Public routes - allow anyone
    if (routeOwner === null) {
        return NextResponse.next();
    }

    // Protect all other routes - must be logged in
    if (!isValidAccessToken || !userRole) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Common routes allowed for all logged-in users
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    }

    // Role-based access
    if (routeOwner && userRole !== routeOwner) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url)
        );
    }

    return NextResponse.next();
}