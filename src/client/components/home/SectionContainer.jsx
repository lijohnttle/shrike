import React from 'react';
import { Container, Box } from '@material-ui/core';

const SectionContainer = ({ children }) => {
    return (
        <Box mb={2}>
            <Container>
                {children}
            </Container>
        </Box>
    );
};

export { SectionContainer };