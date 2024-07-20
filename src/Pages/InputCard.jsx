import React, { useCallback, useEffect, useState } from 'react';
import { Card } from '../components/ui/card'; // UI component for card layout
import { Button } from '@/components/ui/button'; // UI component for button
import Input from '@/components/ui/input'; // UI component for file input
import { CheckCircleIcon, ChevronRight, RotateCcw, Upload } from 'lucide-react'; // Icons for UI
import Papa from 'papaparse'; // Library for parsing CSV files
import { useData } from '@/data/useData'; // Custom hook for managing data state
import { formatHostelsData, formatTeamsData } from '@/data/fromatData'; // Functions for formatting data
import { allotRooms } from '@/data/allotmentAlgo'; // Function for allotting rooms

const InputCard = () => {
  // Extract necessary states and setter functions from the custom hook
  const { teams, hostels, setHostels, setTeams, allotment, setAllotment } = useData();
  const [hostelFile, setHostelFile] = useState(null); // State for storing hostel file data
  const [teamsFile, setTeamsFile] = useState(null); // State for storing teams file data

  useEffect(() => {
    // Retrieve previously uploaded files from localStorage when component mounts
    const localHostelFile = localStorage.getItem('hostelFile');
    const localTeamsFile = localStorage.getItem('teamsFile');

    if (localHostelFile) {
      setHostelFile(JSON.parse(localHostelFile));
    }
    if (localTeamsFile) {
      setTeamsFile(JSON.parse(localTeamsFile));
    }
  }, []);

  // Function to handle file uploads, parse CSV, and store data in localStorage
  const handleFileUpload = (setter, name) => (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const fileData = { fileName: file.name, fileData: result.data };
        localStorage.setItem(name, JSON.stringify(fileData)); // Save file data to localStorage
        setter(fileData); // Update state with the parsed file data
      },
    });
  };

  // Specific handlers for uploading hostel and teams files
  const handleHostelFileUpload = handleFileUpload(setHostelFile, 'hostelFile');
  const handleTeamsFileUpload = handleFileUpload(setTeamsFile, 'teamsFile');

  useEffect(() => {
    // Format and set data when files are uploaded and state is updated
    if (hostelFile && !hostels) {
      const data = hostelFile.fileData.slice(0, -1); // Exclude last row if needed
      setHostels(formatHostelsData(data)); // Format and set hostel data
    }
    if (teamsFile && !teams) {
      const data = teamsFile.fileData.slice(0, -1); // Exclude last row if needed
      setTeams(formatTeamsData(data)); // Format and set teams data
    }
  }, [teamsFile, hostelFile, setHostels, setTeams]);

  // Function to handle room allotment based on uploaded data
  const handleProceed = useCallback(() => {
    try {
      if (teams && hostels && !allotment) {
        // Perform room allotment for boys and girls groups
        const boysAllottment = allotRooms(teams.boysGroups, hostels.boysHostels, "Boys");
        const girlsAllottment = allotRooms(teams.girlsGroups, hostels.girlsHostels, "Girls");

        const newAllotment = { boysAllottment, girlsAllottment };
        setAllotment(newAllotment); // Update allotment state
        localStorage.setItem('allotment', JSON.stringify(newAllotment)); // Save allotment to localStorage
      }
    } catch (err) {
      console.log("SOME ERROR OCCURRED! CHECK YOUR DATA", err); // Log error if any occurs
    } finally {
      console.log("DONE"); // Log completion
    }
  }, [teams, hostels, allotment, setAllotment]);

  // Function to reset all states and clear localStorage
  const handleReset = () => {
    setHostelFile(null);
    setTeamsFile(null);
    setAllotment(null);
    setTeams(null);
    setHostels(null);
    localStorage.removeItem('hostelFile');
    localStorage.removeItem('teamsFile');
    localStorage.removeItem('allotment');
  };

  return (
    <Card className="w-fit mx-auto p-4 flex flex-col gap-4">
      {/* Card layout for UI */}
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Hostels Data</h2>
        {hostelFile ? (
          <div>{hostelFile.fileName}</div> // Show file name if uploaded
        ) : (
          <Input
            type="file"
            accept=".csv"
            className="w-full"
            onChange={handleHostelFileUpload} // Handle file upload
          />
        )}
      </div>
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Teams Data</h2>
        {teamsFile ? (
          <div>{teamsFile.fileName}</div> // Show file name if uploaded
        ) : (
          <Input
            type="file"
            accept=".csv"
            className="w-full"
            onChange={handleTeamsFileUpload} // Handle file upload
          />
        )}
      </div>
      <div className="flex gap-1">
        <Button
          className="w-full gap-2"
          onClick={handleProceed}
          disabled={!hostelFile || !teamsFile || allotment} // Disable if files are not uploaded or allotment exists
        >
          {hostelFile && teamsFile ? (
            allotment ? <>Allotted <CheckCircleIcon /></> : <>Proceed <ChevronRight /></>
          ) : (
            <>Upload Files To Proceed <Upload /></>
          )}
        </Button>
        {hostelFile && teamsFile && (
          <Button className="gap-2 w-full" onClick={handleReset}>
            Reset <RotateCcw />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default InputCard;
