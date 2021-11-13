import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';
import { getCookieConsentValue } from "react-cookie-consent";
import { queryData } from '../../../services/api.js';
import { usePrevious } from './usePrevious.js';
import { useUserSession } from './useUserSession.js';


async function recordUserVisit(path) {
    try {
        await queryData(`
            mutation {
                recordUserVisit(userVisit: {
                        path: "${path}"
                    })
            }
        `);
    }
    catch (error) {
        console.error(error);
    }
}


/**
 * @param {Object} options 
 * @param {String} currentPath 
 * @returns {Boolean}
 */
function verifyPath(options, currentPath) {
    if (!currentPath || !options) {
        return false;
    }

    /** @type {Array} */
    const ignorePaths = options.ignorePaths;

    if (ignorePaths) {
        if (ignorePaths.some(path => currentPath.startsWith(path))) {
            return false;
        }
    }

    return true;
}

const useUserVisitStatistics = (options) => {
    const currentPage = useLocation().pathname;
    const previousPage = usePrevious(currentPage);
    const [getUserSession] = useUserSession();

    useEffect(() => {
        if (!getUserSession()) {
            const consentAccepted = !!getCookieConsentValue();

            if (previousPage !== currentPage && verifyPath(options, currentPage)) {
                if (consentAccepted && process.env.NODE_ENV === 'production') {
                    ReactGA.pageview(currentPage);
                }
    
                recordUserVisit(currentPage);
            }
        }
    }, [currentPage]);
}


export {
    useUserVisitStatistics
};
