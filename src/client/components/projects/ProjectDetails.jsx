import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        flex: '0 100%',
        boxSizing: 'border-box',
        marginTop: theme.spacing(0.5),
        background: '#393939'
    },
    description: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        minHeight: '128px'
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'flex-start',
        margin: theme.spacing(2),
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    titleText: {
        flex: '0 100%'
    },
    fullDescription: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    closeButton: {
        flexShrink: 0,
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const ProjectDetails = ({ project, onClose }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.description}>
                <div className={classes.title}>
                    <Typography variant="h2" className={classes.titleText}>
                        {project.title}
                    </Typography>

                    <div className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </div>
                </div>

                <div className={classes.fullDescription}>
                    {project.description}
                </div>
            </div>
        </div>
    );
};

export { ProjectDetails };