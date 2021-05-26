import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import WelcomeSectionContent from './WelcomeSectionContent';

const useStyles = makeStyles(theme => ({
    root: ({screenHeight}) => ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        minHeight: `${screenHeight}px`
    }),
    backgroundContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    childrenContainer: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        animation: '$fadeInFromNone 1000ms ease-in 2500ms forwards'
    },
    '@keyframes fadeInFromNone': {
        '0%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        }
    },
}));

const useAnimatedBoxStyle = makeStyles(() => ({
    root: {
        position: 'absolute',
        background: 'CornflowerBlue',
    },
    animatedBox0: {
        opacity: 0,
        transform: 'scale(0, 0)',
        animation: '$boxAnimation 1000ms ease-in 0ms forwards',
    },
    animatedBox1: {
        opacity: 0,
        transform: 'scale(0, 0)',
        animation: '$boxAnimation 1000ms ease-in 250ms forwards',
    },
    animatedBox2: {
        opacity: 0,
        transform: 'scale(0, 0)',
        animation: '$boxAnimation 1000ms ease-in 500ms forwards',
    },
    animatedBox3: {
        opacity: 0,
        transform: 'scale(0, 0)',
        animation: '$boxAnimation 1000ms ease-in 750ms forwards',
    },
    animatedBox4: {
        opacity: 0,
        transform: 'scale(0, 0)',
        animation: '$boxAnimation 1000ms ease-in 1000ms forwards',
    },
    '@keyframes boxAnimation': {
        '0%': {
            opacity: 0,
            transform: 'scale(0, 0)',
        },
        '100%': {
            opacity: 1,
            transform: 'scale(1, 1)',
        }
    },
}));

const RenderAnimatedBox = ({left, top, width, height}) => {
    const boxAnimationIndex = Math.floor(Math.random() * 5);
    const boxAnimationClassName = `animatedBox${boxAnimationIndex}`;

    const classes = useAnimatedBoxStyle();

    return (
        <div
            className={`${classes.root} ${classes[boxAnimationClassName]}`}
            style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${width}%`,
                height: `${height}%`,
            }} >
        </div>
    );
};

const RenderAnimatedBoxes = ({ maxBoxesInLine, minBoxSize, screenWidth, screenHeight }) => {
    if (!screenWidth || !screenHeight) {
        return null;
    }
    
    const maxDimension = Math.max(screenWidth, screenHeight);

    // the max number of boes in column/row accounting the minimum size of one box
    const coercedMaxBoxedInLine = Math.min(maxBoxesInLine, Math.floor(maxDimension / minBoxSize));
    
    // stretched minimum size of one box in order for all boxes to fill the whole screen
    const coercedMinBoxSize = maxDimension / coercedMaxBoxedInLine;

    const boxSize = Math.max(coercedMinBoxSize, maxDimension / maxBoxesInLine);
    const rowLength = Math.round(screenWidth / boxSize);
    const columnLength = Math.round(screenHeight / boxSize);
    const boxWidth = 100 / rowLength;
    const boxHeight = 100 / columnLength;

    const animatedBoxes = [];

    for (let column = 0; column < rowLength; column++) {
        for (let row = 0; row < columnLength; row++) {
            animatedBoxes.push({
                key: row * rowLength + column,
                left: column * boxWidth,
                top: row * boxHeight
            });
        }
    }

    return (
        <React.Fragment>
            {animatedBoxes.map(box => (
                <RenderAnimatedBox
                    key={box.key}
                    left={box.left}
                    top={box.top}
                    width={boxWidth}
                    height={boxHeight} />
            ))}
        </React.Fragment>
    );
};

const WelcomeSection = ({ contacts, gotoNextSection }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    }, []);

    const classes = useStyles({ screenHeight });

    return (
        <div className={classes.root}>
            <div className={classes.backgroundContainer}>
                <RenderAnimatedBoxes
                    maxBoxesInLine={10}
                    minBoxSize={64}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight} />
            </div>

            <div className={classes.childrenContainer}>
                <WelcomeSectionContent
                    contacts={contacts}
                    gotoNextSection={gotoNextSection} />
            </div>
        </div>
    );
}

WelcomeSection.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    gotoNextSection: PropTypes.func.isRequired
};

export default WelcomeSection;