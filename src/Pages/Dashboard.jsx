import React from 'react';
import Visitors from '../components/charts/Visitors';
import Boys from '../components/charts/Boys';
import Girls from '../components/charts/Girls';
import Hostels from '../components/charts/Hostels';

function Dashboard() {
  return (
      <>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="col-span-1">
        <Visitors />
      </div>
      <div className="col-span-1">
        <Boys />
      </div>
      <div className="col-span-1">
        <Girls />
      </div>
      <div className="col-span-1 sm:col-span-3">
        <Hostels />
      </div>
    </div>
      </>
  );
}

export default Dashboard
