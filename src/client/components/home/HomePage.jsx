import React from 'react';
import { Box, Container, withStyles, Paper } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { Fade } from 'react-reveal';
import { Header } from './sections/header/Header';
import { HomeTopContainer } from './HomeTopContainer';
import { HeaderSection } from './sections/header/HeaderSection';
import { BooksSection } from './sections/books/BooksSection';
import { BlogSection } from './sections/blog/BlogSection';
import { CvPageSection } from '../cv/CvPageSection';
import { Footer } from '../Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

const useStyles = () => ({
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

                <Container>
                    <Paper className={this.props.classes.contentPaper} square>
                        {this.renderSections([
                            // <BlogSection />,
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
                    <Box key={index} mb={4}>
                        <Fade>
                            {section}
                        </Fade>
                    </Box>
                ))}
            </React.Fragment>
        );
    }
}

const HomePageExport = withStyles(useStyles)(HomePage);

export { HomePageExport as HomePage };