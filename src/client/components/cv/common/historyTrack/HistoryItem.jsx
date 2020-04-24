import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { StartHistoryMark } from './StartHistoryMark';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        '&>div:first-child': {
            display: 'flex',

            '&>*:nth-child(2)': {
                flex: 1,
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2)
            }
        }
    }
}));

const HistoryItem = ({ children, isHistoryStart, isHistoryEnd }) => {
    const classes = useStyles();
    const [isMouseOver, mouseOver] = React.useState(false);
    const color = isMouseOver ? 'black' : '#eaeaea';

    return (
        <div className={classes.root} onPointerEnter={() => mouseOver(true)} onPointerLeave={() => mouseOver(false)}>
            <div>
                <Box position="relative" width="40px">
                    <svg width="40" height="32" viewBox="0 0 40 32" preserveAspectRatio="none" style={{ position: "absolute" }}>
                        <line
                            x1="14"
                            y1="0"
                            x2="14"
                            y2="32"
                            stroke={color}
                            strokeWidth={2}
                            strokeDasharray={isHistoryEnd ? 2 : 0} />
                    </svg>

                    <Box position="absolute" top={32} bottom={0}>
                        <svg width="40" height="100%" viewBox="0 0 40 10" preserveAspectRatio="none" style={{ position: "absolute" }}>
                            <line
                                x1="14"
                                y1="0"
                                x2="14"
                                y2="10"
                                stroke={color}
                                strokeWidth={2} />
                        </svg>
                    </Box>

                    <svg width="40" height="100%" style={{ position: "absolute" }}>
                        <circle
                            fill={color}
                            stroke="white"
                            strokeWidth={4}
                            cx={14}
                            cy={32}
                            r={8} />
                    </svg>
                </Box>
                <div>
                    {React.Children.count(children) > 0
                        ? children
                        : <Skeleton variant="rect" height="6rem"/>}
                </div>
            </div>

            {isHistoryStart ? <StartHistoryMark color={color} /> : null}
        </div>
    );
};

export { HistoryItem };