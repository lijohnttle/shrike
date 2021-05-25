import React from 'react';
import { Container, withStyles, Paper } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import HeaderBar from '../common/HeaderBar';
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
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
});

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHeader: false,
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.gotoBooksSection = this.gotoBooksSection.bind(this);
    }

    gotoBooksSection() {
        animateScroll.scrollTo(window.innerHeight, smoothScrollOptions);
    }

    handleWindowScroll() {
        this.setState({
            showHeader: window.pageYOffset >= window.innerHeight
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleWindowScroll);

        this.setState({
            showHeader: window.pageYOffset >= window.innerHeight
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ visibility: (this.state.showHeader ? "visible" : "hidden") }}>
                    <HeaderBar hasFixedPosition={true} />
                </div>

                <div className={this.props.classes.welcomeSectionContainer}>
                    <WelcomeSection
                        contacts={data.contacts}
                        gotoNextSection={this.gotoBooksSection} />
                </div>

                <Container className={this.props.classes.sectionContainer}>
                    {/* <BlogSection /> */}

                    <CvArticle />

                    <ProjectsArticle />

                    <BookLibraryArticle userId={data.goodReads.userId} />

                    <Footer />
                </Container>
            </React.Fragment>
        );
    }
}

const HomePageExport = withStyles(useStyles)(HomePage);

export { HomePageExport as HomePage };