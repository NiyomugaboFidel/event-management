
import { useState } from 'react';

import { useFetchEvents } from '../hooks/useFetchEvents';
import EditEventForm from './EditEventForm';

export default function AdminEventList() {
  const { events, loading, error } = useFetchEvents();
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setDeleteLoading(eventId);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <div key={event._id} className="bg-white shadow rounded-lg p-6">
          {editingEvent === event._id ? (
            <EditEventForm
              event={event}
              onCancel={() => setEditingEvent(null)}
            />
          ) : (
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingEvent(event._id)}
                    className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    disabled={deleteLoading === event._id}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-900"
                  >
                    {deleteLoading === event._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Date: </span>
                  {new Date(event.date).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Available Seats: </span>
                  {event.availableSeats} / {event.totalSeats}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}