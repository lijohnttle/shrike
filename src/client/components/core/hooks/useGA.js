import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';
import { usePrevious } from './usePrevious.js';


const useGA = () => {
    const currentPage = useLocation().pathname;
    const previousPage = usePrevious(currentPage);

    useEffect(() => {
        if (previousPage !== currentPage) {
            if (process.env.NODE_ENV === 'production') {
                ReactGA.pageview(currentPage);
            }
        }
    }, [currentPage]);
}


export {
    useGA
};
