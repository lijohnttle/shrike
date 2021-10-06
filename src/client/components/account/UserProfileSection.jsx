import React, { useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';

const UserProfileSection = ({ data }) => {
    const [goodReadsUserId, setGoodReadsUserId] = useState(data.goodReadsUserId);

    const saveChanges = () => {
        
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