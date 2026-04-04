export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";


export const authRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email"
]


export const isAuthRoute = (path: string) => {
    return authRoutes.some(route => route === path);
}


export type RouteConfig = {
    exact: string[];
    pattern: RegExp[]
}

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: []
}


export const adminProtectedRoutes: RouteConfig = {
    exact: [],
    pattern: [/^\/admin\/dashboard/] // Matches any route that starts with /admin/dashboard
}

export const doctorProtectedRoutes: RouteConfig = {
    exact: [],
    pattern: [/^\/doctor\/dashboard/] // Matches any route that starts with /doctor/dashboard
}

export const patientProtectedRoutes: RouteConfig = {
    exact: ["/payment/success"],
    pattern: [/^\/dashboard/] // Matches any route that starts with /dashboard
}


export const isRouteMatched = (path: string, routeConfig: RouteConfig) => {
    if (routeConfig.exact.includes(path)) {
        return true;
    }
    return routeConfig.pattern.some(pattern => pattern.test(path));
}


export const getRouteOwner = (path: string): UserRole | "COMMON" | null => {
    if (isRouteMatched(path, commonProtectedRoutes)) {
        return "COMMON";
    }
    if (isRouteMatched(path, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatched(path, doctorProtectedRoutes)) {
        return "DOCTOR";
    }
    if (isRouteMatched(path, patientProtectedRoutes)) {
        return "PATIENT";
    }
    return null; // No matching route found
}


export const getDefaultDashboardRoute = (role: UserRole) => {
    switch (role) {
        case "SUPER_ADMIN":
        case "ADMIN":
            return "/admin/dashboard";
        case "DOCTOR":
            return "/doctor/dashboard";
        case "PATIENT":
            return "/dashboard";
        default:
            return "/";
    }
}


export const isValidRedirectForRole = (redirectPath: string, role: UserRole | null) => {
    if (!role) return false;
    const unifiySuperAdminAndAdminRole = role === "SUPER_ADMIN" ? "ADMIN" : role;
    role = unifiySuperAdminAndAdminRole as UserRole;

    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === "COMMON" || routeOwner === null) {
        return true; // All roles can access common routes
    }



    if (routeOwner === role) {
        return true; // User can access routes meant for their role
    }

    return false; // Redirect path is not valid for the user's role
}