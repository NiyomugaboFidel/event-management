import { useState } from "react";
import { useBookEvent } from "../hooks/useBookEvent";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    date: string;
    totalSeats: number;
    availableSeats: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [bookingData, setBookingData] = useState({
    attendeeName: "",
    attendeeEmail: "",
    numberOfSeats: 1,
  });
  const { bookEvent, loading, error } = useBookEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookEvent(event._id, bookingData);
      setShowBooking(false);
      setBookingData({ attendeeName: "", attendeeEmail: "", numberOfSeats: 1 });
      window.location.reload(); // Refresh to update seats
    } catch {
      // Error handling is managed by the hook
    }
  };

  // Check if the event has ended
  const hasEnded = new Date(event.date) < new Date();
  const isSoldOut = event.availableSeats === 0;
  const isDisabled = hasEnded || isSoldOut;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          <span
            className={`px-2 py-1 text-sm rounded-full ${
              isSoldOut ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
            }`}
          >
            {event.availableSeats} seats left
          </span>
        </div>

        <p className="mt-2 text-gray-600">{event.description}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>Date: {new Date(event.date).toLocaleString()}</p>
        </div>

        {!showBooking ? (
          <button
            onClick={() => setShowBooking(true)}
            disabled={isDisabled}
            className={`mt-4 w-full px-4 py-2 border border-transparent duration-200 transition-all ease-in-out rounded-md shadow-sm text-sm font-medium ${
              isDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
          >
            {isSoldOut ? "Sold Out" : "Book Now"}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="attendeeName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="attendeeName"
                value={bookingData.attendeeName}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    attendeeName: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md p-2 border border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isDisabled} // Disable input if the event has ended
              />
            </div>

            <div>
              <label
                htmlFor="attendeeEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="attendeeEmail"
                value={bookingData.attendeeEmail}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    attendeeEmail: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md p-2 border border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isDisabled} // Disable input if the event has ended
              />
            </div>

            <div>
              <label
                htmlFor="numberOfSeats"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Seats
              </label>
              <input
                type="number"
                id="numberOfSeats"
                min="1"
                max={event.availableSeats}
                value={bookingData.numberOfSeats}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    numberOfSeats: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md p-2 border border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isDisabled} // Disable input if the event has ended
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={loading || isDisabled}
                className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
              <button
                type="button"
                onClick={() => setShowBooking(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
