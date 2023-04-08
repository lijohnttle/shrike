import { Typography } from '@mui/material';
import React from 'react';
import { styled } from '@mui/system';


const SectionHeaderWrapper = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(4)
}));

const SectionHeader = ({ text }) => {
    return (
        <SectionHeaderWrapper>
            <Typography variant="h2" gutterBottom>
                {text}
            </Typography>
        </SectionHeaderWrapper>
    );
};


export {
    SectionHeader
};
