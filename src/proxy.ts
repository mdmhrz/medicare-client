import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    console.log(request)

}

export const config = {
    matcher: [
        /* Match all request paths except for the ones starting with:
            * -api (API routes)
            * -_next/static (Next.js static files)
            * -_next/image (Next.js image optimization)
            * -favicon.ico (favicon)
            * -sitemap.xml (sitemap)
            * -robots.txt (robots.txt)
            * -.well-known (well-known directory for security and other metadata) 
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)'
    ]
}