import React, { useState } from 'react';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { UserProfileSection } from '../UserProfileSection';
import { UserVisitsSection } from '../UserVisitsSection';
import { useStyles } from './styles.js';
import { SectionsMenu } from '../SectionsMenu';


const SECTION_IDS = {
    USER_PROFILE: 'USER_PROFILE',
    VISITS: 'VISITS',
};

const AccountManagementPage = () => {
    const [selectedSectionId, setSelectedSectionId] = useState(SECTION_IDS.USER_PROFILE);
    const classes = useStyles();

    return (
        <Page title="Account Management" authenticated>
            <Article title="ACCOUNT MANAGEMENT">
                <ArticleContentBlock>
                    <div className={classes.sectionsRoot}>
                        <SectionsMenu
                            options={[
                                {
                                    id: SECTION_IDS.USER_PROFILE,
                                    header: "User Profile",
                                },
                                {
                                    id: SECTION_IDS.VISITS,
                                    header: "User Visits",
                                },
                            ]}
                            selection={selectedSectionId}
                            selectionChanged={setSelectedSectionId} />

                        <div className={classes.sectionRoot}>
                            {selectedSectionId === SECTION_IDS.USER_PROFILE ? <UserProfileSection /> : null}
                            {selectedSectionId === SECTION_IDS.VISITS ? <UserVisitsSection /> : null}
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
