import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Spring, config } from 'react-spring/renderprops';

const useStyles = makeStyles(theme => ({
    root: {
        display: props => props.isExpanded ? 'block' : 'none',
        paddingTop: theme.spacing(2)
    }
}));

const ExpanderContent = ({ isExpanded, children }) => {
    const classes = useStyles({ isExpanded });
    
    return (
        <div config={config.wobbly} className={classes.root}>
            <Spring to={{ opacity: isExpanded ? 1 : 0 }} >
                {({ opacity }) => <div style={{ opacity }}>{children}</div>}
            </Spring>
        </div>
    );
}

export { ExpanderContent };