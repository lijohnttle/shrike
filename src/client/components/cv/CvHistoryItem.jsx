import React from 'react';
import { Box } from '@material-ui/core';

const CvHistoryItem = ({ children, isStartMark=false }) => {
    if (!isStartMark) {
        return (
            <Box display="flex">
                <Box position="relative" width="50px">
                    <Box position="absolute" top="18px" bottom="0px">
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
                            cy={18}
                            r={10} />
                    </svg>
                </Box>
                <Box flex="1">
                    {!isStartMark && children}
                </Box>
            </Box>
        );
    }
    else {
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
    }
};

export { CvHistoryItem };