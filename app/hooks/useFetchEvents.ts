// 'use client'
// import { useState, useEffect } from 'react';

// interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   totalSeats: number;
//   availableSeats: number;
// }

// export function useFetchEvents() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('/api/events');
//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return { events, loading, error };
// }
'use client';
import { useState, useEffect } from 'react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // Assuming this is in ISO format
  totalSeats: number;
  availableSeats: number;
}

export function useFetchEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [endedEvents, setEndedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data: Event[] = await response.json();
        setEvents(data);
        
        // Get the current date
        const currentDate = new Date();

        // Separate the events into upcoming and ended
        const upcoming = data.filter(event => new Date(event.date) > currentDate);
        const ended = data.filter(event => new Date(event.date) <= currentDate);

        setUpcomingEvents(upcoming);
        setEndedEvents(ended);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return {events, upcomingEvents, endedEvents, loading, error };
}
