import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import Header from '../common/Header';
import WelcomeSection from './sections/welcome/WelcomeSection';
import BooksLibrarySection from './sections/books/BooksLibrarySection';
import { Footer } from '../common/Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';
import SectionContentContainer from './sections/SectionContentContainer';

const useStyles = makeStyles(theme => ({
    welcomeSectionContainer: {
        position: "relative",
    },
}));

const HomePage = () => {
    const [showHeader, setShowHeader] = useState(false);
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
        <React.Fragment>
            <div style={{ visibility: (showHeader ? "visible" : "hidden") }}>
                <Header hasFixedPosition={true} />
            </div>

            <div className={classes.welcomeSectionContainer}>
                <WelcomeSection
                    contacts={data.contacts}
                    gotoNextSection={gotoBooksSection}
                    screenHeight={screenHeight} />
            </div>

            <BooksLibrarySection goodreadsData={data.goodreads} screenHeight={screenHeight} />

            <SectionContentContainer>
                <Footer />
            </SectionContentContainer>
        </React.Fragment>
    );
}

export default HomePage;