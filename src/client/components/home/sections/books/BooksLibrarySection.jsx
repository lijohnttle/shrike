import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LibraryBooks as LibraryBooksIcon } from '@mui/icons-material';
import SectionContentContainer from '../SectionContentContainer';
import BookList from './BookList';
import { loadBooks } from '../../../../services/goodReadsService';
import { queryData } from '../../../../services/api';


const useStyles = makeStyles(theme => ({
    root: ({ screenHeight }) => ({
        background: 'white',
        color: 'black',
        justifyContent: 'center',
        minHeight: `${screenHeight}px`,
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),

        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(4)
        }
    }),
    booksContainer: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '160px',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(8),
    },
}));

const BooksLibrarySection = ({ screenHeight }) => {
    const [goodReadsUserId, setGoodReadsUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooksLoading, setIsBooksLoading] = useState(true);
    const [isReadBooksLoading, setIsReadBooksLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);

    useEffect(() => {
        queryData(`
                query {
                    userProfile {
                        success
                        userProfile {
                            goodReadsUserId
                        }
                        errorMessage
                    }
                }
            `)
            .then((response) => {
                const data = response.userProfile;

                if (!data.success) {
                    throw new Error(data.errorMessage);
                }

                setGoodReadsUserId(data.userProfile.goodReadsUserId);
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));

        loadBooks(7, 'currently-reading')
            .then(data => {
                setBooks(data);
            })
            .catch(error => {
                console.log(error);
                setBooks([]);
            })
            .finally(() => setIsBooksLoading(false));

        loadBooks(7, 'read')
            .then(data => {
                setReadBooks(data);
            })
            .catch(error => {
                console.log(error);
                setReadBooks([]);
            })
            .finally(() => setIsReadBooksLoading(false));
    }, []);

    const classes = useStyles({ screenHeight });

    const shelvesContent = (
        <React.Fragment>
            <Box mb={2}>
                <Typography variant="h4" align="center">
                    Shelf "Currently Reading"
                </Typography>
            </Box>

            <div className={classes.booksContainer}>
                {isBooksLoading
                    ? <CircularProgress />
                    : <BookList books={books} />}
            </div>

            <Box mb={2}>
                <Typography variant="h4" align="center">
                    Shelf "Read"
                </Typography>
            </Box>

            <div className={classes.booksContainer}>
                {isReadBooksLoading
                    ? <CircularProgress />
                    : <BookList books={readBooks} />}
            </div>

            <Box alignSelf="center" mt={4}>
                <Button
                    variant="contained"
                    color="primary"
                    href={`https://www.goodreads.com/review/list/${goodReadsUserId}?shelf=ALL`}
                    target="blank"
                    startIcon={<LibraryBooksIcon />}>
                    See all books
                </Button>
            </Box>
        </React.Fragment>
    );

    return (
        <SectionContentContainer rootClassName={classes.root}>
            <Box mb={4}>
                <Typography variant="h1" align="center">
                    Book Library
                </Typography>
            </Box>

            {isLoading ? <CircularProgress /> : shelvesContent}
        </SectionContentContainer>
    );
};

export default BooksLibrarySection;