import { Button, Typography } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { queryData } from '../../../services/api';
import { useUserSession } from '../../../components/core/hooks';
import { useStyles } from './styles';
import { SectionHeader } from '../SectionHeader';
import { Delete as DeleteIcon, Refresh as RefreshIcon, ClearAll as ClearAllIcon } from '@mui/icons-material';


async function loadUserVisits(count, setUserVisits, accessToken) {
    try {
        const response = await queryData(`
            query {
                userVisits(numVisits: ${count}, accessToken: "${accessToken}") {
                    success
                    userVisits {
                        id
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
            throw new Error(data.errorMessage);
        }
    }
    catch (error) {
        console.error(error);
    }
}

const UserVisitsSection = () => {
    const [userVisits, setUserVisits] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [getUserSession] = useUserSession();
    const classes = useStyles();

    useEffect(() => {
        const session = getUserSession();

        if (session) {
            loadUserVisits(100, setUserVisits, session.token);
        }
    }, [])

    return (
        <div>
            <SectionHeader text="User Visits" />

            <div className={classes.toolbar}>
                <Button startIcon={<DeleteIcon />} variant="text">Delete</Button>
                <Button startIcon={<ClearAllIcon />} variant="text">Clear</Button>
                <Button startIcon={<RefreshIcon />} variant="text">Refresh</Button>
            </div>

            <div className={classes.tableContainer}>
                <DataGrid
                    columns={
                        [
                            {
                                field: 'path',
                                headerName: 'Path',
                                flex: 1,
                                sortable: false,
                            },
                            {
                                field: 'count',
                                headerName: 'Count',
                                width: 100,
                                sortable: false,
                            },
                            {
                                field: 'location',
                                headerName: 'Location',
                                flex: 1,
                                valueGetter: (params) => {
                                    const country = params.row.country;
                                    const city = params.row.city;
                        
                                    if (city && country) {
                                        return `${city}, ${country}`;
                                    }
                        
                                    if (country) {
                                        return `${country}`
                                    }
                        
                                    return 'Unknown';
                                },
                                sortable: false,
                            },
                            {
                                field: 'date',
                                headerName: 'Date',
                                flex: 1,
                                sortable: false,
                            },
                        ]
                    }
                    rows={userVisits}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 50, 100]}
                    checkboxSelection
                    paginationMode="client"
                    pagination
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)} />
            </div>
        </div>
    );
}


export { UserVisitsSection };
