import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { urlList } from '../../static';
import { verifyAccessToken } from '../services/securityService';
import { useUserSession } from './useUserSession';

export function useAuthenticated(authenticated) {
    const navigate = useNavigate();
    const [getUserSession, _, removeUserSession] = useUserSession();

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
            else {
                navigate(urlList.SIGN_IN);
            }
        }
    }, [authenticated]);
}