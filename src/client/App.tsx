import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import GroupDetails from './pages/GroupDetails';
import GroupFormPage from './components/GroupForm';


import EditAvailabilityPage from './pages/EditAvailabilityPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/group-form' element={<GroupFormPage/>} />
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/groupdetail' element={<GroupDetails />} />
        <Route path='/my-availability' element={<EditAvailabilityPage />} />
      </Routes>
    </Router>
  );
};

export default App;
