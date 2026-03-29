'use server'
import jwt from "jsonwebtoken";
import { setCookie } from "./cookieUtils";


const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_TOKEN as string;


const getTokenRemainingSeconds = (token: string): number => {

    if (!token) {
        return 0;
    }


    try {
        const tokenPayload = JWT_ACCESS_SECRET ? jwt.verify(token, JWT_ACCESS_SECRET) as jwt.JwtPayload : jwt.decode(token) as jwt.JwtPayload;

        if (!tokenPayload || !tokenPayload.exp) {
            return 0;
        }

        const remainingSeconds = tokenPayload.exp - Math.floor(Date.now() / 1000);
        return remainingSeconds > 0 ? remainingSeconds : 0;

    } catch (error) {
        console.error("Error occurred while verifying token:", error);
        return 0;
    }
}

export const setTokenInCookies = async (name: string, token: string) => {
    const maxAgeInSeconds = getTokenRemainingSeconds(token);
    await setCookie(name, token, maxAgeInSeconds);
}