import "./App.css";  // Import the CSS file
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Navbar from '@/components/features/Navbar';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Card>
              <CardHeader>
                  <Navbar/>
              </CardHeader>
              <CardContent>
                <Outlet/>
              </CardContent>
        </Card>
    </div>
  );
}

export default App;
