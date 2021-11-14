import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import WelcomeSectionContent from './WelcomeSectionContent';


const useStyles = makeStyles(() => ({
    root: ({screenHeight}) => ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'black',
        background: 'url("/assets/images/welcome-background.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: `${screenHeight}px`
    }),
    childrenContainer: {
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        animation: '$fadeInFromNone ease-in 1000ms forwards',
    },
    '@keyframes fadeInFromNone': {
        '0%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        }
    },
}));

const WelcomeSection = ({ contacts, gotoNextSection, screenHeight }) => {
    const classes = useStyles({ screenHeight });

    return (
        <div className={classes.root}>
            <div className={classes.childrenContainer}>
                <WelcomeSectionContent
                    contacts={contacts}
                    gotoNextSection={gotoNextSection} />
            </div>
        </div>
    );
}

WelcomeSection.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        vendor: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })),
    gotoNextSection: PropTypes.func.isRequired
};

export default WelcomeSection;