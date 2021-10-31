import { useEffect } from "react";
import { useLocation } from 'react-router';
import { usePrevious } from './usePrevious.js';


const usePageScroll = () => {
    const currentPage = useLocation().pathname;
    const previousPage = usePrevious(currentPage);

    useEffect(() => {
        if (previousPage !== currentPage) {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);
}


export {
    usePageScroll
};
