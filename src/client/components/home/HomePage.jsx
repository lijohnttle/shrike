import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import WelcomeSection from './sections/welcome/WelcomeSection';
import BooksLibrarySection from './sections/books/BooksLibrarySection';
import { smoothScrollOptions } from '../../utils/scrolling'
import { asPage, withData } from '../core';

const pageOptions = {
    title: 'Home',
    showHeader: false,
};

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
        <div>
            <div className={classes.welcomeSectionContainer}>
                <WelcomeSection
                    contacts={data.contacts}
                    gotoNextSection={gotoBooksSection}
                    screenHeight={screenHeight} />
            </div>

            <BooksLibrarySection screenHeight={screenHeight} />
        </div>
    );
}

let ResultComponent = withData(HomePage);
ResultComponent = asPage(ResultComponent, pageOptions);

export default ResultComponent;