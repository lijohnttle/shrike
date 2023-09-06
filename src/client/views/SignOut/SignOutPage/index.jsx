import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useUserSession } from '../../../hooks';
import { signOut } from '../../../services/securityService';


export function SignOutPage() {
    const [getUserSession, _, removeUserSession] = useUserSession();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userSession = getUserSession();

        if (userSession) {
            signOut(userSession.username, userSession.token)
                .then(() => {
                    removeUserSession();
                    navigate('/');
                })
                .catch(error => console.error(error));

            removeUserSession();

            navigate('/');
        }
    }, []);

    return <></>;
}