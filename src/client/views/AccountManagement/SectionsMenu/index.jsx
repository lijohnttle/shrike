import React, { useState } from 'react';
import { List, ListItem, ListItemText, Menu, MenuItem, MenuList, useMediaQuery } from '@mui/material';
import { useStyles } from './styles.js';


const SectionsMenu = ({ options, selection, selectionChanged }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const smallScreenMatches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

    const open = Boolean(anchorEl);
    
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (id) => {
        selectionChanged(id);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (smallScreenMatches) {
        return (
            <div className={classes.root}>
                <List
                    component="nav"
                    aria-label="Account management section">
                    <ListItem
                        button
                        aria-haspopup="listbox"
                        aria-label="Account management section"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}>
                        <ListItemText primary={options.find((option) => option.id === selection)?.header} />
                    </ListItem>
                </List>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        role: 'listbox',
                    }}
                    >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            selected={option.id === selection}
                            onClick={() => handleMenuItemClick(option.id)}>
                            {option.header}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <MenuList>
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        selected={option.id === selection}
                        onClick={() => handleMenuItemClick(option.id)}>
                        {option.header}
                    </MenuItem>
                ))}
            </MenuList>
        </div>
    );
};


export {
    SectionsMenu
};
