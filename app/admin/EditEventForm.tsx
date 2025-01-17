"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  totalSeats: number;
  availableSeats: number;
}

interface EditEventFormProps {
  event: Event;
  onCancel: () => void;
}

export default function EditEventForm({ event, onCancel }: EditEventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    date: new Date(event.date).toISOString().slice(0, 16),
    totalSeats: event.totalSeats,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/events/event?id=${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // throw new Error("Failed to update event");
        toast.error('❌Failed to update event"')
      }

      router.refresh();
      window.location.reload();
      onCancel();
      toast.success('✅Event Edited Successful')
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error(err instanceof Error ? err.message : "❌An error occurred")
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full p-2 border  rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="mt-1 block p-2 border w-full rounded-md border-gray-600  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          type="datetime-local"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block p-2 border w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="totalSeats"
          className="block text-sm font-medium text-gray-700"
        >
          Total Seats
        </label>
        <input
          type="number"
          id="totalSeats"
          value={formData.totalSeats}
          onChange={(e) =>
            setFormData({ ...formData, totalSeats: parseInt(e.target.value) })
          }
          min={event.totalSeats - (event.totalSeats - event.availableSeats)}
          className="mt-1 block w-full p-2 border rounded-md border-gray-600  shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
