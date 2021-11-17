import React from 'react';
import PropTypes from 'prop-types';
import { WelcomeSectionContent } from '../WelcomeSectionContent';
import { useStyles } from './styles';


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


export {
    WelcomeSection
};
