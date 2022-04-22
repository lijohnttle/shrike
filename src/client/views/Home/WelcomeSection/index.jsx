import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { WelcomeSectionContent } from '../WelcomeSectionContent';
import { animateScroll } from 'react-scroll';
import { smoothScrollOptions } from '../../../utils/scrolling';
import { styled, keyframes } from '@mui/system';


const fadeOutKeyFrames = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const Root = styled('div')(({ screenheight }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
    background: 'url("/assets/images/welcome-background.jpg")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    minHeight: `${screenheight}px`,

    '& > div': {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        opacity: 1,
        animation: `${fadeOutKeyFrames} ease-in 1000ms forwards`,
    },
}));

const WelcomeSection = ({ contacts, screenHeight }) => {
    const containerRef = useRef();

    const scrollToNextSection = () => {
        if (containerRef.current) {
            animateScroll.scrollTo(containerRef.current.offsetTop + containerRef.current.offsetHeight, smoothScrollOptions);
        }
    };

    return (
        <Root ref={containerRef} screenheight={screenHeight}>
            <div>
                <WelcomeSectionContent
                    contacts={contacts}
                    gotoNextSection={scrollToNextSection} />
            </div>
        </Root>
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
