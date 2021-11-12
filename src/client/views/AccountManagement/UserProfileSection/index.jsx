import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, Input, InputLabel, Typography } from '@material-ui/core';
import { queryData } from "../../../services/api.js";
import { useUserSession } from '../../../components/core/hooks';
import { SectionHeader } from '../SectionHeader/index.jsx';


async function loadUserProfile(setGoodReadsUserId) {
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
            setGoodReadsUserId(data.userProfile.goodReadsUserId);
        }
        else {
            console.log(data.errorMessage);
            throw new Error(data.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }
}

const UserProfileSection = () => {
    const [getUserSession] = useUserSession();
    const [isLoading, setIsLoading] = useState(true);
    const [goodReadsUserId, setGoodReadsUserId] = useState('');

    useEffect(() => {
        loadUserProfile(setGoodReadsUserId).finally(() => setIsLoading(false));
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
