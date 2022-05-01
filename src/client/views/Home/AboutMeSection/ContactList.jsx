import React from 'react';
import { Box } from '@mui/system';
import { ContactLink } from '../../../components';

export const ContactList = ({ contacts }) => (
    <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        paddingBottom={1}
        paddingTop={1}>
        {contacts.filter(c => c.types.some(ct => ct === 'social')).map(
            contact => <ContactLink key={contact.vendor} contact={contact} fontSize="large" />)}
    </Box>
);