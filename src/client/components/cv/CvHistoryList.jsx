import React from 'react';
import { CvHistoryItem } from './CvHistoryItem';

const CvHistoryList = ({ children }) => {
    return (
        <div>
            {children && React.Children.map(children, (child, index) => (
                <CvHistoryItem isHistoryLastItem={index == 0}>
                    {child}
                </CvHistoryItem>
            ))}

            <CvHistoryItem isHistoryStartMark={true} />
        </div>
    );
};

export { CvHistoryList };