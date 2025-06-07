import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // get the pathname from the request
    const pathname = request.nextUrl.pathname;
    // get the token from the cookies
    const token = request.cookies.get("token")?.value;
    const isPublicPath = pathname === '/login' || pathname === '/signup' || pathname === '/verifyEmail';// on these path if user have token then no need to visit public path.
    if (isPublicPath && token) {
        // if user have token then redirect to profile page
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!token && !isPublicPath) {
        // if user don't have token and is not on public path then redirect to login page
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/profile',
        '/signup'
    ]
}



