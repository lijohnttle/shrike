import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    bookContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '98px',
        height: '160px',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    bookLink: {
        display: 'block',
        overflow: 'hidden',

        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        }
    }
}));

export default ({ books }) => {
    const classes = useStyles();

    if (!books) {
        return <React.Fragment></React.Fragment>
    }

    return (
        <React.Fragment>
            {books.map(book => (
                <div key={book.link} className={classes.bookContainer}>
                    <Link className={classes.bookLink} href={book.link} target="black" title={book.title} rel="external">
                        <img alt={book.title} border={0} src={book.cover}></img>
                    </Link>
                </div>
            ))}
        </React.Fragment>
    );
}; 