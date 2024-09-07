'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ isOpen, onClose }) => {
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    summary: '',
    location: '',
    description: '',
    startDateTime: '',
    startTimeZone: 'UTC',
    endDateTime: '',
    endTimeZone: 'UTC',
    recurrence: '',
    attendees: '',
    remindersUseDefault: true,
    remindersOverrides: '',
    colorId: '',
  });

  // Handle input changes for form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for checkbox fields
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Convert the reminders overrides input into the expected format
    const remindersOverrides = formData.remindersOverrides
      ? formData.remindersOverrides.split(',').map((reminder) => {
          const [method, minutes] = reminder.trim().split(':');
          return { method, minutes: parseInt(minutes, 10) };
        })
      : undefined;

    // Convert attendees input to expected format
    const attendees = formData.attendees
      ? formData.attendees.split(',').map((email) => ({ email: email.trim() }))
      : undefined;

    // Prepare the request body to match the API's expected format
    const requestBody = {
      summary: formData.summary,
      location: formData.location,
      description: formData.description,
      start: {
        dateTime: formData.startDateTime,
        timeZone: formData.startTimeZone,
      },
      end: {
        dateTime: formData.endDateTime,
        timeZone: formData.endTimeZone,
      },
      recurrence: formData.recurrence ? [formData.recurrence] : undefined,
      attendees,
      reminders: {
        useDefault: formData.remindersUseDefault,
        overrides: remindersOverrides,
      },
      colorId: formData.colorId,
    };

    // Send the data to the backend API endpoint
    try {
      const response = await fetch('/create-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.text();
        alert(`Event created successfully: ${result}`);
        onClose(); // Close the dialog after successful creation
      } else {
        alert('Failed to create event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event.');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Create New Event
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <form onSubmit={handleSubmit}>
                    {/* Form fields for event details */}
                    <div className="mb-4">
                      <label className="block text-gray-700">Summary:</label>
                      <input type="text" name="summary" value={formData.summary} onChange={handleChange} className="border rounded w-full py-2 px-3" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Location:</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Description:</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="border rounded w-full py-2 px-3"></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Start DateTime:</label>
                      <input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} className="border rounded w-full py-2 px-3" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">End DateTime:</label>
                      <input type="datetime-local" name="endDateTime" value={formData.endDateTime} onChange={handleChange} className="border rounded w-full py-2 px-3" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Recurrence:</label>
                      <input type="text" name="recurrence" value={formData.recurrence} onChange={handleChange} className="border rounded w-full py-2 px-3" placeholder="e.g., RRULE:FREQ=WEEKLY;COUNT=10" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Attendees (comma-separated emails):</label>
                      <input type="text" name="attendees" value={formData.attendees} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Reminders (method:minutes, comma-separated):</label>
                      <input type="text" name="remindersOverrides" value={formData.remindersOverrides} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                    </div>
                    <div className="mb-4 flex items-center">
                      <input type="checkbox" name="remindersUseDefault" checked={formData.remindersUseDefault} onChange={handleCheckboxChange} className="mr-2" />
                      <label className="text-gray-700">Use default reminders</label>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Color ID:</label>
                      <input type="text" name="colorId" value={formData.colorId} onChange={handleChange} className="border rounded w-full py-2 px-3" />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Create Event
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default CreateEvent;