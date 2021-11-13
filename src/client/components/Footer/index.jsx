import React from 'react';
import { Container, Typography } from '@mui/material';
import { withData } from '../core/withData';
import ContactLink from '../common/ContactLink';
import { useStyles } from './styles';


let Footer = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.content}>
                    <Typography variant="caption" align="center">
                        {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
                    </Typography>

                    <div className={classes.contactList}>
                        {data.contacts.map((contact) => <ContactLink key={contact.vendor} contact={contact} dark />)}
                    </div>
                </div>
            </Container>
        </div>
    );
};

Footer = withData(Footer);


export {
    Footer
};
