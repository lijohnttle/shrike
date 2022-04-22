import React from 'react';
import { Facebook, LinkedIn, Email, Instagram, GitHub, Link as LinkIcon, Web } from '@mui/icons-material'
import { IconButton } from '@mui/material';
import { buildUrlByVendor } from '../../utils/links';


/**
 * Creates an icon element according to the vendor's name.
 * @param {String} vendor Vendor's name.
 * @returns {import('react').ReactElement} 
 */
 function createIconByVendor(vendor, fontSize) {
    switch (vendor) {
        case 'facebook':
            return <Facebook fontSize={fontSize} />
        case 'instagram':
            return <Instagram fontSize={fontSize} />
        case 'linkedin':
            return <LinkedIn fontSize={fontSize} />
        case 'github':
            return <GitHub fontSize={fontSize} />
        case 'web':
            return <Web fontSize={fontSize} />
        case 'email':
            return <Email fontSize={fontSize} />
        default:
            return <LinkIcon fontSize={fontSize} />;
    }
}

export const ContactLink = ({ contact, dark, fontSize }) => (
    <IconButton
        sx={{
            '&:hover': {
                background: dark ? '#ffffff33 !important' : '#99999940 !important',
            }
        }}
        href={buildUrlByVendor(contact.vendor, contact.value)}
        color="inherit"
        target="_blank">
        {createIconByVendor(contact.vendor, fontSize || 'inherit')}
    </IconButton>
);
