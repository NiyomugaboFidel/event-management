
import connectDB from "@/app/lib/mongodb";
import Booking from "@/app/models/Booking";

import Event from "@/app/models/Event";
import { NextResponse } from "next/server";



export async function POST(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const body = await request.json();
   await connectDB();

   const BookingEvent = await Booking.create({
     ...body,
     event: params.id,
   });

   const event = await Event.findById(params.id);
   const newAvailableSeats = event.availableSeats - body.numberOfSeats;
   event.availableSeats = newAvailableSeats;
   await event.save();

   return NextResponse.json(BookingEvent, { status: 201 });
 } catch (error) {
   return NextResponse.json(
     { error: 'Failed to create booking' },
     { status: 500 }
   );
 }
}
