import React from 'react';
import { CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';


const renderTitle = (title) => (
    <Box paddingBottom={6}>
        <Typography variant="h1" fontWeight="bold" align="center">
            {title?.toUpperCase()}
        </Typography>
    </Box>
);

const renderLoader = () => (
    <Box alignSelf="center">
        <CircularProgress />
    </Box>
);

const SectionContentWrapper = ({
    children,
    contentRootStyles,
    title,
    isLoading,
    maxWidth }) => {

    return (
        <Container maxWidth={maxWidth || 'lg'} style={{ display: 'flex', flex: '1' }}>
            <Box
                display="flex"
                flexDirection="column"
                flex="1"
                justifyContent="center"
                sx={[{
                    paddingTop: {
                        xs: 8,
                        sm: 12,
                    },
                    paddingBottom: {
                        xs: 4,
                        sm: 8,
                    },
                    paddingLeft: {
                        xs: 1,
                        sm: 0,
                    },
                    paddingRight: {
                        xs: 1,
                        sm: 0,
                    },
                }, contentRootStyles]}>
                <Box flex="1 1 auto" />

                {title ? renderTitle(title) : null}

                {isLoading ? renderLoader() : children}

                <Box flex="1 1 auto" />
            </Box>
        </Container>
    );
};


export {
    SectionContentWrapper
};
