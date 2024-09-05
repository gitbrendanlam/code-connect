import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import EditAvailabilityPage from './pages/EditAvailabilityPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/my-availability' element={<EditAvailabilityPage />} />
      </Routes>
    </Router>
  );
};

export default App;
