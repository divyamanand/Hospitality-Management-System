import React, {useState, useEffect} from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import PopCard from './PopCard'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Input from '../ui/input'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

function GridComponent({ data }) {
    return (
      <Card className="w-full h-full overflow-hidden">
        <CardHeader className="p-5">
          <CardTitle className="text-lg md:text-xl lg:text-2xl">{data.room}</CardTitle>
          <CardDescription className="text-xs md:text-sm lg:text-md font-semibold">
            {`Capacity: ${data.capacity}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-1 flex justify-center">
          {(data.vacant/data.capacity)*100 > 0 ? (
            <Progress value={(data.vacant/data.capacity)*100} className="w-[80%]" />
          ) : (
            <Badge variant="destructive">Occupied</Badge>
          )}
        </CardContent>
        <CardFooter asChild className="py-1">
          <PopCard
            trigger={
              <Button variant="link" className="w-min h-min text-xs">
                View Details <ChevronDown />
              </Button>
            }
            side="bottom"
            content={
              <ScrollArea className="max-h-[20vh] overflow-y-auto min-h-min">
                {data.details.map((val, index) => (
                  <div key={index} className="flex gap-4 py-1">
                    <Badge>{val.members}</Badge>
                    <h4 className="font-semibold">{val.id}</h4>
                  </div>
                ))}
              </ScrollArea>
            }
          />
        </CardFooter>
      </Card>
    )
  }
  

function GridView({filteredHostels}) {

  const [listHostels, setListHostels] = useState(filteredHostels);
  const [current, setCurrent] = useState(1);
  const [length, setLength] = useState(12)
  const totalPages = Math.ceil(filteredHostels.length / length);

  useEffect(() => {
    const startIdx = (current - 1) * length;
    const endIdx = Math.min(startIdx + length, filteredHostels.length);
    setListHostels(filteredHostels.slice(startIdx, endIdx));
  }, [current, length, filteredHostels]);


  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listHostels.map((val, index) => (
        <GridComponent key={index} data={val} />
      ))}
    </div>
    <div className='flex items-center gap-3 justify-end my-3 mx-auto'>
        <h4>Max</h4>
        <Input className="w-10" value={length} onChange={(e) => setLength(Math.min(e.target.value,filteredHostels.length))}/>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9"
          onClick={() => setCurrent(current - 1)}
          disabled={current <= 1}
        >
          <ChevronLeft className='h-4 w-10' />
        </Button>
        <div className="text-xl font-semibold">{current}</div>
        <div className="text-md">{`/ ${totalPages}`}</div>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9"
          onClick={() => setCurrent(current + 1)}
          disabled={current === totalPages}
        >
          <ChevronRight className='h-4 w-10' />
        </Button>
      </div>
  </>
  )
}

export default GridView

