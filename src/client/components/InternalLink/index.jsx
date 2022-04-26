import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { SxProps, Theme } from '@mui/system';


/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {String} props.to
 * @param {SxProps<Theme>} props.sx
 */
export const InternalLink = (props) => {
    return (
        <Link
            to={props.to}
            component={RouterLink}
            sx={[
                {
                    textDecoration: 'none',
                    
                    '&:hover': {
                        textDecoration: 'none',
                    },
                },
                props.sx
            ]}>
            {props.children}
        </Link>
    );
};
