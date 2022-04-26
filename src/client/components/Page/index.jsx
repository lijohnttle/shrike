import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useUserSession } from '../../hooks';
import { Navigate, useNavigate } from 'react-router';
import { verifyAccessToken } from '../../services/security';
import { urlList } from '../../../static';
import { Box } from '@mui/system';


/**
 * @param {{ title: string, hideHeader: boolean, hideFooter: boolean, children: any }} 
 */
const Page = ({ title, hideHeader, hideFooter, authenticated, children }) => {
    const [getUserSession, _, removeUserSession] = useUserSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (authenticated) {
            const session = getUserSession();

            if (session) {
                verifyAccessToken(session.token, removeUserSession)
                    .then((verified) => {
                        if (!verified) {
                            removeUserSession();
                            navigate(urlList.SIGN_IN);
                        }
                    })
                    .catch((error) => console.error(error));
            }
        }
    }, []);

    useEffect(() => {
        document.title = title ? `${title} | lijohnttle` : 'lijohnttle';
    }, [title]);

    if (authenticated && !getUserSession()) {
        return <Navigate to={urlList.SIGN_IN} />;
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
