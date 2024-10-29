// app/admin/page.tsx
'use client';

import { useState } from 'react';
import AddEventForm from './AddEventForm';
import AdminEventList from './EventList';

export default function AdminDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {showAddForm ? 'Hide Form' : 'Add New Event'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8">
          <AddEventForm />
        </div>
      )}

      <AdminEventList />
    </div>
  );
}