import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { BookList } from '../../../components/BookList';
import { graphqlRequest } from '../../../services/api';
import { SectionWrapper } from '../SectionWrapper';


const BooksLibrarySection = ({ screenHeight, showScrollToNextSection }) => {
    const [goodReadsUserId, setGoodReadsUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
    }, []);

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={showScrollToNextSection}>
            <SectionContentWrapper title="Book Library" isLoading={isLoading}>
                <Box marginBottom={8}>
                    <BookList count={7} shelf="currently-reading" />
                </Box>

                <Box marginBottom={8}>
                    <BookList count={7} shelf="read" />
                </Box>

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
