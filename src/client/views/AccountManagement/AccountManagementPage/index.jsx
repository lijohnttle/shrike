import React, { useState } from 'react';
import { Article, ContentBlock, Page } from '../../../components';
import { SectionUserProfile } from '../SectionUserProfile';
import { SectionUserVisits } from '../SectionUserVisits';
import { useStyles } from './styles.js';
import { SectionsMenu } from '../SectionsMenu';
import { SectionUserSessions } from '../SectionUserSessions';
import { pagesDescriptors } from '../../../../static';
import { styled } from '@mui/system';


const SECTION_LIST = [
    {
        id: 'USER_PROFILE',
        header: 'User Profile',
        render: () => <SectionUserProfile />,
    },
    {
        id: 'USER_VISITS',
        header: 'User Visits',
        render: () => <SectionUserVisits />,
    },
    {
        id: 'USER_SESSIONS',
        header: 'User Sessions',
        render: () => <SectionUserSessions />,
    },
];

const SectionsRoot = styled('div')(({ theme }) => ({
    display: 'flex',
        flexFlow: 'row nowrap',

        [theme.breakpoints.down('md')]: {
            flexFlow: 'column nowrap',
        },

    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
}));

const SectionRoot = styled('div')(({ theme }) => ({
    flexGrow: 1
}));

const AccountManagementPage = () => {
    const [selectedSectionId, setSelectedSectionId] = useState(SECTION_LIST[0].id);
    const classes = useStyles();

    return (
        <Page title="Account Management" authenticated>
            <Article pageDescriptor={pagesDescriptors.ACCOUNT_MANAGEMENT}>
                <ContentBlock>
                    <SectionsRoot>
                        <SectionsMenu
                            options={SECTION_LIST}
                            selection={selectedSectionId}
                            selectionChanged={setSelectedSectionId} />

                        <SectionRoot>
                            {SECTION_LIST.find((section) => section.id === selectedSectionId)?.render()}
                        </SectionRoot>
                    </SectionsRoot>
                </ContentBlock>
            </Article>
        </Page>
    );
};

export {
    AccountManagementPage
};
