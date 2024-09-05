import React, {useState} from 'react';
import AvailabilityList from '../components/AvailabilityList';
import Calendar from '../components/Calendar';
import AddAvailabilityForm from './../components/AddAvailbilityForm';
import Navbar from '../components/Navbar';

const EditAvailabilityPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    <div className='overflow-y-none'>
      <Navbar/>
      <div className="flex justify-between h-screen">
        <AvailabilityList/>
        <div className="w-2/3">
          <Calendar type={'personal'} open={open} setOpen={setOpen}/>
          {open && <AddAvailabilityForm open={open} setOpen={setOpen}/>}
        </div>      
      </div>
    </div>
    
  );
};

export default EditAvailabilityPage;