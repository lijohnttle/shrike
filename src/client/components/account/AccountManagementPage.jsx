import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Article, Footer, Header } from '../common';
import { asPage } from '../core';

const pageOptions = {
    title: 'Account Management'
};

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));

const AccountManagementPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Header light />

            <Article title="ACCOUNT MANAGEMENT">
                
            </Article>

            <Footer />
        </div>
    );
};

export default asPage(AccountManagementPage, pageOptions);