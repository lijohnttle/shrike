import React from 'react';
import ExtCookieConsent from 'react-cookie-consent';


const CookieConsent = () => {
    return (
        <ExtCookieConsent>
            This website uses cookies to enhance the user experience.
        </ExtCookieConsent>
    );
};


export {
    CookieConsent
};
