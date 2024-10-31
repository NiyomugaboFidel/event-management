import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/mongodb';
import Admin from '@/app/models/Admin';

const JWT_SECRET = 'fidele_developer';

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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, 
    });

    return response;
  } catch (error) {
    console.error('Authentication error:', error); 
    return NextResponse.json(
      { error: 'Authentication failed', details: error }, 
      { status: 500 }
    );
  }
}
