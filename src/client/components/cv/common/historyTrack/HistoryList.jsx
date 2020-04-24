import React from 'react';

const HistoryList = ({ children }) => {
    const childrenCount = React.Children.count(children);

    if (childrenCount == 0) {
        return null;
    }

    return (
        <div>
            {React.Children.map(children, (child, index) => (
                React.cloneElement(child, { isHistoryStart: index == childrenCount - 1, isHistoryEnd: index == 0 }))
            )}
        </div>
    );
};

export { HistoryList };