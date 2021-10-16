import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import { usePrevious } from "../hooks";

export const withGA = (WrappedComponent) => {
    const trackPage = (page) => {
        if (process.env.NODE_ENV === 'production') {
            ReactGA.pageview(page);
        }
    };

    const AnalyticsTracker = (props) => {
        const {
            location: { pathname: currentPage }
        } = props;
        const previousPage =  usePrevious(currentPage);

        useEffect(() => {
            // Track page view
            if (previousPage !== currentPage) {
                trackPage(currentPage);
            }
        }, [currentPage]);

        return <WrappedComponent {...props} />;
    };

    return withRouter(AnalyticsTracker);
};
