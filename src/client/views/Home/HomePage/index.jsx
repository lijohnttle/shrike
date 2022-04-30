import React, { useCallback, useEffect, useState } from 'react';
import { Page } from '../../../components';
import { WelcomeSection } from '../WelcomeSection';
import { PortfolioSection } from '../PortfolioSection';
import { BooksLibrarySection } from '../BooksLibrarySection';
import { AboutMeSection } from '../AboutMeSection';
import { useData } from '../../../hooks';
import { useStyles } from './styles';
import { BlogSection } from '../BlogSection';


const HomePage = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const classes = useStyles();
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
                <div className={classes.welcomeSectionContainer}>
                    <WelcomeSection contacts={data.contacts} screenHeight={screenHeight} />
                </div>

                <AboutMeSection contacts={data.contacts} screenHeight={screenHeight} />

                <BlogSection />

                <PortfolioSection screenHeight={screenHeight} />

                <BooksLibrarySection screenHeight={screenHeight} isLastSection />
            </div>
        </Page>
    );
}


export {
    HomePage
};
