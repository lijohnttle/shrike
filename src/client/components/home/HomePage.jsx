import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import HeaderBar from '../common/HeaderBar';
import WelcomeSection from './sections/welcome/WelcomeSection';
import { BookLibraryArticle } from '../bookLibrary/BookLibraryArticle';
import { CvArticle } from '../cv/CvArticle';
import { ProjectsArticle } from '../projects/ProjectsArticle';
import { Footer } from '../common/Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

const useStyles = makeStyles(theme => ({
    welcomeSectionContainer: {
        position: "relative",
        zIndex: 1,
    },
    sectionContainer: {
        position: "relative",
        zIndex: 0,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
}));

const HomePage = () => {
    const [showHeader, setShowHeader] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        setShowHeader(window.scrollY >= window.innerHeight);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const scrollHandler = () => {
        setShowHeader(window.scrollY >= window.innerHeight);
    };

    const gotoBooksSection = () => {
        animateScroll.scrollTo(window.innerHeight, smoothScrollOptions);
    }

    console.log('Render...');

    return (
        <React.Fragment>
            <div style={{ visibility: (showHeader ? "visible" : "hidden") }}>
                <HeaderBar hasFixedPosition={true} />
            </div>

            <div className={classes.welcomeSectionContainer}>
                <WelcomeSection
                    contacts={data.contacts}
                    gotoNextSection={gotoBooksSection} />
            </div>

            <Container className={classes.sectionContainer}>
                {/* <BlogSection /> */}

                <CvArticle />

                <ProjectsArticle />

                <BookLibraryArticle userId={data.goodReads.userId} />

                <Footer />
            </Container>
        </React.Fragment>
    );
}

export default HomePage;