import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input';
import { ChevronRight, RotateCcw, Upload } from 'lucide-react';
import Papa from 'papaparse';
import { useData } from '@/data/useData';
import { formatTeamsData } from '@/data/fromatData';

const InputCard = () => {
  const { teams, hostels, setHostels, setTeams } = useData();

  const [hostelFile, setHostelFile] = useState(null);
  const [teamsFile, setTeamsFile] = useState(null);

  useEffect(() => {
    const localHostelFile = localStorage.getItem('hostelFile');
    const localTeamsFile = localStorage.getItem('teamsFile');

    if (localHostelFile) {
      setHostelFile(JSON.parse(localHostelFile));
    }
    if (localTeamsFile) {
      setTeamsFile(JSON.parse(localTeamsFile));
    }
  }, []);

  const handleFileUpload = (setter, name) => (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const fileData = { fileName: file.name, fileData: result.data };
        localStorage.setItem(name, JSON.stringify(fileData));
        setter(fileData);
      },
    });
  };

  const handleHostelFileUpload = handleFileUpload(setHostelFile, 'hostelFile');
  const handleTeamsFileUpload = handleFileUpload(setTeamsFile, 'teamsFile');

  const handleProceed = () => {
    if (hostelFile) {
      const data = hostelFile.fileData.slice(0, -1);
      setHostels(data);
    }
    if (teamsFile) {
      const data = teamsFile.fileData.slice(0, -1);
      setTeams(formatTeamsData(data));
    }
  };

  const handleReset = () => {
    setHostelFile(null);
    setTeamsFile(null);
    localStorage.removeItem('hostelFile');
    localStorage.removeItem('teamsFile');
  };
console.log(hostels)
  return (
    <Card className="w-fit mx-auto p-4 flex flex-col gap-4">
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Hostels Data</h2>
        {hostelFile ? (
          <div>{hostelFile.fileName}</div>
        ) : (
          <Input
            type="file"
            accept=".csv"
            className="w-full"
            onChange={handleHostelFileUpload}
          />
        )}
      </div>
      <div className="w-full p-4">
        <h2 className="text-lg font-semibold">Teams Data</h2>
        {teamsFile ? (
          <div>{teamsFile.fileName}</div>
        ) : (
          <Input
            type="file"
            accept=".csv"
            className="w-full"
            onChange={handleTeamsFileUpload}
          />
        )}
      </div>
      <div className="flex gap-1">
        <Button
          className="w-full gap-2"
          onClick={handleProceed}
          disabled={!hostelFile || !teamsFile}
        >
          {(hostelFile && teamsFile) ? (
            <>Proceed <ChevronRight /></>
          ) : (
            <>Upload Files To Proceed <Upload /></>
          )}
        </Button>
        {(hostelFile && teamsFile) && (
          <Button className="gap-2 w-full" onClick={handleReset}>
            Reset <RotateCcw />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default InputCard;
