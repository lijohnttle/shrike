import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { queryData } from '../../../services/api';
import { useUserSession } from '../../../components/hooks';
import { useStyles } from './styles';
import { SectionHeader } from '../SectionHeader';
import { Delete as DeleteIcon, Refresh as RefreshIcon, ClearAll as ClearAllIcon } from '@mui/icons-material';


const USER_VISIT_COUNT = 100;

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

async function clearAllUserVisits(accessToken) {
    try {
        const response = await queryData(`
            mutation {
                clearAllUserVisits(accessToken: "${accessToken}")
            }
        `);

        return !!response.clearAllUserVisits;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

async function deleteUserVisits(userVisitIds, accessToken) {
    if (userVisitIds.lentgh === 0) {
        return false;
    }

    try {
        const response = await queryData(`
            mutation {
                deleteUserVisits(userVisitIds: [${userVisitIds.map(id => `"${id}"`).join()}], accessToken: "${accessToken}")
            }
        `);

        return !!response.deleteUserVisits;
    }
    catch (error) {
        console.error(error);

        return false;
    }
}

const UserVisitsSection = () => {
    const [userVisits, setUserVisits] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [selectedUserVisitIds, setSelectedUserVisitIds] = useState([]);
    const [getUserSession] = useUserSession();
    const classes = useStyles();

    useEffect(() => {
        handleRefresh();
    }, [])

    const handleRefresh = async () => {
        const session = getUserSession();

        if (session) {
            await loadUserVisits(USER_VISIT_COUNT, setUserVisits, session.token);
        }
    };

    const handleDelete = async () => {
        if (selectedUserVisitIds.length === 0) {
            return;
        }

        const session = getUserSession();

        if (session) {
            if (await deleteUserVisits(selectedUserVisitIds, session.token)) {
                await loadUserVisits(USER_VISIT_COUNT, setUserVisits, session.token);
            }
        }
    };

    const handleClear = async () => {
        const session = getUserSession();

        if (session) {
            if (await clearAllUserVisits(session.token)) {
                await loadUserVisits(USER_VISIT_COUNT, setUserVisits, session.token);
            }
        }
    };

    return (
        <div>
            <SectionHeader text="User Visits" />

            <div className={classes.toolbar}>
                <Button startIcon={<DeleteIcon />} onClick={handleDelete}>Delete</Button>
                <Button startIcon={<ClearAllIcon />} onClick={handleClear}>Clear All</Button>
                <Button startIcon={<RefreshIcon />} onClick={handleRefresh}>Refresh</Button>
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
                                minWidth: 100,
                            },
                            {
                                field: 'count',
                                headerName: 'Count',
                                width: 60,
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
                                minWidth: 200,
                            },
                            {
                                field: 'date',
                                headerName: 'Date',
                                flex: 1,
                                sortable: false,
                                minWidth: 250,
                            },
                        ]
                    }
                    rows={userVisits}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 50, 100]}
                    checkboxSelection
                    paginationMode="client"
                    pagination
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                    onSelectionModelChange={(selection) => setSelectedUserVisitIds(selection)} />
            </div>
        </div>
    );
}


export { UserVisitsSection };
