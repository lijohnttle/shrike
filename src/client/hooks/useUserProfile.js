import { useEffect, useState } from "react";
import { graphqlRequest } from '../services/api.js';
import { UserProfileDto } from '../../contracts/users/UserProfileDto.js';
import { useUserSession } from "./index.jsx";


async function fetchUserProfile() {
    try {
        const response = await graphqlRequest(`
            query {
                userProfile {
                    success
                    userProfile {
                        goodReadsUserId
                        greetingsHeader
                        greetingsText
                        summary
                    }
                    errorMessage
                }
            }
        `);

        const data = response.userProfile;

        if (data.success) {
            return new UserProfileDto(data.userProfile);
        }
        else {
            throw new Error(data.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }

    return null;
}

/**
 * @param {UserProfileDto} userProfile 
 * @param {import("./useUserSession.js").getUserSession} getUserSession 
 */
const saveUserProfile = async (userProfile, getUserSession) => {
    const userToken = getUserSession().token;

    await graphqlRequest(`
        mutation(
            $userProfile: UserProfileInput!,
            $userToken: String!
        ) {
            saveUserProfile(userProfile: $userProfile, userToken: $userToken)
        }`,
        {
            userProfile,
            userToken
        }
    );
};

/**
 * @returns {{userProfile: UserProfileDto, isFetching: boolean, save: Promise}}
 */
const useUserProfile = () => {
    /** @type {[UserProfileDto, Function]} */
    const [userProfile, setUserProfile] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [getUserSession] = useUserSession();

    useEffect(() => {
        fetchUserProfile()
            .then(data => setUserProfile(data))
            .finally(() => setIsFetching(false));
    }, []);

    return {
        userProfile,
        isFetching,
        saveUserProfile: async (userProfile) => await saveUserProfile(userProfile, getUserSession)
    };
}


export {
    useUserProfile
};
