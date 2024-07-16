import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Input from '../ui/input';

function UploadSection({ title, id }) {
  return (
    <div className="w-full p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Input
          id={id}
          type="file"
          accept=".csv"
          className="w-full"
        />
    </div>
  );
}

function UploadFile() {
  return (
    <Card className="w-fit mx-auto p-4 flex flex-col gap-4">
      <UploadSection
        title="Upload Hostel Data"
        id="hostel-data"
      />
      <UploadSection
        title="Upload Students Data"
        id="students-data"
      />
      <Button className="w-full">
        Proceed
      </Button>
    </Card>
  );
}

export default UploadFile;
