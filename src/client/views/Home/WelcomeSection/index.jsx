import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { WelcomeSectionContent } from '../WelcomeSectionContent';
import { useStyles } from './styles';
import { animateScroll } from 'react-scroll';
import { smoothScrollOptions } from '../../../utils/scrolling';


const WelcomeSection = ({ contacts, screenHeight }) => {
    const containerRef = useRef();
    const classes = useStyles({ screenHeight });

    const scrollToNextSection = () => {
        if (containerRef.current) {
            animateScroll.scrollTo(containerRef.current.offsetTop + containerRef.current.clientHeight, smoothScrollOptions);
        }
    };

    return (
        <div ref={containerRef} className={classes.root}>
            <div className={classes.childrenContainer}>
                <WelcomeSectionContent
                    contacts={contacts}
                    gotoNextSection={scrollToNextSection} />
            </div>
        </div>
    );
}

WelcomeSection.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
};


export {
    WelcomeSection
};
