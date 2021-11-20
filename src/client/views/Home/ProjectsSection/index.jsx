import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components/ContactLink';
import { SectionContentContainer } from '../SectionContentContainer';
import { useStyles } from './styles';


const projects = [
    {
        name: 'Habit Tracker',
        description: 'Mobile application for tracking habits. Status: preparing mock-ups.',
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/habit-tracker',
            },
        ],
    },
    {
        name: 'Personal Web-Site',
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
];

const ProjectsSection = ({ screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles({ screenHeight });

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionContentContainer title="Side Projects" isLoading={isLoading} className={classes.root} maxWidth="md" canScrollToNextSection={!isLastSection}>
            {projects.map((project) => {
                return (
                    <div key={project.name} className={classes.projectRoot}>
                        <div className={classes.projectBullet}></div>
                        <div className={classes.projectContentRoot}>
                            <Typography variant="h3" gutterBottom align="justify">
                                {project.name}
                            </Typography>
                            <Typography variant="subtitle2" color="GrayText" align="justify">
                                {project.description}
                            </Typography>
                            <div className={classes.projectLinks}>
                                {project.links.map((link) => <ContactLink key={link.value} contact={link} fontSize="large" />)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </SectionContentContainer>
    );
};


export {
    ProjectsSection
};
