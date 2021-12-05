import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { queryData } from "../../../services/api.js";
import { useUserSession } from '../../../hooks';
import { SectionHeader } from '../SectionHeader/index.jsx';
import { useStyles } from './styles';


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
    const classes = useStyles();

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
            <SectionHeader text="User Profile" />

            <form className={classes.form}>
                <div className={classes.fieldContainer}>
                    <TextField
                        label="GoodReads User Id"
                        defaultValue={goodReadsUserId}
                        onChange={e => setUsername(e.target.value)} />
                </div>
                
                <div className={classes.commandContainer}>
                    <Button color="primary" variant="contained" onClick={saveChanges}>Save</Button>
                </div>
            </form>
        </div>
    );
};


export {
    UserProfileSection
};
