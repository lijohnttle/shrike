import React from 'react';
import { Container, withStyles, Paper } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import HeaderBar from '../common/HeaderBar';
import WelcomeSectionContainer from './sections/welcome/WelcomeSectionContainer';
import WelcomeSection from './sections/welcome/WelcomeSection';
import { BookLibraryArticle } from '../bookLibrary/BookLibraryArticle';
import { CvArticle } from '../cv/CvArticle';
import { ProjectsArticle } from '../projects/ProjectsArticle';
import { Footer } from '../common/Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

const useStyles = (theme) => ({
    welcomeSectionContainer: {
        position: "relative",
        zIndex: 1,
    },
    sectionContainer: {
        position: "relative",
        zIndex: 0,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    contentPaper: {
        display: 'flex',
        flexDirection: 'column'
    }
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.gotoBooksSection = this.gotoBooksSection.bind(this);
    }

    gotoBooksSection() {
        animateScroll.scrollTo(window.innerHeight, smoothScrollOptions);
    }

    render() {
        return (
            <React.Fragment>
                <div className={this.props.classes.welcomeSectionContainer}>
                    <WelcomeSectionContainer>
                        <HeaderBar showBackgroundOnScroll={true} hasFixedPosition={true} />

                        <WelcomeSection
                            contacts={data.contacts}
                            gotoNextSection={this.gotoBooksSection} />
                    </WelcomeSectionContainer>
                </div>

                <Container className={this.props.classes.sectionContainer}>
                    <Paper className={this.props.classes.contentPaper} square>
                        {/* <BlogSection /> */}

                        <CvArticle />

                        <ProjectsArticle />

                        <BookLibraryArticle userId={data.goodReads.userId} />

                        <Footer />
                    </Paper>
                </Container>
            </React.Fragment>
        );
    }
}

const HomePageExport = withStyles(useStyles)(HomePage);

export { HomePageExport as HomePage };