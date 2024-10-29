'use client'
import { useState } from "react";
export function useBookEvent() {
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookEvent = async (eventId: string, bookingData: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${eventId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to book event');
      }

      const data = await response.json();
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