import React from 'react';
import { Article, ArticleContentBlock } from '../common';
import { Page } from '../core';
import { AccountSectionUserProfile } from './AccountSectionUserProfile';
import { AccountSectionDiagnostics } from './AccountSectionDiagnostics';


const AccountManagementPage = () => {
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
