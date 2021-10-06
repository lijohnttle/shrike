import React, { useEffect, useState } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Article, ArticleContentBlock, Footer, Header } from '../common';
import { asPage } from '../core';
import { queryData } from '../../services/api';
import UserProfileSection from './UserProfileSection';

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
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        queryData(`
                query {
                    userProfile {
                        goodReadsUserId
                    }
                }
            `)
            .then((response) => {
                if (response.userProfile) {
                    setData(response.userProfile);
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [])

    return (
        <div className={classes.root}>
            <Header light />

            <Article title="ACCOUNT MANAGEMENT">
                <ArticleContentBlock>
                    {isLoading
                        ? <CircularProgress />
                        : <UserProfileSection data={data} /> }
                </ArticleContentBlock>
            </Article>

            <Footer />
        </div>
    );
};

export default asPage(AccountManagementPage, pageOptions);