'use client';
import { useState, useEffect } from 'react';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; 
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
        

        const currentDate = new Date();

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
