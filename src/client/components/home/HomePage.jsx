import React from 'react';
import { Container, withStyles, Paper } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { HeaderBar } from '../common/HeaderBar';
import { HomeTopContainer } from './HomeTopContainer';
import { HeaderSection } from './header/HeaderSection';
import { BookLibraryArticle } from '../bookLibrary/BookLibraryArticle';
import { CvArticle } from '../cv/CvArticle';
import { ProjectsArticle } from '../projects/ProjectsArticle';
import { Footer } from '../common/Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

const useStyles = (theme) => ({
    sectionContainer: {
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
                <div>
                    <HomeTopContainer>
                        <HeaderBar showBackgroundOnScroll={true} hasFixedPosition={true} />

                        <HeaderSection contacts={data.contacts} gotoNextSection={this.gotoBooksSection} />
                    </HomeTopContainer>
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