import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: ({windowHeight}) => ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        boxShadow: theme.shadows[3],
        minHeight: `${windowHeight}px`
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
        animation: '$fadeInFromNone 1000ms ease-in 1500ms forwards'
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

const generateAnimatedBoxStyle = (delay, duration, width, height) => {
    return makeStyles(() => ({
        root: {
            position: 'absolute',
            width: `${width}%`,
            height: `${height}%`,
            background: '#5e98be',
            opacity: 0,
            transform: 'scale(0, 0)',
            animationName: '$fadeInFromNone',
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-in',
        },
        '@keyframes fadeInFromNone': {
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
};

const RenderAnimatedBox = ({column, row, columnLength, rowLength}) => {
    const boxWidth = 100 / rowLength;
    const boxHeight = 100 / columnLength;
    const x = column * boxWidth;
    const y = row * boxHeight;
    const maxDuration = 1000;
    const duration = maxDuration / 2;
    const delay = Math.round(Math.random() * (maxDuration - duration));

    const classes = generateAnimatedBoxStyle(delay, duration, boxWidth, boxHeight)();

    return (
        <div className={classes.root} style={{ left: `${x}%`, top: `${y}%` }}>
        </div>
    );
};

const RenderAnimatedBoxes = () => {
    let rowLength = Math.ceil(window.innerWidth / 64);
    let columnLength = Math.ceil(window.innerHeight / 64);
    const lineMaxLength = 10;
    const currentLineMaxLength = Math.max(rowLength, columnLength);

    if (currentLineMaxLength > lineMaxLength) {
        const factor = currentLineMaxLength / lineMaxLength;
        rowLength = Math.ceil(rowLength / factor);
        columnLength = Math.ceil(columnLength / factor);
    }

    const animatedBoxes = [0];

    for (let column = 0; column < rowLength; column++) {
        for (let row = 0; row < columnLength; row++) {
            animatedBoxes.push({ column, row });
        }
    }

    return (
        <React.Fragment>
            {animatedBoxes.map(box => (
                <RenderAnimatedBox
                    key={box.row * rowLength + box.column}
                    column={box.column}
                    row={box.row}
                    columnLength={columnLength}
                    rowLength={rowLength} />
            ))}
        </React.Fragment>
    );
};

const WelcomeSectionContainer = ({ children }) => {
    const classes = useStyles({ windowHeight: window.innerHeight });

    return (
        <div className={classes.root}>
            <div className={classes.backgroundContainer}>
                <RenderAnimatedBoxes />
            </div>

            <div className={classes.childrenContainer}>
                {children}
            </div>
        </div>
    );
}

export default WelcomeSectionContainer;