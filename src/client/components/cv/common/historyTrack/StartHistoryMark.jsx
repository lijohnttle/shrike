import React from 'react';

const StartHistoryMark = ({ color }) => {
    return (
        <div style={{ position: 'relative' }}>
            <svg width="50" height="10" style={{ position: 'absolute' }}>
                <rect
                    fill={color}
                    stroke="white"
                    strokeWidth={4}
                    x={4}
                    y={2}
                    width={20}
                    height={8} />
            </svg>
        </div>
    );
};

export { StartHistoryMark };