import React from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { BellIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="flex items-center justify-between py-4 px-6 lg:px-12">
      <NavLink
      to="">
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
        HOSTEL
      </h1>
      </NavLink>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList className="flex gap-2">
          <NavigationMenuItem>
            <NavLink
            to="/dashboard">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
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
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <BellIcon />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
