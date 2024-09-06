import React, { useState, useEffect } from 'react';
import AvailabilityList from '../components/AvailabilityList';
import Calendar from '../components/Calendar';
import AddAvailabilityForm from './../components/AddAvailbilityForm';
import Navbar from '../components/Navbar';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addAvailability } from '../slicers/availabilitySlice';

const testEvents = [{
  week_of: '9-1-2024',
  date: '9-3-2024',
  week_day: 2,
  start_time: '6:00 AM',
},
{
  week_of: '9-1-2024',
  date: '9-6-2024',
  week_day: 5,
  start_time: '7:00 AM',
},
{
  week_of: '9-1-2024',
  date: '9-4-2024',
  week_day: 3,
  start_time: '10:00 AM',
}];

const EditAvailabilityPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const availabilityBlocks = useAppSelector(state => state.availability.AvailabilityBlocks);

  
  // useEffect(() => {
  //   // ==== Create test availability blocks (TO DELETE) ===
  //   testEvents.forEach((event, index) => {
  //     const test = () => dispatch(addAvailability(event));
  //     test();
  //     // availability.push(event);
  //   })
  //   // setAvailabilityBlocks(availability);
  
  //   // ====================================================
  // },[])
  
  
  const [open, setOpen] = useState(false);

  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    <div className='max-h-screen'>
      <Navbar/>
      <div className="flex justify-between grow-0">
        <div className='grow w-1/3'>
          <AvailabilityList/>
        </div>
        <div className="w-2/3">
          <Calendar type={'personal'} open={open} setOpen={setOpen}/>
          <AddAvailabilityForm open={open} setOpen={setOpen}/>
        </div>      
      </div>
    </div>
    
  );
};

export default EditAvailabilityPage;