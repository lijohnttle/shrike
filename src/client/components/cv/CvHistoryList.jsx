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
            
            {React.Children.count(children) > 0
                ? <CvHistoryItem isHistoryStartMark={true} />
                : null}
        </div>
    );
};

export { CvHistoryList };