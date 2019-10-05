import React from 'react';
import { Box, Paper, Container } from '@material-ui/core';
import { Fade } from 'react-reveal';

const Sectioncontainer = ({ children }) => {
    return (
        <Box mb={4}>
            <Fade>
                <Container>
                    <Paper>
                        <Box px={2} py={4}>
                            {children}
                        </Box>
                    </Paper>
                </Container>
            </Fade>
        </Box>
    );
};

export { Sectioncontainer };