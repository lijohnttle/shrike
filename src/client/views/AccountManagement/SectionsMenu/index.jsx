import React from 'react';
import { FormControl, MenuItem, MenuList, Select, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';


const SectionsMenuWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    marginRight: theme.spacing(4),
    minWidth: '200px',

    [theme.breakpoints.down('md')]: {
        marginRight: 'unset',
        marginBottom: theme.spacing(4),
    },
}));

const SectionsMenu = ({ options, selection, selectionChanged }) => {
    const smallScreenMatches = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleNavigation = (id) => {
        selectionChanged(id);
    };

    return (
        <SectionsMenuWrapper>
            {smallScreenMatches ? (
                <FormControl variant="standard">
                    <Select
                        labelId="page-nav-menu-label"
                        value={selection}
                        label="Menu"
                        onChange={(e) => handleNavigation(e.target.value)}>
                        {options.map((option) => <MenuItem key={option.id} value={option.id}>{option.header}</MenuItem>)}
                    </Select>
                </FormControl>
            ) : null}

            {!smallScreenMatches ? (
                <MenuList>
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            selected={option.id === selection}
                            onClick={() => handleNavigation(option.id)}>
                            {option.header}
                        </MenuItem>
                    ))}
                </MenuList>
            ) : null}
        </SectionsMenuWrapper>
    );
};


export {
    SectionsMenu
};
