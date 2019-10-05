import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { GoodReadsBookListWidget } from '../widgets/GoodReadsBookListWidget';

const BooksSection = ({ userId }) => {
    return (
        <React.Fragment>
            <Typography variant="h1" gutterBottom={true}>
                Books
            </Typography>

            <Box mb={4}>
                <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
            </Box>
            <Box mb={4}>
                <GoodReadsBookListWidget title="Recently Read" shelf="read" userId={userId} count={10} />
            </Box>
        </React.Fragment>
    );
};

export { BooksSection };