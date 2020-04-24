import React from 'react';
import { makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        cursor: 'pointer',

        '&>*:nth-child(1)': {
            flex: '1 100%'
        },
        '&>*:nth-child(2)': {
            flexShrink: '0'
        }
    }
}));

const ExpanderHeader = ({ isExpanded, toggle, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root} onClick={toggle}>
            <div>
                {children}
            </div>

            {isExpanded ? <ExpandMoreIcon fontSize="large" /> : <ChevronRightIcon fontSize="large" />}
        </div>
    )
};

export { ExpanderHeader };