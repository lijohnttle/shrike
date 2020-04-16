import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, makeStyles, Typography } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(() => ({
    linkIcon: {
        position: 'relative',
        top: '0.125em',
        left: '0.2em',
        opacity: 0.1,
        'a:hover &': {
            opacity: 0.5
        }
    }
}));

const ArticleTitle = ({ title, to }) => {
    const classses = useStyles();

    return (
        <Typography variant="h1">
            <Link component={RouterLink} to={to} style={{ color: 'inherit' }}>
                {title}
                <LinkIcon fontSize="inherit" className={classses.linkIcon} />
            </Link>
        </Typography>
    );
};

export { ArticleTitle };