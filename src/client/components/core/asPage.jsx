import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import { usePrevious } from './hooks';

const asPage = (WrappedComponent, options) => {
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

        // Update page title
        if (options?.title) {
            useEffect(() => {
                document.title = `lijohnttle - ${options.title}`;
            }, []);
        }

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

export default asPage;