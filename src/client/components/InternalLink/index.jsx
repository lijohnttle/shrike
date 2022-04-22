import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';


export const InternalLink = ({ to, children }) => {
    return (
        <Link
            to={to}
            component={RouterLink}
            sx={{
                textDecoration: 'none',
                
                '&:hover': {
                    textDecoration: 'none',
                },
            }}>
            {children}
        </Link>
    );
};
