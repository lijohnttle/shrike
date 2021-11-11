import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { queryData } from '../../services/api';
import { useStyles } from './AccountSectionDiagnostics.styles';


async function loadUserVisits(setUserVisits) {
    try {
        const response = await queryData(`
            query {
                userVisits(numVisits: ${100}) {
                    path
                    country
                    city
                    count
                    date
                }
            }
        `);

        setUserVisits(response.userVisits || []);
    }
    catch (error) {
        console.error(error);
    }
}

const AccountSectionDiagnostics = () => {
    const [userVisits, setUserVisits] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        loadUserVisits(setUserVisits);
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
