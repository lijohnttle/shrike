import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/core';
import { useUserSession } from '../../../components/core/hooks';
import { UserProfileSection } from '../UserProfileSection';
import { UserVisitsSection } from '../UserVisitsSection';
import { verifyAccessToken } from '../../../services/security.js';
import { urlList } from '../../../../static.js';
import { useStyles } from './styles.js';
import { SectionsMenu } from '../SectionsMenu';


const SECTION_IDS = {
    USER_PROFILE: 'USER_PROFILE',
    VISITS: 'VISITS',
};

const AccountManagementPage = () => {
    const [selectedSectionId, setSelectedSectionId] = useState(SECTION_IDS.USER_PROFILE);
    const [getUserSession, _, removeUserSession] = useUserSession();
    const history = useHistory();
    const classes = useStyles();

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
