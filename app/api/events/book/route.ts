import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Booking from "@/app/models/Booking";
import Event from "@/app/models/Event";

interface BookingRequestBody {
  attendeeName: string;
  attendeeEmail: string;
  numberOfSeats: number;
}

export async function POST(request: NextRequest) {
  try {
    // Extract ID from URL search params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('eventId');

    if (!id) {
      return NextResponse.json(
        { error: 'Event ID is required' },
        { status: 400 }
      );
    }

    const body: BookingRequestBody = await request.json();
    
    // Validate the request body
    if (!body.attendeeName || !body.attendeeEmail || body.numberOfSeats <= 0) {
      return NextResponse.json(
        { error: 'Invalid booking data' },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if the event exists using the extracted `id`
    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    // Check for available seats
    const newAvailableSeats = event.availableSeats - body.numberOfSeats;
    if (newAvailableSeats < 0) {
      return NextResponse.json(
        { error: 'Not enough available seats' },
        { status: 400 }
      );
    }

    // Create the booking and update the available seats
    const bookingEvent = await Booking.create({
      ...body,
      event: id,
    });

    event.availableSeats = newAvailableSeats;
    await event.save();

    return NextResponse.json(bookingEvent, { status: 201 });
  } catch (error) {
    console.error("Booking Error:", error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}