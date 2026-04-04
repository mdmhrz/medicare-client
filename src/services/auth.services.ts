'use server'

import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined in environment variables");
}

export async function refreshToken(refreshToken: string): Promise<boolean> {
    try {

        const response = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${refreshToken}`,
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            console.error("Failed to refresh token. Status:", response.status);
            return false;
        }

        if (response.ok) {
            const data = await response.json();
            const { accessToken, refreshToken: newRefreshToken, token } = data;

            // Update cookies with new tokens
            if (accessToken) {
                await setTokenInCookies("accessToken", accessToken);
            }

            if (newRefreshToken) {
                await setTokenInCookies("refreshToken", newRefreshToken);
            }

            if (token) {
                await setTokenInCookies("better-auth.session_token", token, 24 * 60 * 60);
            }

            return true;
        }

        return false
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}