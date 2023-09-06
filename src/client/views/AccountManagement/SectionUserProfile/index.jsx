import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { graphqlRequest } from "../../../services/api.js";
import { useUserSession } from '../../../hooks';
import { SectionHeader } from '../SectionHeader/index.jsx';
import { styled } from '@mui/system';


async function loadUserProfile() {
    try {
        const response = await graphqlRequest(`
            query {
                userProfile {
                    success
                    userProfile {
                        goodReadsUserId
                    }
                    errorMessage
                }
            }
        `);

        const data = response.userProfile;

        if (data.success) {
            return data.userProfile;
        }
        else {
            throw new Error(data.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));

const FieldContainerStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));

const CommandContainerStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'end',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'stretch',
    },
}));

export function SectionUserProfile() {
    const [getUserSession] = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [goodReadsUserId, setGoodReadsUserId] = useState('');

    useEffect(() => {
        let isMounted = true;

        loadUserProfile(setGoodReadsUserId)
            .then((data) => {
                if (isMounted && data) {
                    setGoodReadsUserId(data.goodReadsUserId);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false)
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const saveChanges = async () => {
        const userToken = getUserSession().token;

        await graphqlRequest(`
            mutation {
                saveUserProfile(userProfile: {
                    goodReadsUserId: "${goodReadsUserId}"
                }, userToken: "${userToken}")
            }`
        );
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <SectionHeader text="User Profile" />

            <Form>
                <FieldContainerStyled>
                    <TextField
                        label="GoodReads User Id"
                        defaultValue={goodReadsUserId}
                        onChange={e => setUsername(e.target.value)} />
                </FieldContainerStyled>
                
                <CommandContainerStyled>
                    <Button color="primary" variant="contained" onClick={saveChanges}>Save</Button>
                </CommandContainerStyled>
            </Form>
        </div>
    );
};
