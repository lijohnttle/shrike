import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { Page } from '../core';
import { signIn } from '../../api/accountApi.js';
import { Redirect } from 'react-router';
import { useUserSession } from '../core/hooks';
import { useStyles } from './SignInPage.styles';


const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [getUserSession, setUserSession] = useUserSession();
    const classes = useStyles();

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
        return <Redirect to="/account/management" />;
    }

    return (
        <Page title="Sign In">
            <div className={classes.topSpace}></div>

            <form className={classes.form} onSubmit={submitHandler}>
                <FormControl>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" aria-describedby="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" aria-describedby="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </FormControl>

                <Button type="submit" color="primary" onClick={submitHandler}>Sign In</Button>
            </form>

            <div className={classes.bottomSpace}></div>
        </Page>
    );
};


export {
    SignInPage
};
