import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useIsCancelled } from '../../hooks';
import { graphqlRequest } from '../../services/api';


export function BookLibraryButton() {
    const [goodReadsUserId, setGoodReadsUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isCancelled = useIsCancelled();

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
                if (!isCancelled.current) {
                    const data = response.userProfile;

                    if (!data.success) {
                        throw new Error(data.errorMessage);
                    }
    
                    setGoodReadsUserId(data.userProfile.goodReadsUserId);
                }
            })
            .catch(error => {
                if (!isCancelled.current) {
                    console.error(error);
                }
            })
            .finally(() => {
                if (!isCancelled.current) {
                    setIsLoading(false);
                }
            });
    }, []);
    
    return (
        <Box
            display="flex"
            flexDirection="column"
            sx={{
                alignItems: {
                    xs: 'stretch',
                    sm: 'center',
                },
            }}>
            <Button
                variant="outlined"
                href={`https://www.goodreads.com/review/list/${goodReadsUserId}?shelf=ALL`}
                endIcon={<AddIcon />}
                color="brand"
                target="_blank"
                disabled={isLoading}
                sx={{
                    fontSize: '1.2rem',
                    paddingLeft: 4,
                    paddingRight: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                }}>
                SEE MORE
            </Button>
        </Box>
    );
}
