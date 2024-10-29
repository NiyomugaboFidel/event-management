import { useState } from 'react';

interface BookingData {
  attendeeName: string;
  attendeeEmail: string;
  numberOfSeats: number;
}

export function useBookEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const bookEvent = async (eventId: string, bookingData: BookingData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/events/${eventId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book event');
      }
      
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to book event'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { bookEvent, loading, error };
}