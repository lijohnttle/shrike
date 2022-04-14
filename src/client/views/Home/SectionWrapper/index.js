import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { animateScroll } from 'react-scroll';
import { smoothScrollOptions } from '../../../utils/scrolling.js';
import { useStyles } from './styles.js';


const renderScrollButton = (classes, dark, clickHandler) => {
    return (
        <div className={classes.gotoNextSectionButtonContainer}>
            <IconButton
                className={`${classes.gotoNextSectionButton} ${dark ? 'dark' : ''}`}
                color="inherit"
                size="large"
                onClick={clickHandler}>
                <KeyboardArrowDown fontSize="inherit" />
            </IconButton>
        </div>
    );
};

const SectionWrapper = ({
        screenHeight,
        className,
        children,
        canScrollToNextSection,
        scrollButtonDarkStyle,
        bottomSpaceClassName
    }) => {
    const rootRef = useRef();
    const classes = useStyles({ screenHeight });

    const scrollToNextSection = () => {
        if (rootRef.current) {
            animateScroll.scrollTo(rootRef.current.offsetTop + rootRef.current.offsetHeight, smoothScrollOptions);
        }
    };

    return (
        <div ref={rootRef} className={`${classes.root} ${className || ''}`}>
            <div className={classes.childrenContainer}>
                {children}
            </div>
            <div className={`${classes.bottomSpace} ${bottomSpaceClassName || ''}`}>
                {canScrollToNextSection ? renderScrollButton(classes, scrollButtonDarkStyle, scrollToNextSection) : null}
            </div>
        </div>
    );
};


export {
    SectionWrapper
};
