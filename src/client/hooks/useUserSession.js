import { useRef } from 'react';
import { useCookies } from 'react-cookie';
import { cookieKeys } from '../../static.js';
import { UserSessionModel } from '../models/UserSessionModel.js';


/**
 * @callback getUserSession
 * @returns {{ username: string, token: string }} responseMessage
 */

/**
 * @callback setUserSession
 * @param {string} username
 * @param {string} token
 */

/**
 * @callback removeUserSession
 */

/**
 * @returns {[getUserSession: getUserSession, setUserSession: setUserSession, removeUserSession: removeUserSession]}
 */
const useUserSession = () => {
    const [cookies, setCookie, removeCookie] = useCookies([cookieKeys.AUTH_USERNAME, cookieKeys.AUTH_TOKEN]);
    /** @type {import('react').MutableRefObject<UserSessionModel>} */
    const userSessionRef = useRef();

    const getUserSession = () => {
        const username = cookies[cookieKeys.AUTH_USERNAME];
        const token = cookies[cookieKeys.AUTH_TOKEN];

        if (username && token) {
            if (!userSessionRef.current ||
                userSessionRef.current.username !== username ||
                userSessionRef.current.token !== token) {
                    userSessionRef.current = {
                    username,
                    token
                };
            }

            return userSessionRef.current;
        }

        userSessionRef.current = null;
        
        return null;
    };
    
    const setUserSession = (username, token) => {
        setCookie(cookieKeys.AUTH_USERNAME, username, { path: '/', maxAge: 31536000 });
        setCookie(cookieKeys.AUTH_TOKEN, token, { path: '/', maxAge: 31536000 });

        userSessionRef.current = {
            username,
            token
        };
    }

    const removeUserSession = () => {
        try {
            userSessionRef.current = null;

            removeCookie(cookieKeys.AUTH_USERNAME, { path: '/' });
            removeCookie(cookieKeys.AUTH_TOKEN, { path: '/' });
        }
        catch { }
    };
    
    return [
        getUserSession,
        setUserSession,
        removeUserSession
    ];
}

export {
    useUserSession
};
