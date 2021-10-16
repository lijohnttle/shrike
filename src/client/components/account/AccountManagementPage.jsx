import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { Article, ArticleContentBlock } from '../common';
import { asPage } from '../core';
import { queryData } from '../../services/api';
import AccountSectionUserProfile from './AccountSectionUserProfile';

const pageOptions = {
    title: 'Account Management'
};

const AccountManagementPage = () => {
    const [userProfileData, setUserProfileData] = useState(null);
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
                    setUserProfileData(response.userProfile);
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [])

    return (
        <Article title="ACCOUNT MANAGEMENT">
            <ArticleContentBlock>
                {isLoading
                    ? <CircularProgress />
                    : <AccountSectionUserProfile data={userProfileData} /> }
            </ArticleContentBlock>
        </Article>
    );
};

export default asPage(AccountManagementPage, pageOptions);