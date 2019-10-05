import React from 'react';
import { Box } from '@material-ui/core';
import { animateScroll } from 'react-scroll';
import { Header } from '../Header';
import { HomeTopContainer } from './HomeTopContainer';
import { Sectioncontainer } from './SectionContainer';
import { HeaderSection } from './HeaderSection';
import { BooksSection } from './BooksSection';
import { AboutSection } from './AboutSection';
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

                <Sectioncontainer>
                    <AboutSection />
                </Sectioncontainer>

                <Sectioncontainer>
                    <BooksSection userId={data.goodReads.userId} />
                </Sectioncontainer>
            </React.Fragment>
        );
    }
}

export { HomePage };