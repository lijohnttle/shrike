import React, { useEffect, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { Page } from '../../../components/Page';
import { WelcomeSection } from '../WelcomeSection';
import { BooksLibrarySection } from '../BooksLibrarySection';
import { smoothScrollOptions } from '../../../utils/scrolling'
import { useData } from '../../../components/hooks';
import { useStyles } from './styles';


const HomePage = () => {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const classes = useStyles();
    const data = useData();

    useEffect(() => {
        setScreenHeight(window.innerHeight);
    }, []);

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

                <BooksLibrarySection screenHeight={screenHeight} />
            </div>
        </Page>
    );
}


export {
    HomePage
};
