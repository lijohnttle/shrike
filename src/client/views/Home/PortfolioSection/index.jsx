import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components/ContactLink';
import { SectionContentContainer } from '../SectionContentContainer';
import { SectionWrapper } from '../SectionWrapper';
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

const PortfolioSection = ({ screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionWrapper screenHeight={screenHeight} className={classes.root} canScrollToNextSection={!isLastSection}>
            <SectionContentContainer
                isLoading={isLoading}
                contentRootClassName={classes.contentRoot}
                maxWidth="md">

                <Typography variant="h1" fontWeight="bold" paragraph>
                    PORTFOLIO
                </Typography>

                <Typography variant="h3" paragraph>
                    SIDE PROJECTS
                </Typography>

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
        </SectionWrapper>
    );
};


export {
    PortfolioSection
};
