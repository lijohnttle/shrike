import React from 'react';
import ExtCookieConsent from 'react-cookie-consent';

const CookieConsent = () => {
    return (
        <ExtCookieConsent>
            <div>
                This website uses cookies to enhance the user experience.
            </div>
        </ExtCookieConsent>
    );
};

export default CookieConsent;