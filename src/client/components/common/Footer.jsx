import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { withData } from '../core';
import ContactLink from './ContactLink';

const useStyles = makeStyles((theme) => ({
    root: {
        background: '#313131',
        color: 'white',
        marginTop: 'auto',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
    content: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'space-around',

        [theme.breakpoints.down('xs')]: {
            flexFlow: 'column nowrap',
        },
    },
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
    },
}));

const Footer = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container className={classes.content} maxWidth="lg">
                <Typography variant="caption" align="center">
                    {`​© ${new Date().getFullYear()} by Ivan Cherkasov`}
                </Typography>

                <div className={classes.contactList}>
                    {data.contacts.map((contact) => <ContactLink key={contact.vendor} contact={contact} darkTheme />)}
                </div>
            </Container>
        </div>
    );
};

export default withData(Footer);