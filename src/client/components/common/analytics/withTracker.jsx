import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import usePrevious from '../hooks/usePrevious';

const withTracker = () => {
    const trackPage = (page) => {
        ReactGA.pageview(page);
    };

    return function(WrappedComponent) {
        const Tracker = (props) => {
            const {
                location: { pathname: currentPage }
            } = props;
            const previousPage =  usePrevious(currentPage);

            useEffect(() => {
                if (previousPage !== currentPage) {
                    trackPage(currentPage);
                }
            }, [currentPage]);
    
            return <WrappedComponent {...props} />;
        };
    
        return withRouter(Tracker);
    };
};

export default withTracker;