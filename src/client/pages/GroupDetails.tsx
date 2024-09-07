import React, { useState } from 'react';
import Group from '../components/Group'; // Import the Group component
import GroupActions from '../components/GroupActions'; // Import the GroupActions component
import CreateEvent from '../components/CreateEvent'; // Import the CreateEvent component
import Layout from '../components/Layout';

const GroupDetails: React.FC = () => {
  // State to manage whether the CreateEvent dialog is open or not
  const [isCreateEventOpen, setIsCreateEventOpen] = useState<boolean>(false);

  // Function to handle opening the CreateEvent dialog
  const handleOpenCreateEvent = () => {
    setIsCreateEventOpen(true);
  };

  // Function to handle closing the CreateEvent dialog
  const handleCloseCreateEvent = () => {
    setIsCreateEventOpen(false);
  };

  return (
    <Layout>
      <div className='grid grid-cols-2 divide-x p-5 mx-2'>
        {/* Always render the Group component */}
        <Group />

        {/* Render the GroupActions component */}
        <GroupActions onCreateEvent={handleOpenCreateEvent} />

        {/* Conditionally render the CreateEvent dialog when isCreateEventOpen is true */}
        {isCreateEventOpen && <CreateEvent isOpen={isCreateEventOpen} onClose={handleCloseCreateEvent} />}
      </div>
    </Layout>
  );
};

export default GroupDetails;
