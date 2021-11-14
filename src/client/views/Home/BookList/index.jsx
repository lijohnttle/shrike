import React from 'react';
import { Link } from '@mui/material';
import { useStyles } from './styles';


const BookList = ({ books }) => {
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


export {
    BookList
};
