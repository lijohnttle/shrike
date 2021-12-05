import { Button } from '@mui/material';
import { Delete as DeleteIcon, Refresh as RefreshIcon, ClearAll as ClearAllIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useUserSession } from '../../../hooks';
import { useStyles } from './styles';
import { SectionHeader } from '../SectionHeader';
import { fetchUserSessions, deleteUserSessions, deleteAllUserSessions } from '../../../services/userSessionsApi';


const UserSessionsSection = () => {
    const [userSessions, setUserSessions] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [selectedUserSessionIds, setSelectedUserSessionIds] = useState([]);
    const [getUserSession] = useUserSession();
    const classes = useStyles();

    useEffect(() => {
        handleRefresh();
    }, [])

    const handleRefresh = async () => {
        const session = getUserSession();

        if (session) {
            await fetchUserSessions(session.username, session.token, setUserSessions);
        }
    };

    const handleDelete = async () => {
        if (selectedUserSessionIds.length === 0) {
            return;
        }

        const session = getUserSession();

        if (session) {
            if (await deleteUserSessions(selectedUserSessionIds, session.token)) {
                await fetchUserSessions(session.username, session.token, setUserSessions);
            }
        }
    };

    const handleClear = async () => {
        const session = getUserSession();

        if (session) {
            if (await deleteAllUserSessions(session.token)) {
                await fetchUserSessions(session.username, session.token, setUserSessions);
            }
        }
    };

    return (
        <div>
            <SectionHeader text="User Sessions" />

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
                                field: 'id',
                                headerName: 'id',
                                flex: 1,
                                sortable: false,
                                minWidth: 100,
                            },
                            {
                                field: 'username',
                                headerName: 'Username',
                                flex: 1,
                                sortable: false,
                                minWidth: 100,
                            },
                            {
                                field: 'expired',
                                headerName: 'Expired',
                                flex: 1,
                                sortable: false,
                                minWidth: 100,
                            },
                            {
                                field: 'updatedOn',
                                headerName: 'Updated On',
                                flex: 1,
                                sortable: false,
                                minWidth: 250,
                            },
                        ]
                    }
                    rows={userSessions}
                    pageSize={pageSize}
                    rowsPerPageOptions={[10, 50, 100]}
                    checkboxSelection
                    paginationMode="client"
                    pagination
                    onPageSizeChange={(pageSize) => setPageSize(pageSize)}
                    onSelectionModelChange={(selection) => setSelectedUserSessionIds(selection)} />
            </div>
        </div>
    );
}


export { UserSessionsSection };
