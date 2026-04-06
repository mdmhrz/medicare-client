'use server'

import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

// refresh token
export async function getNewTokenWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`,
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) return false;

        const data = await response.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data;

        // set new tokens
        if (accessToken) await setTokenInCookies("accessToken", accessToken);
        if (newRefreshToken) await setTokenInCookies("refreshToken", newRefreshToken);
        if (token) await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);

        return true;
    } catch (error) {
        console.error("refresh error:", error);
        return false;
    }
}

// wrapper for middleware
export async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
    return await getNewTokenWithRefreshToken(refreshToken);
}

// get user info (pure function)
export async function getUserInfo(accessToken: string, sessionToken?: string) {
    try {
        if (!accessToken) return null;

        const response = await fetch(`${BASE_API_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}; better-auth.session_token=${sessionToken}`,
            },
        });

        if (!response.ok) return null;

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error("getUserInfo error:", error);
        return null;
    }
}