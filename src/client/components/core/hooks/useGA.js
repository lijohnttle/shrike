import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useLocation } from 'react-router';
import { getCookieConsentValue } from "react-cookie-consent";
import axios from 'axios';
import { queryData } from '../../../services/api.js';
import { usePrevious } from './usePrevious.js';


async function recordUserVisit(path, consentAccepted) {
    let country = '';
    let city = '';

    if (consentAccepted) {
        try {
            const locationResponse = await axios
                .get('http://ip-api.com/json');

            if (locationResponse.data.status === 'success') {
                country = locationResponse.data.country;
                city = locationResponse.data.city;
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    try {
        await queryData(`
            mutation {
                recordUserVisit(userVisit: {
                        path: "${path}",
                        country: "${country}",
                        city: "${city}",
                        consentAccepted: ${consentAccepted}
                    })
            }
        `);
    }
    catch (error) {
        console.error(error);
    }
}


const useGA = () => {
    const currentPage = useLocation().pathname;
    const previousPage = usePrevious(currentPage);

    useEffect(() => {
        const consentAccepted = !!getCookieConsentValue();

        if (previousPage !== currentPage) {
            if (consentAccepted && process.env.NODE_ENV === 'production') {
                ReactGA.pageview(currentPage);
            }

            recordUserVisit(currentPage, consentAccepted);
        }
    }, [currentPage]);
}


export {
    useGA
};
