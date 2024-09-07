import React from 'react';
import GroupActions from '../components/GroupActions';

interface GroupActionsProps {
  onCreateEvent: () => void;
}


const GroupAction: React.FC<GroupActionsProps> = ({ onCreateEvent }) => {
  return (
    <div className="w-full mx-auto bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
      {/* Header with padding */}
      <h1 className="text-4xl font-semibold text-gray-900 p-2">Actions</h1>
      
      {/* Container with divider for the buttons */}
      <div className="divide-y divide-gray-100">
        <div className="flex flex-col items-center justify-center p-6 gap-4">
          {/* Create Event Button */}
          <button 
            className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full max-w-xs"
            onClick={onCreateEvent} // Trigger onCreateEvent when clicked
          >
            Create Event
          </button>
          {/* Edit Group Button */}
          <button className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full max-w-xs">
            Edit Group
          </button>
          {/* Leave Group Button */}
          <button className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 w-full max-w-xs">
            Leave Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupAction;
