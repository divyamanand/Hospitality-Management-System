import React from 'react'
import HostelsTable from '@/components/tables/HostelsTable';
import { useData } from '@/data/useData';

const ManageHostels = () => {
  const {allotment} = useData()
  console.log(allotment)
  return (
    <>
      
    <HostelsTable/>
    </>
  )
}

export default ManageHostels
