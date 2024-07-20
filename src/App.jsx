import "./App.css";  // Import the CSS file for styling the application
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Import Card components from the UI library
import Navbar from '@/components/features/Navbar'; // Import the Navbar component
import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes
import DataProvider from "./data/useData"; // Import the DataProvider component to manage global state

function App() {
  return (
    <DataProvider> {/* Wrap the application in DataProvider to provide context to all components */}
      <div>
        <Card> {/* Card component to encapsulate the content */}
          <CardHeader> {/* Header section of the Card */}
            <Navbar/> {/* Render the Navbar component */}
          </CardHeader>
          <CardContent> {/* Content section of the Card */}
            <div style={{marginInline: "10%"}}> {/* Apply inline styles to add margin on left and right */}
              <Outlet/> {/* Render the matched child route component */}
            </div>
          </CardContent>
        </Card>
      </div>
    </DataProvider>
  );
}

export default App; // Export the App component as default
