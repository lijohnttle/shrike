import React, { useCallback, useEffect, useState } from 'react';
import { Page } from '../../../components';
import { WelcomeSection } from '../WelcomeSection';
import { PortfolioSection } from '../PortfolioSection';
import { useData } from '../../../hooks';
import { BlogSection } from '../BlogSection';
import { Box } from '@mui/system';


const HomePage = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const data = useData();

    const handleResize = useCallback(() => {
        // prevent jumping with auto hiding address bar
        const change = Math.abs(screenHeight - window.innerHeight);
        const changePercent = change / screenHeight;

        if (change > 100 && changePercent > 0.2) {
            setScreenHeight(window.innerHeight);
        }
    });

    const handleOrientationChange = useCallback(() => {
        setScreenHeight(window.innerHeight);
    });

    useEffect(() => {
        setScreenHeight(window.innerHeight);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, [handleOrientationChange]);

    return (
        <Page title="Home" hideHeader>
            <div>
                <Box position="relative">
                    <WelcomeSection contacts={data.contacts} screenHeight={screenHeight} />
                </Box>

                <BlogSection disableBottomGutter />

                <PortfolioSection />
            </div>
        </Page>
    );
}


export {
    HomePage
};
