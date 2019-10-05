import React from 'react';
import { Box } from '@material-ui/core';
import { Element as ScrollTarget, scroller } from 'react-scroll';
import { Header } from '../Header';
import { HomeTopContainer } from './HomeTopContainer';
import { AboutSection } from './AboutSection';
import { BooksSection } from './BooksSection';
import { smoothScrollOptions } from '../../utils/scrolling'
import data from '../../data';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.gotoBooksSection = this.gotoBooksSection.bind(this);
    }

    gotoBooksSection() {
        scroller.scrollTo('HomePage-BooksSection', smoothScrollOptions);
    }

    render() {
        return (
            <React.Fragment>
                <Box mb={8}>
                    <HomeTopContainer>
                        <Header />

                        <AboutSection contacts={data.contacts} gotoNextSection={this.gotoBooksSection} />
                    </HomeTopContainer>
                </Box>

                <Box mb={8}>
                    <ScrollTarget name="HomePage-BooksSection">
                        <BooksSection userId={data.goodReads.userId} />
                    </ScrollTarget>
                </Box>
            </React.Fragment>
        );
    }
}

export { HomePage };