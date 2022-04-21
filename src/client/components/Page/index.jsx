import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useStyles } from './styles';
import { useUserSession } from '../../hooks';
import { Navigate, useNavigate } from 'react-router';
import { verifyAccessToken } from '../../services/security';
import { urlList } from '../../../static';


class PageOptions {
    constructor() {
        /** @type {string} */
        this.title = '';
    }
}

/**
 * @param {{ title: string, hideHeader: boolean, hideFooter: boolean, children: any }} 
 */
const Page = ({ title, hideHeader, hideFooter, authenticated, children }) => {
    const classes = useStyles();
    const [getUserSession, _, removeUserSession] = useUserSession();
    const history = useNavigate();

    useEffect(() => {
        if (authenticated) {
            const session = getUserSession();

            if (session) {
                verifyAccessToken(session.token, removeUserSession)
                    .then((verified) => {
                        if (!verified) {
                            removeUserSession();
                            history.push(urlList.SIGN_IN);
                        }
                    })
                    .catch((error) => console.error(error));
            }
        }
    }, []);

    useEffect(() => {
        document.title = title ? `lijohnttle - ${title}` : 'lijohnttle';
    }, [title]);

    if (authenticated && !getUserSession()) {
        return <Navigate to={urlList.SIGN_IN} />;
    }

    return (
        <div className={classes.root}>
            {hideHeader !== true ? <Header light /> : null}

            <div className={classes.pageContent}>
                {children}
            </div>

            {hideFooter !== true ? <Footer /> : null}
        </div>
    );
};

Page.propTypes = {
    title: PropTypes.string,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    children: PropTypes.any
};


export {
    PageOptions,
    Page
};
