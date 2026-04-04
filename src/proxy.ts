import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import {
    getDefaultDashboardRoute,
    getRouteOwner,
    isAuthRoute,
    UserRole,
} from "./lib/authUtils";

/**
 * Middleware function
 * Runs before every request and controls access based on authentication and role
 */
export async function proxy(request: NextRequest) {
    // Get current path (example: /login, /admin/dashboard)
    const { pathname } = request.nextUrl;

    // Read access token from cookies
    const accessToken = request.cookies.get("accessToken")?.value;

    /**
     * Verify token once
     * Returns:
     * - success: boolean
     * - data: decoded payload (if valid)
     */
    const tokenResult = accessToken
        ? jwtUtils.verifyToken(
            accessToken,
            process.env.JWT_ACCESS_SECRET as string
        )
        : null;

    // Check if token is valid
    const isValidAccessToken = tokenResult?.success ?? false;

    // Get decoded token data
    const decoded = tokenResult?.data;

    /**
     * Get user role from token
     * Convert SUPER_ADMIN to ADMIN for simpler handling
     */
    const rawRole = decoded?.role as UserRole | undefined;

    const userRole: UserRole | null = rawRole
        ? rawRole === "SUPER_ADMIN"
            ? "ADMIN"
            : rawRole
        : null;

    /**
     * Identify route type
     * routeOwner = which role can access this route
     * isAuth = login/register type routes
     */
    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    /**
     * Rule 1:
     * If logged-in user tries to visit login/register page
     * redirect them to their dashboard
     */
    if (isAuth && isValidAccessToken && userRole) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url)
        );
    }

    /**
     * Rule 2:
     * If route is public (no role required), allow access
     */
    if (routeOwner === null) {
        return NextResponse.next();
    }

    /**
     * Rule 3:
     * If route is protected but user is not logged in
     * redirect to login page
     */
    if (!accessToken || !isValidAccessToken || !userRole) {
        const loginUrl = new URL("/login", request.url);

        // Save original path so user can be redirected back after login
        loginUrl.searchParams.set("redirect", pathname);

        return NextResponse.redirect(loginUrl);
    }

    /**
     * Rule 4:
     * If route is accessible by all logged-in users
     */
    if (routeOwner === "COMMON") {
        return NextResponse.next();
    }

    /**
     * Rule 5:
     * If user does not have permission for this route
     * redirect to their own dashboard
     */
    if (routeOwner && userRole !== routeOwner) {
        return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url)
        );
    }

    /**
     * If everything is valid, allow request
     */
    return NextResponse.next();
}

/**
 * Apply middleware to all routes except:
 * - API routes
 * - Next.js static files
 * - Images and common public files
 */
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};