import { useCookies } from 'react-cookie';
import { cookieKeys } from '../../static.js';


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

    const getUserSession = () => {
        const username = cookies[cookieKeys.AUTH_USERNAME];
        const token = cookies[cookieKeys.AUTH_TOKEN];

        if (username && token) {
            return {
                username,
                token
            };
        }
        
        return null;
    };
    
    const setUserSession = (username, token) => {
        setCookie(cookieKeys.AUTH_USERNAME, username, { path: '/', maxAge: 31536000 });
        setCookie(cookieKeys.AUTH_TOKEN, token, { path: '/', maxAge: 31536000 });
    }

    const removeUserSession = () => {
        try {
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
