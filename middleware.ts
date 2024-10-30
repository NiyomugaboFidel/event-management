import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {

  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    // Redirect if token is missing
    console.log("No token found, redirecting to login.");
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode('fidele');
    await jwtVerify(token, secret);
    // Token is valid, proceed to the route
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // Redirect if token verification fails
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'], 
};
