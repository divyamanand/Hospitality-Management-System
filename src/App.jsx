import "./App.css";  // Import the CSS file
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Navbar from '@/components/features/Navbar';
import { Outlet } from "react-router-dom";
import DataProvider from "./data/useData";

function App() {
  return (
    <DataProvider>
    <div>
      <Card>
              <CardHeader>
                  <Navbar/>
              </CardHeader>
              <CardContent >
              <div style={{marginInline: "10%"}}>
                <Outlet/>
              </div>
              </CardContent>
        </Card>
    </div>
    </DataProvider>
  );
}

export default App;
