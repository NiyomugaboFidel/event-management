import connectDB from "@/app/lib/mongodb";
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().populate('event');
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error); 
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
