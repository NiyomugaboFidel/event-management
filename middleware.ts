import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "fidele";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth_token')?.value;
    console.log(token);

    // if (!token) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  return NextResponse.next();
    // try {
    //   verify(token, JWT_SECRET);
    //   return NextResponse.next();
    // } catch (error) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}
