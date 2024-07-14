import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Navbar from '../components/features/Navbar';
import UploadFile from '../components/features/UploadFile';

function InputCard() {
    return (
        <>
            <Card>
                <CardHeader>
                    <Navbar/>
                </CardHeader>
                <CardContent>
                    <UploadFile/>
                </CardContent>
            </Card>
        </>
    );
}

export default InputCard;
