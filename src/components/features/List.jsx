import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import SearchItem from './SearchItem'

function List() {
  const hostelsList = [
    "Vivekananda",
    "Vashishtha",
    "Panini A",
    "Panini B",
    "Saraswati",
    "Nagarjuna",
    "Vivekananda",
    "Vashishtha",
    "Panini A",
    "Panini B",
    "Saraswati",
    "Nagarjuna Girls Hostel","Vivekananda",
    "Vashishtha",
    "Panini A",
    "Panini B",
    "Saraswati",
    "Nagarjuna",
    "Vivekananda",
    "Vashishtha",
    "Panini A",
    "Panini B",
    "Saraswati",
    "Nagarjuna Girls Hostel",
  ]

  return (
    <>
    <ScrollArea className="h-screen rounded-md">
    <SearchItem message='Search'/>
      <ToggleGroup type="single" className="flex-col">
        {hostelsList.map((hostel, index) => (
          <ToggleGroupItem key={index} value={hostel}>
            <h2>{hostel}</h2>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ScrollArea>
  </>
  )
}

export default List
