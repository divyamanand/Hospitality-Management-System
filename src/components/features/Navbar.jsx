import React, { useEffect, useState } from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { BellIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useData } from '@/data/useData';
import PopCard from './PopCard';
import Notifications from './Notification';
import { convertTeamsData } from '@/data/dashboardData';

function Navbar() {
  const {allotment} = useData()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(true)
    setTimeout(() => setTimeout(false), 10000)
  }, allotment)

  return (
    <div className="flex items-center justify-between py-4 px-6 lg:px-12">
      <NavLink
      to="">
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
        HOSTEL
      </h1>
      </NavLink>
      <NavigationMenu className="ml-auto" >
        <NavigationMenuList className="flex gap-2">
          {allotment &&
          <>
        <NavigationMenuItem>
        <NavLink
          to="/hostels">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Hostels
          </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <NavLink
          to="/rooms">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Rooms
          </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <NavLink
          to="/teams">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Teams
          </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
        </>}
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <PopCard
              trigger={<BellIcon/>}
              side="bottom"
              open={open}
              content = {<Notifications className="w-min"/>}
              />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
