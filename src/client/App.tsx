import React from 'react';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  return (
    // <div style={{ textAlign: 'center', padding: '50px' }}>
    <div className="flex justify-between h-screen">
      <h1>Welcome to My React App</h1>
      <div className="w-3/4">
        <Calendar/>
      </div>      
    </div>
  );
};

export default App;