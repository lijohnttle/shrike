import React from 'react';
import { Container, Typography } from '@mui/material';
import { ContactLink } from '../ContactLink';
import { useData } from '../../hooks';
import { useStyles } from './styles';


const Footer = () => {
    const classes = useStyles();
    const data = useData();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.content}>
                    <Typography variant="caption" align="center">
                        {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
                    </Typography>

                    <div className={classes.contactList}>
                        {data.contacts.filter((contact) => contact.types.some((type) => type === 'social'))
                            .map((contact) => <ContactLink key={contact.vendor} contact={contact} dark />)}
                    </div>
                </div>
            </Container>
        </div>
    );
};


export {
    Footer
};
