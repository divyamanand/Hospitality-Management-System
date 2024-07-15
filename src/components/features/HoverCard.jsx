import React from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { HoverCardArrow } from '@radix-ui/react-hover-card'
  
function Hover({trigger,content}) {
  return (
    <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger>{trigger}</HoverCardTrigger>
        <HoverCardContent  side={"left"}>
        <HoverCardArrow 
        style={{fill: "white", height: "10", width: "12"}}/>
            {content}
        </HoverCardContent>
    </HoverCard>

  )
}

export default Hover
