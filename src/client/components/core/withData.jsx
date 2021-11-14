import React from 'react';
import data from '../../data';

const withData = (WrappedComponent) => {
    const ClientDataContainer = (props) => (
        <WrappedComponent data={data} {...props} />
    );

    return ClientDataContainer;
};

export {
    withData
};
