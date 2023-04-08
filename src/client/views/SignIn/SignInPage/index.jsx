import React, { useState } from 'react';
import { Box, Button, TextField, styled } from '@mui/material';
import { Page } from '../../../components';
import { signIn } from '../../../services/securityService';
import { Navigate } from 'react-router-dom';
import { useUserSession } from '../../../hooks';
import { pagesDescriptors } from '../../../../static';


const FormStyled = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '300px',
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
        alignSelf: 'stretch',
        width: 'unset',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const FieldContainerStyled = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [getUserSession, setUserSession] = useUserSession();

    const submitHandler = async (e) => {
        e?.preventDefault();

        try {
            const data = await signIn(username, password);

            if (data?.token) {
                const username = data.username;
                const token = data.token;

                setUserSession(username, token);
            }
            else {
                const errorMessage = data.message;

                console.error(errorMessage);
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    if (getUserSession()) {
        return <Navigate to={pagesDescriptors.ACCOUNT_MANAGEMENT.path} />;
    }

    return (
        <Page title="Sign In">
            <Box flexGrow={1} />

            <FormStyled onSubmit={submitHandler}>
                <FieldContainerStyled>
                    <TextField
                        required
                        label="Username"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)} />
                </FieldContainerStyled>
                <FieldContainerStyled>
                    <TextField
                        required
                        type="password"
                        label="Password"
                        defaultValue={password}
                        onChange={e => setPassword(e.target.value)} />
                </FieldContainerStyled>

                <Button type="submit" color="primary" variant="contained" onClick={submitHandler}>Sign In</Button>
            </FormStyled>

            <Box flexGrow={2} />
        </Page>
    );
};


export {
    SignInPage
};
