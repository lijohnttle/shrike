import React from 'react';
import { Box, Card, CardHeader, CardContent } from '@material-ui/core';
import { GoodReadsBookListWidget } from '../../../widgets/GoodReadsBookListWidget';

const BooksSection = ({ userId }) => {
    return (
        <Card>
            <CardHeader title="Books" titleTypographyProps={{ variant: "h1" }} />
            <CardContent>
                <Box mb={4}>
                    <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
                </Box>
                <Box mb={4}>
                    <GoodReadsBookListWidget title="Recently Read" shelf="read" userId={userId} count={10} />
                </Box>
            </CardContent>
        </Card>
    );
};

export { BooksSection };