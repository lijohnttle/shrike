import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { animateScroll } from 'react-scroll';
import { smoothScrollOptions } from '../../../utils/scrolling.js';
import { Box } from '@mui/system';


const SectionWrapper = ({
        screenHeight,
        styles,
        children,
        canScrollToNextSection,
        scrollButtonDarkStyle,
    }) => {
    const rootRef = useRef();

    const scrollToNextSection = () => {
        if (rootRef.current) {
            animateScroll.scrollTo(rootRef.current.offsetTop + rootRef.current.offsetHeight, smoothScrollOptions);
        }
    };

    return (
        <Box
            ref={rootRef}
            display="flex"
            flexDirection="column"
            justifyContent="stretch"
            minHeight={`${screenHeight}px`}
            sx={styles}>
            <Box display="flex" flexDirection="column" justifyContent="stretch" flex="1">
                {children}
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center">

                {canScrollToNextSection ? (
                    <Box marginTop={2} marginBottom={2}>
                        <IconButton
                            sx={{
                                '&:hover': {
                                    background: '#99999940 !important',
                                },
                                '&.dark:hover': {
                                    background: '#ffffff33 !important',
                                },
                            }}
                            className={`nextSectionButton ${scrollButtonDarkStyle ? 'dark' : ''}`}
                            color="inherit"
                            size="large"
                            onClick={scrollToNextSection}>
                            <KeyboardArrowDown fontSize="inherit" />
                        </IconButton>
                    </Box>
                ) : null}
            </Box>
        </Box>
    );
};


export {
    SectionWrapper
};
