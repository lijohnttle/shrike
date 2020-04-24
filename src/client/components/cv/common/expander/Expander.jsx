import React from 'react';

const Expander = ({ children }) => {
    const [isExpanded, toggle] = React.useState(false);

    return (
        <div>
            {React.Children.map(children, child => React.cloneElement(child, { isExpanded, toggle: () => toggle(!isExpanded) }))}
        </div>
    );
};

export { Expander };