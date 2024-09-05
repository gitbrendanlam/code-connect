import React from 'react';
import Calendar from '../components/Calendar';

const EditAvailabilityPage: React.FC = () => {
  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    <div className="flex justify-between h-screen">
      <h1>Welcome to My React App</h1>
      <div className="w-2/3">
        <Calendar/>
      </div>      
    </div>
  );
};

export default EditAvailabilityPage;