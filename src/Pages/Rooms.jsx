import React, { useState } from 'react'
import List from "../components/features/List"
import RoomsTable from '@/components/tables/RoomsTable'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

function Rooms() {
    
  return (
    <>
      <ResizablePanelGroup
      direction="horizontal"
      className="gap-6"
    >
      <ResizablePanel defaultSize={20}>
        <List/>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <RoomsTable/>
      </ResizablePanel>
    </ResizablePanelGroup>
    </>
  )
}

export default Rooms
