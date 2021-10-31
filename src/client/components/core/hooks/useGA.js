import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';
import { usePrevious } from './usePrevious.js';


const trackPage = (page) => {
    if (process.env.NODE_ENV === 'production') {
        ReactGA.pageview(page);
    }
};

const useGA = () => {
    const currentPage = useLocation().pathname;
    const previousPage = usePrevious(currentPage);

    useEffect(() => {
        // Track page view
        if (previousPage !== currentPage) {
            trackPage(currentPage);
        }
    }, [currentPage]);
}


export {
    useGA
};
