'use client'
import { useState } from "react";

interface BookingData {
  attendeeName: string;
  attendeeEmail: string;
  numberOfSeats: number;
}

interface BookingResponse {
  success: boolean;
  message?: string;
  bookingId?: string;
}

export function useBookEvent() {
  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookEvent = async (eventId: string, bookingData: BookingData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/book?eventId=${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book event');
      }

      const data: BookingResponse = await response.json();
      setBooking(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookEvent, booking, loading, error };
}
