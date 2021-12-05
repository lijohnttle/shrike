import React, { useState } from 'react';
import { Button, Input, InputLabel, TextField } from '@mui/material';
import { Page } from '../../../components/Page';
import { signIn } from '../../../services/security.js';
import { Redirect } from 'react-router';
import { useUserSession } from '../../../hooks';
import { useStyles } from './styles';
import { urlList } from '../../../../static';


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
        return <Redirect to={urlList.ACCOUNT_MANAGEMENT} />;
    }

    return (
        <Page title="Sign In">
            <div className={classes.topSpace}></div>

            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.fieldContainer}>
                    <TextField
                        required
                        label="Username"
                        defaultValue={username}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className={classes.fieldContainer}>
                    <TextField
                        required
                        type="password"
                        label="Password"
                        defaultValue={password}
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <Button type="submit" color="primary" variant="contained" onClick={submitHandler}>Sign In</Button>
            </form>

            <div className={classes.bottomSpace}></div>
        </Page>
    );
};


export {
    SignInPage
};
