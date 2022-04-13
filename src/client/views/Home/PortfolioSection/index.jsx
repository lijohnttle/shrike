import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components/ContactLink';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';


const projects = [
    {
        name: 'Personal Website',
        description: 'My personal web-site.',
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/personal-website',
            },
            {
                vendor: 'web',
                value: 'https://www.lijohnttle.com/',
            },
        ],
    },
    {
        name: 'Habit Tracker',
        description: 'A mobile application for tracking habits.',
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/habit-tracker',
            },
        ],
    },
];

const renderSubHeader = (header, classes) => {
    return (
        <div className={classes.subHeader}>
            <Typography variant="h2" textAlign="center">
                {header}
            </Typography>
        </div>
    );
};

const PortfolioSection = ({ contacts, screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles({ screenHeight });

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionContentContainer
            title="Portfolio"
            isLoading={isLoading}
            className={classes.root}
            contentRootClassName={classes.contentRoot}
            maxWidth="md"
            canScrollToNextSection={!isLastSection}>

            <div className={classes.summary}>
                <Typography textAlign="justify" gutterBottom>
                    I am a Senior Software Engineer with extensive experience in web/mobile/desktop software development.
                    Currently I am open to new opportunities, please feel free to contact me regarding any projects you have.
                </Typography>
            </div>
            
            {renderSubHeader('VALUES', classes)}

            <picture className={classes.coreValuesContainer}>
                <source media="(min-width: 700px)" type="image/jpeg" srcSet="/assets/images/core_values.png" />
                <source type="image/jpeg" srcSet="/assets/images/core_values_sm.png" />
                <img src="/assets/images/core_values.png" alt="" className={classes.coreValuesPicture} />
            </picture>

            {renderSubHeader('CONTACTS', classes)}

            <div className={classes.businessContacts}>
                {contacts.filter(c => c.types.some(t => t === 'business')).map(
                    contact => <ContactLink key={contact.vendor} contact={contact} fontSize="large" />)}
            </div>

            {renderSubHeader('SIDE PROJECTS', classes)}

            <div className={classes.projectList}>
                {projects.map((project) => {
                    return (
                        <div key={project.name} className={classes.projectWrapper}>
                            <div className={classes.project}>
                                <div className={classes.projectContent}>
                                    <div className={classes.projectTopPanel}>
                                        <div className={classes.projectTitle}>
                                            <Typography variant="h5" align="justify">
                                                {project.name.toUpperCase()}
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography variant="caption" align="justify">
                                        {project.description}
                                    </Typography>
                                </div>

                                <div className={classes.projectBottomPanel}>
                                    {project.links.map((link) => <ContactLink key={link.value} contact={link} fontSize="medium" />)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </SectionContentContainer>
    );
};


export {
    PortfolioSection
};
