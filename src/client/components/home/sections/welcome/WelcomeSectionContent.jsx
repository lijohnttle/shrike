import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import { ArrowDownwardRounded } from '@material-ui/icons'
import { Header, ContactLink } from '../../../common';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#000000af',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        color: theme.palette.primary.contrastText
    },
    headerContainer: {
        flex: '1 1 auto',
        alignSelf: 'stretch',
    },
    messageContainer: {
        paddingTop: theme.spacing(8),
        paddingRight: theme.spacing(16),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: '0 0 auto',
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(8),
            paddingLeft: theme.spacing(8),
        },
        [theme.breakpoints.down('sm')]: {
            paddingRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
        }
    },
    contactsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6),
    },
    buttonDarkTheme: {
        '&:hover': {
            background: '#59595996',
        }
    },
    contactIcon: {
        width: theme.typography.h1.fontSize,
        height: theme.typography.h1.fontSize,

        [theme.breakpoints.down('sm')]: {
            width: theme.typography.h2.fontSize,
            width: theme.typography.h2.fontSize,
        }
    },
    gotoNextSectionButtonContainer: {
        flex: '1 1 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gotoNextSectionIcon: {
        width: theme.typography.h1.fontSize,
        height: theme.typography.h1.fontSize,

        [theme.breakpoints.down('sm')]: {
            width: theme.typography.h2.fontSize,
            width: theme.typography.h2.fontSize,
        }
    },
}));

const WelcomeSectionContent = ({ contacts, gotoNextSection }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <Header transparent darkTheme />
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
                        <ContactLink key={contact.vendor} contact={contact} darkTheme iconClassName={classes.contactIcon} />
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

export default WelcomeSectionContent;