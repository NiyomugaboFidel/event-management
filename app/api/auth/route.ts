import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/mongodb';
import Admin from '@/app/models/Admin';


const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    await connectDB();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
