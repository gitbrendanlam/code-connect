import React, { useState, useEffect } from 'react';
import AvailabilityList from '../components/AvailabilityList';
import Calendar from '../components/Calendar';
import AddAvailabilityForm from './../components/AddAvailbilityForm';
import Navbar from '../components/Navbar';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ITimeBlock } from '../slicers/availabilitySlice';

const EditAvailabilityPage: React.FC = () => {  
  const [open, setOpen] = useState(false);
  const [selectBlockIndex, setSelectBlockIndex] = useState(null);

  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    <div className='max-h-screen'>
      <Navbar/>
      <div className="flex justify-between grow-0">
        <div className='grow w-1/3'>
          <AvailabilityList setSelectBlockIndex={setSelectBlockIndex}/>
        </div>
        <div className="w-2/3">
          <Calendar type={'personal'} selectBlockIndex={selectBlockIndex} open={open} setOpen={setOpen}/>
          <AddAvailabilityForm open={open} setOpen={setOpen}/>
        </div>      
      </div>
    </div>
    
  );
};

export default EditAvailabilityPage;