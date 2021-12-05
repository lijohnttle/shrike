import React, { useState } from 'react';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { UserProfileSection } from '../UserProfileSection';
import { UserVisitsSection } from '../UserVisitsSection';
import { useStyles } from './styles.js';
import { SectionsMenu } from '../SectionsMenu';
import { UserSessionsSection } from '../UserSessionsSection';


const SECTION_LIST = [
    {
        id: 'USER_PROFILE',
        header: 'User Profile',
        render: () => <UserProfileSection />,
    },
    {
        id: 'USER_VISITS',
        header: 'User Visits',
        render: () => <UserVisitsSection />,
    },
    {
        id: 'USER_SESSIONS',
        header: 'User Sessions',
        render: () => <UserSessionsSection />,
    },
];

const AccountManagementPage = () => {
    const [selectedSectionId, setSelectedSectionId] = useState(SECTION_LIST[0].id);
    const classes = useStyles();

    return (
        <Page title="Account Management" authenticated>
            <Article title="ACCOUNT MANAGEMENT">
                <ArticleContentBlock>
                    <div className={classes.sectionsRoot}>
                        <SectionsMenu
                            options={SECTION_LIST}
                            selection={selectedSectionId}
                            selectionChanged={setSelectedSectionId} />

                        <div className={classes.sectionRoot}>
                            {SECTION_LIST.find((section) => section.id === selectedSectionId)?.render()}
                        </div>
                    </div>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};

export {
    AccountManagementPage
};
