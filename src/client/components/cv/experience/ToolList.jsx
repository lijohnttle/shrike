import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { Label } from '../common/Label';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: theme.spacing(1)
    }
}));

const ToolList = ({ tools }) => {
    const classes = useStyles();

    return (
        <Typography variant="body2" className={classes.root}>
            <b>Tools:</b><br />
            
            {tools.map((t, i) => <Label key={i} title={t} />)}
        </Typography>
    );
};

export { ToolList };