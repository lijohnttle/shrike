import React from 'react';
import { makeStyles, Icon, Typography } from '@material-ui/core';
import HttpsIcon from '@material-ui/icons/Https';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Colors from './Colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        marginTop: theme.spacing(1),
        cursor: 'pointer',
        border: `1px solid ${Colors.projectBorder}`,
        background: Colors.projectBackground,

        '&:hover': {
            background: Colors.projectBackgroundHover,
        },

        '&$selected:hover': {
            background: Colors.projectBackgroundSelected,
        }
    },
    selected: {
        background: Colors.projectBackgroundSelected,
    },
    description: {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: 1,
        minHeight: '128px',
    },
    chevron: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 0,
        margin: theme.spacing(1),
    },
    title: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'flex-start',
        margin: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    titleText: {
        textTransform: 'uppercase',
    },
    shortDescription: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(4),
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
}));

const Project = ({ project, isSelected, onSelect, onUnselect }) => {
    const classes = useStyles();

    return (
        <div
            className={`${classes.root} ${isSelected ? classes.selected : ''}`}
            onClick={() => isSelected ? onUnselect() : onSelect(project)}>

            <div className={classes.description}>
                <div className={classes.title}>
                    <Typography variant="h3" className={classes.titleText}>
                        {project.title}
                    </Typography>
                </div>

                <div className={classes.shortDescription}>
                    {project.shortDescription}
                </div>
            </div>

            <div className={classes.chevron}>
                {isSelected ? <KeyboardArrowDownIcon /> : <ChevronRightIcon /> }
            </div>
        </div>
    )
};

export { Project };