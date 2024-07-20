import { convertTeamsData } from '@/data/dashboardData'
import { useData } from '@/data/useData'
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
import { ScrollArea } from '@radix-ui/react-scroll-area'

function UnallocatedTable() {
    const {allotment, setNotifications, notifications} = useData()
    const {boysData, girlsData} = convertTeamsData(allotment)

    useEffect(() => {
      if (allotment) {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          { title: "Rooms Allotted!", description: "Download from team tab!" }
        ]);
      }
      if (boysData.length > 0 || girlsData.length > 0) {
        setNotifications(prevNotifications => [
          ...prevNotifications,
          { title: "We're exceeding rooms capacity", description: "Check teams tab for unallocated members!" }
        ]);
      }
    }, [allotment, boysData, girlsData, setNotifications]);
    

  return (
    <div className="border-2 rounded-lg">
        <ScrollArea className='max-h-[50vh]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Group ID</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Members Unallocated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {boysData.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.groupID}</TableCell>
                <TableCell>Boy</TableCell>
                <TableCell className="text-right">{val.boys - val.allotted}</TableCell>
              </TableRow>
            ))}
            {girlsData.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.groupID}</TableCell>
                <TableCell>Girl</TableCell>
                <TableCell className="text-right">{parseInt(val.girls) - val.allotted}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </ScrollArea>
    </div>
  )
}

export default UnallocatedTable
