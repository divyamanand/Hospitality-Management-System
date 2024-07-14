import React from 'react';
import Summary from '@/components/features/Summary';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Navbar from '@/components/features/Navbar';


function Dashboard() {
  return (
      <>
          <Card>
              <CardHeader>
                  <Navbar/>
              </CardHeader>
              <CardContent>
                  <Summary/>
              </CardContent>
          </Card>
      </>
  );
}

export default Dashboard
