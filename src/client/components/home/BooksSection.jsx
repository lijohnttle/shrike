import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { SectionContainer } from './SectionContainer';
import { GoodReadsBookListWidget } from '../widgets/GoodReadsBookListWidget';

const BooksSection = ({ userId }) => {
    return (
        <SectionContainer>
            <a name="books">
                <Typography variant="h2" gutterBottom={true}>
                    Books
                </Typography>
            </a>

            <Box mb={2}>
                <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
            </Box>
            <Box mb={2}>
                <GoodReadsBookListWidget title="Read" shelf="read" userId={userId} count={20} />
            </Box>
        </SectionContainer>
    );
};

export { BooksSection };