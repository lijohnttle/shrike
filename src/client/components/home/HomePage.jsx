import React from 'react';
import { Box, Container } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { Fade } from 'react-reveal';
import { Header } from './sections/header/Header';
import { HomeTopContainer } from './HomeTopContainer';
import { HeaderSection } from './sections/header/HeaderSection';
import { BooksSection } from './sections/books/BooksSection';
import { BlogSection } from './sections/blog/BlogSection';
import { LinksSection } from './sections/links/LinksSection';
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
                    <LinksSection />,
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