import { Button } from '@mui/material';
import { Delete as DeleteIcon, Refresh as RefreshIcon, ClearAll as ClearAllIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useUserSession } from '../../../hooks';
import { useStyles } from './styles';
import { SectionHeader } from '../SectionHeader';
import { fetchUserVisits, deleteUserVisits, deleteAllUserVisits } from '../../../services/userVisitsApi';


const USER_VISIT_COUNT = 100;

export function SectionUserVisits() {
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
            await fetchUserVisits(USER_VISIT_COUNT, session.token, setUserVisits);
        }
    };

    const handleDelete = async () => {
        if (selectedUserVisitIds.length === 0) {
            return;
        }

        const session = getUserSession();

        if (session) {
            if (await deleteUserVisits(selectedUserVisitIds, session.token)) {
                await fetchUserVisits(USER_VISIT_COUNT, session.token, setUserVisits);
            }
        }
    };

    const handleClear = async () => {
        const session = getUserSession();

        if (session) {
            if (await deleteAllUserVisits(session.token)) {
                await fetchUserVisits(USER_VISIT_COUNT, session.token, setUserVisits);
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
