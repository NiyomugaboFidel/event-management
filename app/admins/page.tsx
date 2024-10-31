
'use client';

import { useState } from 'react';
import AddEventForm from './AddEventForm';
import AdminEventList from './EventList';
import BookingsTable from './BookingTable';

export default function AdminDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
 const handlershowAddForm = ()=>{
  setShowAddForm(!showAddForm)
  setShowBooking(false);
  setShowEvents(false);
 }  
 const handlerShowEvents = ()=>{
  setShowAddForm(false)
  setShowBooking(false);
  setShowEvents(!showEvents);
 }  
 const handlerShowBooking = ()=>{
  setShowAddForm(false)
  setShowBooking(!showBooking);
  setShowEvents(false);
 }  

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
         <div className='flex items-center justify-center gap-[20px]'>
             <button
              onClick={handlerShowEvents}
              className={`px-4 py-2 border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-black
               ${!showEvents === true ? 'bg-gray-100 hover:bg-gray-200' :' text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' }`}
               >Events</button>
             <button
               onClick={handlerShowBooking}
               className={`px-4 py-2 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-black
                 ${!showBooking === true ? 'bg-gray-100 hover:bg-gray-200' :' text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' }`}>Bookings</button>
             <button 
            onClick={handlershowAddForm}
            className={`px-4 py-2 border border-transparent rounded-md 
              shadow-sm text-sm font-medium text-black
               ${!showAddForm === true ? 'bg-gray-100 hover:bg-gray-200' :' text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500' }`}>Post Event</button>
          </div> 
        <button
          onClick={handlershowAddForm}
          className=" hidden lg:block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {showAddForm ? 'Hide Form' : 'Add New Event +'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddEventForm />
        </div>
      )}
       { showEvents && (
          <div>
            <h2 className='text-[28px] text-black font-bold leading-[42px]'>Events List</h2>
            <AdminEventList />
          </div>
       )
      
       }
       { showBooking && (
         <BookingsTable />
       )
      
       }
     
    </div>
  );
}