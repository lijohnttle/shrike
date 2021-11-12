import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { queryData } from '../../services/api';
import { useUserSession } from '../core/hooks';
import { useStyles } from './AccountSectionDiagnostics.styles';


async function loadUserVisits(setUserVisits, accessToken) {
    try {
        const response = await queryData(`
            query {
                userVisits(numVisits: ${100}, accessToken: "${accessToken}") {
                    success
                    userVisits {
                        path
                        country
                        city
                        count
                        date
                    }
                    errorMessage
                }
            }
        `);

        const data = response.userVisits;

        if (data.success) {
            setUserVisits(data.userVisits || []);
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

const AccountSectionDiagnostics = () => {
    const [userVisits, setUserVisits] = useState([]);
    const [getUserSession] = useUserSession();
    const classes = useStyles();

    useEffect(() => {
        const session = getUserSession();

        if (session) {
            loadUserVisits(setUserVisits, session.token);
        }
    }, [])

    return (
        <div>
            {userVisits.map((visit, i) => (
                <div key={i} className={classes.userVisitRoot}>
                    <Typography variant="body1">
                        Path: {visit.path}
                    </Typography>
                    <Typography variant="body1">
                        Count: {visit.count}
                    </Typography>
                    <Typography variant="body1">
                        Country: {visit.country}
                    </Typography>
                    <Typography variant="body1">
                        City: {visit.city}
                    </Typography>
                    <Typography variant="body1">
                        Date: {visit.date}
                    </Typography>
                </div>
            ))}
        </div>
    );
}


export { AccountSectionDiagnostics };
