import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@mui/material';
import { ArrowDownwardRounded } from '@mui/icons-material'
import { ContactLink } from '../../../components/ContactLink';
import { Header } from '../../../components/Header';
import { useStyles } from './styles';


const WelcomeSectionContent = ({ contacts, gotoNextSection }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <Header transparent dark />
            </div>

            <div className={classes.messageContainer}>
                <Typography paragraph variant="h1" align="center">
                    Welcome!
                </Typography>
                <Typography paragraph variant="h2" align="center">
                    My name is Ivan Cherkasov
                </Typography>
                <Typography paragraph variant="h3" align="center">
                    I am a Software Engineer
                </Typography>

                <div className={classes.contactsContainer}>
                    {contacts.map(contact => (
                        <ContactLink key={contact.vendor} contact={contact} dark fontSize="large" />
                    ))}
                </div>
            </div>

            <div className={classes.gotoNextSectionButtonContainer}>
                <IconButton className={classes.buttonDarkTheme} onClick={gotoNextSection} color="inherit">
                    <ArrowDownwardRounded className={classes.gotoNextSectionIcon} />
                </IconButton>
            </div>
        </div>
    );
};

WelcomeSectionContent.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    gotoNextSection: PropTypes.func.isRequired
};

export {
    WelcomeSectionContent
};
