import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useUserProfile } from '../../../hooks';
import { SectionHeader } from '../SectionHeader/index.jsx';
import { fontFamily, styled } from '@mui/system';
import { UserProfileDto } from '../../../../contracts/users/UserProfileDto.js';


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
    const [isLoading, setIsLoading] = useState(true);
    const { userProfile, isFetching, saveUserProfile } = useUserProfile();
    const [goodReadsUserId, setGoodReadsUserId] = useState('');
    const [greetingsHeader, setGreetingsHeader] = useState('');
    const [greetingsText, setGreetingsText] = useState('');
    const [summary, setSummary] = useState('');

    useEffect(() => {
        if (!isFetching) {
            setGoodReadsUserId(userProfile?.goodReadsUserId || '');
            setGreetingsHeader(userProfile?.greetingsHeader || '');
            setGreetingsText(userProfile?.greetingsText || '');
            setSummary(userProfile?.summary || '');
            setIsLoading(false);
        }
    }, [isFetching]);

    const saveChanges = async () => {
        await saveUserProfile(new UserProfileDto({
            goodReadsUserId,
            greetingsHeader,
            greetingsText,
            summary
         }));
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
                        label="Greetings Header"
                        defaultValue={greetingsHeader}
                        InputProps={{
                            style: {fontFamily: 'monospace'}
                        }}
                        onChange={e => setGreetingsHeader(e.target.value)} />
                </FieldContainerStyled>
                <FieldContainerStyled>
                    <TextField
                        label="Greetings Text"
                        defaultValue={greetingsText}
                        multiline
                        InputProps={{
                            style: {fontFamily: 'monospace'}
                        }}
                        onChange={e => setGreetingsText(e.target.value)} />
                </FieldContainerStyled>
                <FieldContainerStyled>
                    <TextField
                        label="Summary"
                        defaultValue={summary}
                        multiline
                        InputProps={{
                            style: {fontFamily: 'monospace'}
                        }}
                        onChange={e => setSummary(e.target.value)} />
                </FieldContainerStyled>
                <FieldContainerStyled>
                    <TextField
                        label="GoodReads User Id"
                        defaultValue={goodReadsUserId}
                        InputProps={{
                            style: {fontFamily: 'monospace'}
                        }}
                        onChange={e => setGoodReadsUserId(e.target.value)} />
                </FieldContainerStyled>
                
                <CommandContainerStyled>
                    <Button color="primary" variant="contained" onClick={saveChanges}>Save</Button>
                </CommandContainerStyled>
            </Form>
        </div>
    );
};
