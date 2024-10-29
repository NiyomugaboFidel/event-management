
import { useFetchEvents } from '../hooks/useFetchEvents';
import EventCard from './EventCard';

export default function EventList() {
  const { events, loading, error } = useFetchEvents();

  if (loading) return <div className="text-center p-4">Loading events...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}