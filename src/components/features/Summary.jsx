import React from 'react';
import Visitors from '../charts/Visitors';
import Hostels from '../charts/Hostels';
import Boys from '../charts/Boys';
import Girls from '../charts/Girls';

function Summary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="col-span-1 row-span-1">
        <Visitors />
      </div>
      <div className="col-span-1 row-span-1">
        <Boys />
      </div>
      <div className="col-span-1 row-span-1">
        <Hostels />
      </div>
      <div className="col-span-1 row-span-1">
        <Girls />
      </div>
    </div>
  );
}

export default Summary;
