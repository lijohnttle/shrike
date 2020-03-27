import React from 'react';
import { CvHistoryItem } from './CvHistoryItem';

const CvHistoryList = ({ children }) => {
    return (
        <div>
            {children && React.Children.map(children, child => (
                <div>
                    {child}
                </div>
            ))}

            <CvHistoryItem isStartMark={true} />
        </div>
    );
};

export { CvHistoryList };