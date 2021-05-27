import React, { useEffect, useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import HeaderBar from '../common/HeaderBar';
import WelcomeSection from './sections/welcome/WelcomeSection';
import BooksLibrarySection from './sections/books/BooksLibrarySection';
import { Footer } from '../common/Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

const useStyles = makeStyles(theme => ({
    welcomeSectionContainer: {
        position: "relative",
    },
    sectionContainer: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
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

            {/* <Container className={classes.sectionContainer}>
                <CvArticle />
            </Container>

            <Container className={classes.sectionContainer}>
                <ProjectsArticle />
            </Container> */}

            <Container className={classes.sectionContainer}>
                <BooksLibrarySection data={data} />
            </Container>

            <Container className={classes.sectionContainer}>
                <Footer />
            </Container>
        </React.Fragment>
    );
}

export default HomePage;