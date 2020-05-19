import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Colors from './Colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        flex: '0 100%',
        boxSizing: 'border-box',
        borderLeft: `1px solid ${Colors.projectBorder}`,
        borderRight: `1px solid ${Colors.projectBorder}`,
        borderBottom: `1px solid ${Colors.projectBorder}`,
        background: Colors.projectBackgroundSelected,
    },
    description: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        minHeight: '128px',
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'flex-start',
        margin: theme.spacing(4),
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    titleText: {
        flex: '0 100%',
    },
    fullDescription: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(6),
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    },
    closeButton: {
        flexShrink: 0,
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

const ProjectDetails = ({ project }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.description}>
                <div className={classes.title}>
                    <Typography variant="h2" className={classes.titleText}>
                        {project.title}
                    </Typography>
                </div>

                <div className={classes.fullDescription}>
                    {project.description}
                </div>
            </div>
        </div>
    );
};

export { ProjectDetails };