import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import { GoodReadsBookListWidget } from '../widgets/GoodReadsBookListWidget';

const BooksSection = ({ userId }) => {
    return (
        <Container>
            <a name="books">
                <Typography variant="h1" gutterBottom={true}>
                    Books
                </Typography>
            </a>

            <Box mb={2}>
                <GoodReadsBookListWidget title="Currently Reading" userId={userId} shelf="currently-reading" count={20} />
            </Box>
            <Box mb={2}>
                <GoodReadsBookListWidget title="Read" shelf="read" userId={userId} count={20} />
            </Box>
        </Container>
    );
};

export { BooksSection };