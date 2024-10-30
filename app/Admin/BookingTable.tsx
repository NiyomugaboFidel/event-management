'use client'
import { useState, useEffect } from 'react';

type Booking = {
  _id: string;
  event: {
    title: string;
  };
  attendeeName: string;
  attendeeEmail: string;
  numberOfSeats: number;
};

const BookingsTable = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

   const handlerSetItemsPerPage = ()=>{
    setItemsPerPage(5);
   }
   handlerSetItemsPerPage();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  const getRowColor = (booking: Booking): string => {
    if (booking.event.title.startsWith('A')) {
      return 'bg-blue-100';
    } else {
      return 'bg-gray-100';
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Bookings</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Event</th>
            <th className="px-4 py-2 border">Attendee Name</th>
            <th className="px-4 py-2 border">Attendee Email</th>
            <th className="px-4 py-2 border">Seats Booked</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((booking) => (
            <tr key={booking._id} className={getRowColor(booking)}>
              <td className="border px-4 py-2">{booking.event.title}</td>
              <td className="border px-4 py-2">{booking.attendeeName}</td>
              <td className="border px-4 py-2">{booking.attendeeEmail}</td>
              <td className="border px-4 py-2">{booking.numberOfSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(bookings.length / itemsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2 mx-1 rounded-full ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber }
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingsTable;