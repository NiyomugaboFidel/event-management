
// hooks/useBookEvent.ts
export function useBookEvent() {
  const bookEvent = async (eventId: string) => {
    const response = await fetch(`/api/events/${eventId}/book`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to book event');
    }
    
    return response.json();
  };

  return bookEvent;
}