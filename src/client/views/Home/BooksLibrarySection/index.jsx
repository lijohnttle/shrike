import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { BookList } from '../BookList';
import { loadBooks } from '../../../services/goodReadsService';
import { graphqlRequest } from '../../../services/api';
import { SectionWrapper } from '../SectionWrapper';
import { styled } from '@mui/system';


const BooksContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '160px',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(8),
}));

const BooksLibrarySection = ({ screenHeight, showScrollToNextSection }) => {
    const [goodReadsUserId, setGoodReadsUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooksLoading, setIsBooksLoading] = useState(true);
    const [isReadBooksLoading, setIsReadBooksLoading] = useState(true);
    const [books, setBooks] = useState([]);
    const [readBooks, setReadBooks] = useState([]);

    useEffect(() => {
        graphqlRequest(`
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

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={showScrollToNextSection}>
            <SectionContentWrapper title="Book Library" isLoading={isLoading}>
                <Box mb={2}>
                    <Typography variant="h4" align="center">
                        Shelf "Currently Reading"
                    </Typography>
                </Box>

                <BooksContainer>
                    {isBooksLoading
                        ? <CircularProgress />
                        : <BookList books={books} />}
                </BooksContainer>

                <Box mb={2}>
                    <Typography variant="h4" align="center">
                        Shelf "Read"
                    </Typography>
                </Box>

                <BooksContainer>
                    {isReadBooksLoading
                        ? <CircularProgress />
                        : <BookList books={readBooks} />}
                </BooksContainer>

                <Button
                    variant="outlined"
                    href={`https://www.goodreads.com/review/list/${goodReadsUserId}?shelf=ALL`}
                    endIcon={<AddIcon />}
                    color="brand"
                    target="_blank"
                    sx={{
                        fontSize: '1.2rem',
                        alignSelf: 'center',
                        marginLeft: {
                            xs: 0,
                            sm: 'auto',
                        },
                        marginRight: {
                            xs: 0,
                            sm: 'auto',
                        },
                        paddingLeft: 4,
                        paddingRight: 4,
                        paddingTop: 1,
                        paddingBottom: 1,
                    }}>
                    SEE MORE
                </Button>
            </SectionContentWrapper>
        </SectionWrapper>
    );
};

export {
    BooksLibrarySection
};
