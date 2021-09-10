import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, Container, FormControl, Input, InputLabel, makeStyles, Typography } from '@material-ui/core';
import { Footer, Header } from '../common';
import { asPage } from '../core';
import { signIn } from '../../api/accountApi.js';
import cookieKeys from '../../cookieKeys.js';
import { Redirect } from 'react-router';

const pageOptions = {
    title: 'Sign In'
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '300px',
        marginTop: theme.spacing(8),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),

        [theme.breakpoints.down('xs')]: {
            alignSelf: 'stretch',
            width: 'unset',
            marginTop: theme.spacing(4),
        },
    },
}));

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies([cookieKeys.authUsername, cookieKeys.authToken]);
    const classes = useStyles();

    const submitHandler = async (e) => {
        e?.preventDefault();

        try {
            const data = await signIn(username, password);

            if (data.token) {
                const username = data.username;
                const token = data.token;

                setCookie(cookieKeys.authUsername, username, { path: '/' });
                setCookie(cookieKeys.authToken, token, { path: '/' });
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

    if (cookies[cookieKeys.authUsername] && cookies[cookieKeys.authToken]) {
        return <Redirect to="/account/management" />;
    }

    return (
        <div className={classes.root}>
            <Header light />

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

            <Footer />
        </div>
    );
};

export default asPage(SignInPage, pageOptions);