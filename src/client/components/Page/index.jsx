import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useAuthenticated, useUserSession } from '../../hooks';
import { Navigate } from 'react-router';
import { pagesDescriptors } from '../../../static';
import { Box } from '@mui/system';


/**
 * @param {{ title: string, hideHeader: boolean, hideFooter: boolean, children: any }} 
 */
const Page = ({ title, hideHeader, hideFooter, authenticated, children }) => {
    const [getUserSession] = useUserSession();
    useAuthenticated(authenticated);

    useEffect(() => {
        document.title = title ? `${title} | lijohnttle` : 'lijohnttle';
    }, [title]);

    if (authenticated && !getUserSession()) {
        return <Navigate to={pagesDescriptors.SIGN_IN.path} />;
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh">
            {hideHeader !== true ? <Header light /> : null}

            <Box 
                display="flex"
                flexDirection="column"
                flex="1 1 auto">
                {children}
            </Box>

            {hideFooter !== true ? <Footer /> : null}
        </Box>
    );
};

Page.propTypes = {
    title: PropTypes.string,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    children: PropTypes.any
};


export {
    Page
};
