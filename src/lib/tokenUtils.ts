'use server'
import jwt from "jsonwebtoken";
import { setCookie } from "./cookieUtils";


// const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;


const getTokenRemainingSeconds = (token: string): number => {

    if (!token) {
        return 0;
    }


    try {
        const tokenPayload = jwt.decode(token) as jwt.JwtPayload;

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

export const setTokenInCookies = async (
    name: string,
    token: string,
    fallbackMaxAgeInSeconds: number = 24 * 60 * 60,
) => {
    let maxAgeInSeconds;
    if (name !== "better-auth.session_token") {
        maxAgeInSeconds = getTokenRemainingSeconds(token);
    }
    await setCookie(name, token, maxAgeInSeconds ? maxAgeInSeconds : fallbackMaxAgeInSeconds);

}