import React from 'react';
import Visitors from '../charts/Visitors';
import Boys from '../charts/Boys';
import Girls from '../charts/Girls';
import Hostels from '../charts/Hostels';

function Summary() {
  return (
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
  );
}

export default Summary;
