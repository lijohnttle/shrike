import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router';
import { Article, ArticleContentBlock } from '../common';
import { Page } from '../core';
import { useUserSession } from '../core/hooks';
import { AccountSectionUserProfile } from './AccountSectionUserProfile';
import { AccountSectionDiagnostics } from './AccountSectionDiagnostics';
import { verifyAccessToken } from '../../services/security.js';
import { urlList } from '../../static.js';


const AccountManagementPage = () => {
    const [getUserSession, _, removeUserSession] = useUserSession();
    const history = useHistory();

    useEffect(() => {
        const session = getUserSession();

        if (session) {
            verifyAccessToken(session.token, removeUserSession)
                .then((verified) => {
                    if (!verified) {
                        removeUserSession();
                        history.push(urlList.SIGN_IN);
                    }
                })
                .catch((error) => console.error(error));
        }
    }, []);

    if (!getUserSession()) {
        return <Redirect to={urlList.SIGN_IN} />;
    }

    return (
        <Page title="Account Management">
            <Article title="ACCOUNT MANAGEMENT">
                <ArticleContentBlock>
                    <AccountSectionUserProfile />
                </ArticleContentBlock>

                <ArticleContentBlock>
                    <AccountSectionDiagnostics />
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};

export default AccountManagementPage;
