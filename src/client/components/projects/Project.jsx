import React from 'react';
import { makeStyles } from '@material-ui/core';
import HttpsIcon from '@material-ui/icons/Https';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        marginTop: theme.spacing(4),
        cursor: 'pointer',

        [theme.breakpoints.up('lg')]: {
            flex: '0 50%',
            boxSizing: 'border-box'
        }
    },
    evenRoot: {
        [theme.breakpoints.up('lg')]: {
            paddingRight: '24px'
        }
    },
    oddRoot: {
        [theme.breakpoints.up('lg')]: {
            paddingLeft: '24px'
        }
    },
    selected: {
        
    },
    picture: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: '0',
        width: '128px',
        height: '128px',
        marginRight: '24px',
        background: '#1f1f1f',
        fontSize: '64px',

        [theme.breakpoints.down('sm')]: {
            width: '64px',
            height: '64px',
            fontSize: '48px'
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
        
        '$selected &': {
            background: '#393939'
        }
    },
    internalPicture: {
        display: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: '0',
        width: '34px',
        height: '34px',
        marginRight: '16px',
        background: '#1f1f1f',
        border: 'solid 1px #313131',
        fontSize: '24px',

        [theme.breakpoints.down('xs')]: {
            display: 'flex'
        },
        
        '$selected &': {
            background: '#393939'
        }
    },
    description: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        minHeight: '128px',
        background: '#1f1f1f',
        
        '$selected &': {
            background: '#393939'
        }
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'flex-start',
        margin: theme.spacing(2),
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    shortDescription: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(2),
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }
}));

const Project = ({ project, even, isSelected, onSelect, onUnselect }) => {
    const classes = useStyles();

    return (
        <div
            className={`${classes.root} ${even ? classes.evenRoot : classes.oddRoot} ${isSelected ? classes.selected : ''}`}
            onClick={() => isSelected ? onUnselect() : onSelect(project)}>
            <div className={classes.picture}>
                <HttpsIcon fontSize="inherit" style={{ opacity: 0.1 }} />
            </div>

            <div className={classes.description}>
                <div className={classes.title}>
                    <span className={classes.internalPicture}>
                        <HttpsIcon fontSize="inherit" style={{ opacity: 0.1 }} />
                    </span>
                    {project.title}
                </div>

                <div className={classes.shortDescription}>
                    {project.shortDescription}
                </div>
            </div>
        </div>
    )
};

export { Project };