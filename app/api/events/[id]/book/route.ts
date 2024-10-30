import connectDB from "@/app/lib/mongodb";
import Booking from "@/app/models/Booking";
import Event from "@/app/models/Event";
import { NextResponse } from "next/server";

interface BookingRequestBody {
  attendeeName: string;
  attendeeEmail: string;
  numberOfSeats: number;
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate request body
    const body: BookingRequestBody = await request.json();
    if (!body.attendeeName || !body.attendeeEmail || body.numberOfSeats <= 0) {
      return NextResponse.json(
        { error: 'Invalid booking data' },
        { status: 400 }
      );
    }

    await connectDB();

    // Create booking
    const BookingEvent = await Booking.create({
      ...body,
      event: params.id,
    });

    // Update event available seats
    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const newAvailableSeats = event.availableSeats - body.numberOfSeats;
    if (newAvailableSeats < 0) {
      return NextResponse.json(
        { error: 'Not enough available seats' },
        { status: 400 }
      );
    }

    event.availableSeats = newAvailableSeats;
    await event.save();

    return NextResponse.json(BookingEvent, { status: 201 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
