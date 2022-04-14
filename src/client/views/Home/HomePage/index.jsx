import React, { useCallback, useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { Page } from '../../../components/Page';
import { WelcomeSection } from '../WelcomeSection';
import { PortfolioSection } from '../PortfolioSection';
import { BooksLibrarySection } from '../BooksLibrarySection';
import { AboutMeSection } from '../AboutMeSection';
import { CoreValuesSection } from '../CoreValuesSection';
import { smoothScrollOptions } from '../../../utils/scrolling';
import { useData } from '../../../hooks';
import { useStyles } from './styles';


const HomePage = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const classes = useStyles();
    const data = useData();

    const handleResize = useCallback(() => {
        // prevent jumping with auto hiding address bar
        if (Math.abs(screenHeight - window.innerHeight) > 72) {
            setScreenHeight(window.innerHeight);
        }
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

    const gotoBooksSection = () => {
        animateScroll.scrollTo(window.innerHeight, smoothScrollOptions);
    }

    return (
        <Page title="Home" hideHeader>
            <div>
                <div className={classes.welcomeSectionContainer}>
                    <WelcomeSection
                        contacts={data.contacts}
                        gotoNextSection={gotoBooksSection}
                        screenHeight={screenHeight} />
                </div>

                <AboutMeSection contacts={data.contacts} screenHeight={screenHeight} />

                <CoreValuesSection screenHeight={screenHeight} />

                <PortfolioSection screenHeight={screenHeight} />

                <BooksLibrarySection screenHeight={screenHeight} isLastSection />
            </div>
        </Page>
    );
}


export {
    HomePage
};
