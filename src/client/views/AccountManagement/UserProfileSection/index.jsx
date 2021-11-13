import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, Input, InputLabel, Typography } from '@mui/material';
import { queryData } from "../../../services/api.js";
import { useUserSession } from '../../../components/core/hooks';
import { SectionHeader } from '../SectionHeader/index.jsx';


async function loadUserProfile() {
    try {
        const response = await queryData(`
            query {
                userProfile {
                    success
                    userProfile {
                        goodReadsUserId
                    }
                    errorMessage
                }
            }
        `);

        const data = response.userProfile;

        if (data.success) {
            return data.userProfile;
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

const UserProfileSection = () => {
    const [getUserSession] = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [goodReadsUserId, setGoodReadsUserId] = useState('');

    useEffect(() => {
        let isMounted = true;

        loadUserProfile(setGoodReadsUserId)
            .then((data) => {
                if (isMounted && data) {
                    setGoodReadsUserId(data.goodReadsUserId);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false)
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const saveChanges = async () => {
        const accessToken = getUserSession().token;

        await queryData(`
            mutation {
                saveUserProfile(userProfile: {
                    goodReadsUserId: "${goodReadsUserId}"
                }, accessToken: "${accessToken}")
            }`
        );
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <div>
            <SectionHeader text="User Visits" />

            <FormControl>
                <InputLabel htmlFor="goodreads_user_id">GoodReads Uesr Id</InputLabel>
                <Input
                    id="goodreads_user_id"
                    aria-describedby="GoodReads User Id"
                    value={goodReadsUserId}
                    onChange={e => setGoodReadsUserId(e.target.value)} />
                
                <Button color="primary" onClick={saveChanges}>Save</Button>
            </FormControl>
        </div>
    );
};


export {
    UserProfileSection
};
