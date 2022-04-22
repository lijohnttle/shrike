import React from 'react';
import { Box } from '@mui/system';
import colors from '../../../themes/colors';

export const RightContent = ({ children }) => (
    <Box
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        alignSelf="stretch"
        sx={{
            width: {
                xs: '100%',
                md: '50%',
            },
            marginLeft: {
                xs: 0,
                md: 4,
            },
            marginTop: {
                xs: 8,
                md: 0,
            },
            background: {
                xs: 'none',
                md: colors.background,
            },
            color: {
                xs: colors.textComplementary,
                md: colors.text,
            },
            boxShadow: {
                xs: 'none',
                md: `14px 14px 0px 0px ${colors.brand}`,
            },
        }}>

        {children}
    </Box>
);