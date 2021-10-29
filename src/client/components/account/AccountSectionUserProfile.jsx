import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import cookieKeys from '../../cookieKeys.js';
import { queryData } from "../../services/api.js";

const UserProfileSection = ({ data }) => {
    const [cookies] = useCookies([cookieKeys.AUTH_TOKEN]);
    const [goodReadsUserId, setGoodReadsUserId] = useState(data?.goodReadsUserId || '');

    const saveChanges = async () => {
        const token = cookies[cookieKeys.AUTH_TOKEN];

        await queryData(`
            mutation {
                saveUserProfile(userProfile: {
                    goodReadsUserId: "${goodReadsUserId}"
                }, token: "${token}")
            }`
        );
    };

    return (
        <div>
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

export default UserProfileSection;