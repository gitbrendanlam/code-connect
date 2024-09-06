import React from 'react';
import Layout from '../components/Layout';
import List from '../components/List';

const Dashboard = () => {
  return (
    <Layout>
      <div className='grid grid-cols-2 divide-x p-5'>
        <div className='pt-1'>PLACE HOLDER FOR MINI CALENDAR</div>
        <div className='pt-1'>
          <List />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
