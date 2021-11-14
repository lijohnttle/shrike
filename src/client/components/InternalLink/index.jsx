import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useStyles } from './styles';


const InternalLink = ({ to, children, withoutUnderline }) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${withoutUnderline ? classes.withoutUnderline : ''}`}>
            <Link to={to} component={RouterLink}>
                {children}
            </Link>
        </div>
    );
};


export {
    InternalLink
};
