import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SectionContentContainer from '../SectionContentContainer';
import BookList from './BookList';
import { loadBooks } from '../../../../services/goodReadsService';

const useStyles = makeStyles(theme => ({
    root: ({ screenHeight }) => ({
        background: 'brown',
        color: 'white',
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        }
    }),
    currentBooksContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '160px',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
    },
}));

const BooksLibrarySection = ({ goodreadsData, screenHeight }) => {
    const [isBooksLoading, setIsBooksLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        loadBooks(10, 'currently-reading')
            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
                setBooks([]);
            })
            .finally(() => setIsBooksLoading(false));
    }, []);

    const classes = useStyles({ screenHeight });

    return (
        <SectionContentContainer rootClassName={classes.root}>
            <Box mb={4}>
                <Typography variant="h1" align="center">
                    Book Library
                </Typography>
            </Box>

            <Box mb={2}>
                <Typography variant="h4" align="center">
                    Shelf "Currently Reading"
                </Typography>
            </Box>

            <div className={classes.currentBooksContainer}>
                {isBooksLoading
                    ? <CircularProgress />
                    : <BookList books={books} />}
            </div>

            <Box alignSelf="center" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    href={`https://www.goodreads.com/review/list/${goodreadsData.userId}?shelf=ALL`}
                    target="blank"
                    startIcon={<LibraryBooksIcon />}>
                    See all books
                </Button>
            </Box>
        </SectionContentContainer>
    );
};

export default BooksLibrarySection;