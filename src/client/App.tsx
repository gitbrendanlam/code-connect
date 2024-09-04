import React from 'react';
import Calendar from './components/calendar';

const App: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to My React App</h1>
      <p>This is a simple React application using TypeScript.</p>
      <button onClick={() => alert('Hello, world!')}>Click Me!</button>
      <Calendar/>
    </div>
  );
};

export default App;