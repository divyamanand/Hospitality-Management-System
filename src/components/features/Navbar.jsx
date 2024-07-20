import React, { useEffect, useState } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'; // UI components for navigation menu
import { BellIcon } from 'lucide-react'; // Icon for notifications
import { NavLink } from 'react-router-dom'; // React Router component for navigation
import { useData } from '@/data/useData'; // Custom hook for managing data state
import PopCard from './PopCard'; // Component for displaying a pop-up card
import Notifications from './Notification'; // Component for displaying notifications

function Navbar() {
  const { allotment } = useData(); // Destructure allotment from the custom hook
  const [open, setOpen] = useState(false); // State to manage pop-up visibility

  // Toggle the visibility of the notification pop-up
  useEffect(() => {
    setOpen(true); // Open the pop-up
    setTimeout(() => setOpen(false), 10000); // Automatically close the pop-up after 10 seconds
  }, [allotment]); // Dependency array includes allotment to trigger effect when allotment changes

  return (
    <div className="flex items-center justify-between py-4 px-6 lg:px-12">
      {/* Logo and link to home page */}
      <NavLink to="/">
        <h1 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
          HOSTEL
        </h1>
      </NavLink>
      
      {/* Navigation menu */}
      <NavigationMenu className="ml-auto">
        <NavigationMenuList className="flex gap-2">
          {allotment && (
            <>
              <NavigationMenuItem>
                <NavLink to="/hostels">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Hostels
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/rooms">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Rooms
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavLink to="/teams">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Teams
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            </>
          )}
          {/* Notification button with pop-up */}
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <PopCard
                trigger={<BellIcon />} // Trigger button with notification icon
                side="bottom"
                open={open} // Controlled by state to show/hide the pop-up
                content={<Notifications className="w-min" />} // Content of the pop-up
              />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
