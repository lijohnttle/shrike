import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import WelcomeSection from './sections/welcome/WelcomeSection';
import BooksLibrarySection from './sections/books/BooksLibrarySection';
import { smoothScrollOptions } from '../../utils/scrolling'
import { Page, withData } from '../core';


const useStyles = makeStyles(() => ({
    welcomeSectionContainer: {
        position: "relative",
    },
}));

const HomePage = ({ data }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const classes = useStyles();

    useEffect(() => {
        setScreenWidth(window.innerWidth);
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

let ResultComponent = withData(HomePage);

export default ResultComponent;
