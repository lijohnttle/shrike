import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, FormControl, Input, InputLabel, makeStyles } from '@material-ui/core';
import { Page } from '../core';
import { signIn } from '../../api/accountApi.js';
import cookieKeys from '../../cookieKeys.js';
import { Redirect } from 'react-router';
import { useStyles } from './SignInPage.styles';


const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies([cookieKeys.AUTH_USERNAME, cookieKeys.AUTH_TOKEN]);
    const classes = useStyles();

    const submitHandler = async (e) => {
        e?.preventDefault();

        try {
            const data = await signIn(username, password);

            if (data?.token) {
                const username = data.username;
                const token = data.token;

                setCookie(cookieKeys.AUTH_USERNAME, username, { path: '/' });
                setCookie(cookieKeys.AUTH_TOKEN, token, { path: '/' });
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

    if (cookies[cookieKeys.AUTH_USERNAME] && cookies[cookieKeys.AUTH_TOKEN]) {
        return <Redirect to="/account/management" />;
    }

    return (
        <Page title="Sign In">
            <form className={classes.form} onSubmit={submitHandler}>
                <FormControl>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" aria-describedby="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" aria-describedby="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormControl>

                <Button color="primary" onClick={submitHandler}>Sign In</Button>
            </form>
        </Page>
    );
};


export {
    SignInPage
};
