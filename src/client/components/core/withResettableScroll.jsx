import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { usePrevious } from "./hooks";

const withResettableScroll = (WrappedComponent) => {
    const ResettableNavigationContainer = (props) => {
        const {
            location: { pathname: currentPage }
        } = props;
        const previousPage =  usePrevious(currentPage);
        
        useEffect(() => {
            if (previousPage !== currentPage) {
                window.scrollTo(0, 0);
            }
        }, [currentPage]);

        return <WrappedComponent {...props} />;
    };

    return withRouter(ResettableNavigationContainer);
}

export {
    withResettableScroll
};
