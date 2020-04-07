import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { GoodReadsBookListWidget } from '../../../widgets/GoodReadsBookListWidget';

const BooksSection = ({ userId }) => {
    return (
        <Box p={6}>
            <Box pb={2}>
                <Typography variant="h1">
                    Books
                </Typography>
            </Box>
            <Box mb={4}>
                <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
            </Box>
            <Box mb={4}>
                <GoodReadsBookListWidget title="Recently Read" shelf="read" userId={userId} count={10} />
            </Box>
        </Box>
    );
};

export { BooksSection };