import React from 'react';
import { Box, Container, withStyles, Paper } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { Spring } from "react-spring/renderprops";
import VisibilitySensor from "react-visibility-sensor";
import { Header } from './sections/header/Header';
import { HomeTopContainer } from './HomeTopContainer';
import { HeaderSection } from './sections/header/HeaderSection';
import { BooksSection } from './sections/books/BooksSection';
import { CvPageSection } from '../cv/CvPageSection';
import { ProjectsPageSection } from '../projects/ProjectsPageSection';
import { Footer } from '../Footer';
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
                <Box>
                    <HomeTopContainer>
                        <Header />

                        <HeaderSection contacts={data.contacts} gotoNextSection={this.gotoBooksSection} />
                    </HomeTopContainer>
                </Box>

                <Container className={this.props.classes.sectionContainer}>
                    <Paper className={this.props.classes.contentPaper} square>
                        {this.renderSections([
                            // <BlogSection />,
                            <ProjectsPageSection />,
                            <CvPageSection isExpandable={true} />,
                            <BooksSection userId={data.goodReads.userId} />
                        ])}

                        <Footer />
                    </Paper>
                </Container>
            </React.Fragment>
        );
    }

    renderSections(sections) {
        return (
            <React.Fragment>
                {sections.map((section, index) => (
                    <VisibilitySensor key={index} partialVisibility minTopValue={24}>
                        {
                            ({ isVisible }) => (
                                <Spring delay={200} to={{ opacity: isVisible ? 1 : 0 }}>
                                    {({ opacity }) => <div style={{ opacity }}>{section}</div>}
                                </Spring>
                            )
                        }
                    </VisibilitySensor>
                ))}
            </React.Fragment>
        );
    }
}

const HomePageExport = withStyles(useStyles)(HomePage);

export { HomePageExport as HomePage };