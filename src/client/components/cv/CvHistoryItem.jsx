import React from 'react';
import { Box } from '@material-ui/core';

const RenderItem = (children, isHistoryLastItem) => {
    const topLineOpacity = isHistoryLastItem ? 0.5 : 1;

    return (
        <Box display="flex">
            <Box position="relative" width="50px">
                <svg width="50" height="32" viewBox="0 0 50 32" preserveAspectRatio="none" style={{ position: "absolute", opacity: topLineOpacity }}>
                    <line
                        x1="14"
                        y1="0"
                        x2="14"
                        y2="32"
                        stroke="white"
                        strokeWidth={2}
                        strokeDasharray={isHistoryLastItem ? 2 : 0} />
                </svg>

                <Box position="absolute" top={32} bottom={0}>
                    <svg width="50" height="100%" viewBox="0 0 50 10" preserveAspectRatio="none" style={{ position: "absolute" }}>
                        <rect
                            fill="white"
                            strokeWidth={0}
                            x={13}
                            width={2}
                            height={10} />
                    </svg>
                </Box>

                <svg width="50" height="100%" style={{ position: "absolute" }}>
                    <circle
                        fill="white"
                        stroke="#436c8a"
                        strokeWidth={2}
                        cx={14}
                        cy={32}
                        r={10} />
                </svg>
            </Box>
            <Box flex="1" pb={2} pt={2}>
                {children}
            </Box>
        </Box>
    );
};

const RenderStartMark = () => {
    return (
        <Box position="relative">
            <svg width="50" height="8" style={{ position: "absolute" }}>
                <rect
                    fill="white"
                    stroke="#436c8a"
                    strokeWidth={2}
                    x={4}
                    y={1}
                    width={20}
                    height={6} />
            </svg>
        </Box>
    );
};

const CvHistoryItem = ({ children, isHistoryLastItem=false, isHistoryStartMark=false }) => {
    if (!isHistoryStartMark) {
        return RenderItem(children, isHistoryLastItem);
    }
    else {
        return RenderStartMark();
    }
};

export { CvHistoryItem };