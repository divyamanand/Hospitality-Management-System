import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Input from '../ui/input';

function UploadSection({ title, message, id }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
      <CardHeader className="pb-3 sm:w-1/2">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {message}
        </CardDescription>
      </CardHeader>
      <CardFooter className="sm:mt-0 mt-4">
        <Input id={id} type="file" placeholder="" accept=".csv" className="mt-auto"/>
      </CardFooter>
    </div>
  );
}

function UploadFile() {
  return (
    <Card className="sm:col-span-2 flex flex-col sm:flex-row justify-center items-center mx-auto">
      <UploadSection
        title="Upload Hostel Data"
        message="Upload only in CSV format"
        id="hostel-data"
      />
      <UploadSection
        title="Upload Students Data"
        message="Upload only in CSV format"
        id="students-data"
      />
      <Button className="my-4 sm:ml-4">Proceed</Button>
    </Card>
  );
}

export default UploadFile;
