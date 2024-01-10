import React, { useEffect, useState } from 'react';
import { Page } from '../../../components';
import { useData, useUserProfile } from '../../../hooks';
import { BlogSection } from '../BlogSection';


const HomePage = () => {
    const data = useData();
    const { userProfile } = useUserProfile();

    return (
        <Page title="Home">
            <div>
                {/* <Box position="relative">
                    <WelcomeSection contacts={data.contacts} screenHeight={screenHeight} />
                </Box> */}

                <BlogSection disableBottomGutter />
            </div>
        </Page>
    );
}


export {
    HomePage
};
