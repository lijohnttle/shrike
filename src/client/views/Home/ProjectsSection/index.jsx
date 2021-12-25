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

const ProjectsSection = ({ screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles({ screenHeight });

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionContentContainer
            title="Side Projects"
            isLoading={isLoading}
            className={classes.root}
            contentRootClassName={classes.contentRoot}
            maxWidth="md"
            canScrollToNextSection={!isLastSection}>

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
