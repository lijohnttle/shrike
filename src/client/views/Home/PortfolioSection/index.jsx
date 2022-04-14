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

const coreValues = [
    {
        title: 'CUSTOMER FOCUS',
        description: 'Customers define requirements and they are the core of a product. It is important to maintain a close relationship with them, work in partnership and prefer collaboration through personal contact.',
    },
    {
        title: 'INTEGRITY & PROFESSIONALISM',
        description: 'Integrity is the key component of business. Without integrity and professionalism there is no trust.',
    },
    {
        title: 'QUALITY',
        description: 'I strive to provide high-quality services and products that meet the expectations and requirements of its customers.',
    },
    {
        title: 'INNOVATION',
        description: 'I am always on the look-out for new tools, techniques and concepts to use in provided services that would allow to get the best results.',
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

                <div className={classes.block}>
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
                </div>

                <div className={classes.block}>
                    <Typography variant="h3" paragraph>
                        CORE VALUES
                    </Typography>

                    <div className={classes.coreValuesList}>
                        {coreValues.map(value => (
                            <div key={value.title}>
                                <div>
                                    <Typography variant="h3" paragraph>
                                        {value.title}
                                    </Typography>
                                    <Typography paragraph>
                                        {value.description}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                </div>
                </div>
            </SectionContentContainer>
        </SectionWrapper>
    );
};


export {
    PortfolioSection
};
