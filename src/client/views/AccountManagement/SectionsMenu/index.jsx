import React from 'react';
import { FormControl, InputLabel, MenuItem, MenuList, Select, TextField, useMediaQuery } from '@mui/material';
import { useStyles } from './styles.js';


const SectionsMenu = ({ options, selection, selectionChanged }) => {
    const classes = useStyles();
    const smallScreenMatches = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleNavigation = (id) => {
        selectionChanged(id);
    };

    return (
        <div className={classes.root}>
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
        </div>
    );
};


export {
    SectionsMenu
};
