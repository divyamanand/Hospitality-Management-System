import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { PopoverArrow } from '@radix-ui/react-popover'
  
function PopCard({trigger, content, side="left"}) {
  return (
    <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent side={side} className="w-max">
            <PopoverArrow className='w-3 h-2 fill-white shadow-lg'/>
            {content}</PopoverContent>
    </Popover>

  )
}

export default PopCard
