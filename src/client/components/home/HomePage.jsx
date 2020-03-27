import React from 'react';
import { Box, Container } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { Fade } from 'react-reveal';
import { Header } from './Header';
import { HomeTopContainer } from './HomeTopContainer';
import { HeaderSection } from './HeaderSection';
import { BooksSection } from './BooksSection';
import { BlogSection } from './BlogSection';
import { Footer } from '../Footer';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

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
                <Box mb={8}>
                    <HomeTopContainer>
                        <Header />

                        <HeaderSection contacts={data.contacts} gotoNextSection={this.gotoBooksSection} />
                    </HomeTopContainer>
                </Box>

                {this.renderSections([
                    <BlogSection />,
                    <BooksSection userId={data.goodReads.userId} />
                ])}

                <Footer />
            </React.Fragment>
        );
    }

    renderSections(sections) {
        return (
            <React.Fragment>
                {sections.map((section, index) => (
                    <Box key={index} mb={4}>
                        <Fade>
                            <Container>
                                {section}
                            </Container>
                        </Fade>
                    </Box>
                ))}
            </React.Fragment>
        );
    }
}

export { HomePage };