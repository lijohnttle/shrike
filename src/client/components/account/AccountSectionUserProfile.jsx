import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { queryData } from "../../services/api.js";
import { useUserSession } from '../core/hooks';

const AccountSectionUserProfile = ({ data }) => {
    const [getUserSession] = useUserSession();
    const [goodReadsUserId, setGoodReadsUserId] = useState(data?.goodReadsUserId || '');

    const saveChanges = async () => {
        const token = getUserSession().token;

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

export {
    AccountSectionUserProfile
};