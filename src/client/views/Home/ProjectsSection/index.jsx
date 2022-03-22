import { Link, Typography } from '@mui/material';
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
            <Typography variant="h3" textAlign="left">
                {header}
            </Typography>
        </div>
    );
};

const renderBusinessContact = (contactName, contacts, imageSrc, classes) => {
    return (
        <div className={classes.businessContact}>
            <Link href={contacts.find(c => c.vendor === contactName).value} target="_blank" display="block" fontSize={0}>
                <img width="96px" height="96px" src={imageSrc} />
            </Link>
        </div>
    );
};

const ProjectsSection = ({ contacts, screenHeight, isLastSection }) => {
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

            {renderSubHeader('SUMMARY', classes)}

            <div className={classes.summary}>
                <Typography textAlign="justify" gutterBottom>
                    I am a Senior Software Engineer with extensive experience in web/mobile/desktop software development.
                    Currently I am open to new opportunities, please feel free to contact me regarding any projects you have.
                </Typography>
            </div>

            {renderSubHeader('BUSINESS CONTACTS', classes)}

            <div className={classes.businessContacts}>
                {renderBusinessContact('linkedin', contacts, '/assets/images/linkedin-logo.jpg', classes)}
                {renderBusinessContact('upwork', contacts, '/assets/images/upwork-logo.png', classes)}
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
                                    <Typography variant="caption" color="GrayText" align="justify">
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
    ProjectsSection
};
