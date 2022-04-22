import React from 'react';
import PropTypes from 'prop-types';
import { Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material'
import { ContactLink } from '../../../components/ContactLink';
import { Header } from '../../../components/Header';
import { styled } from '@mui/system';


const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    background: '#000000af',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    color: theme.palette.primary.contrastText,
}));

const HeaderContainer = styled('div')(() => ({
    flex: '1 1 auto',
    alignSelf: 'stretch',
}));

const ContentContainer = styled('div')(({ theme }) => ({
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
    },

    '& .contactList': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(6),
    },
}));

const NextSectionButtonContainer = styled('div')(({ theme }) => ({
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));


const WelcomeSectionContent = ({ contacts, gotoNextSection }) => {
    return (
        <Root>
            <HeaderContainer>
                <Header transparent dark />
            </HeaderContainer>

            <ContentContainer>
                <Typography paragraph variant="h1" align="center">
                    Welcome!
                </Typography>
                <Typography paragraph variant="h2" align="center">
                    My name is Ivan Cherkasov
                </Typography>
                <Typography paragraph variant="h3" align="center">
                    I am a Software Engineer
                </Typography>

                <div className="contactList">
                    {contacts.filter(c => c.types.some(ct => ct === 'social')).map(contact => (
                        <ContactLink key={contact.vendor} contact={contact} dark fontSize="large" />
                    ))}
                </div>
            </ContentContainer>

            <NextSectionButtonContainer className="nextSectionButtonContainer">
                <IconButton
                    onClick={gotoNextSection}
                    color="inherit"
                    sx={{
                        '&:hover': {
                            background: '#59595996',
                        }
                    }}>
                    <KeyboardArrowDown fontSize="large" />
                </IconButton>
            </NextSectionButtonContainer>
        </Root>
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
