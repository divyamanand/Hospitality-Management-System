import React from 'react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { BellIcon, SearchIcon } from 'lucide-react';

function Navbar() {
  return (
    <div className="flex items-center justify-between py-4 px-6 lg:px-12">
      <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
        HOSTEL
      </h1>
      <NavigationMenu className="ml-auto">
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Manage Hostel
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <SearchIcon />
            </NavigationMenuLink>
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
