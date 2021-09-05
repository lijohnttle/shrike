import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import WelcomeSection from './sections/welcome/WelcomeSection';
import BooksLibrarySection from './sections/books/BooksLibrarySection';
import { Footer } from '../common';
import { smoothScrollOptions } from '../../utils/scrolling'
import SectionContentContainer from './sections/SectionContentContainer';
import { asPage, withData } from '../core';

const pageOptions = {
    title: 'Home'
};

const useStyles = makeStyles(theme => ({
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
        <React.Fragment>
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

let ResultComponent = withData(HomePage);
ResultComponent = asPage(ResultComponent, pageOptions);

export default ResultComponent;