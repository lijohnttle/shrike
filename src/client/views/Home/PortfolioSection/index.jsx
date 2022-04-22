import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components/ContactLink';
import colors from '../../../themes/colors';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';


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

const Block = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(4),
}));

const ProjectWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    paddingBottom: theme.spacing(1),
    width: '50%',

    '& > div': {
        display: 'flex',
        flexFlow: 'column nowrap',
        flexGrow: '1',
        background: colors.backgroundComplementary,
        color: colors.textComplementary,
    },

    '&:nth-of-type(odd)': {
        paddingRight: theme.spacing(0.5),

        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(0),
        },
    },

    '&:nth-of-type(even)': {
        paddingLeft: theme.spacing(0.5),

        [theme.breakpoints.down('md')]: {
            paddingLeft: theme.spacing(0),
        },
    },

    [theme.breakpoints.down('md')]: {
        width: '100%',
        paddingBottom: theme.spacing(1),
    },
}));

const ProjectContent = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: theme.spacing(3),
}));

const CoreValuesList = styled('div')(({ theme }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
        flexFlow: 'column nowrap%'
    },

    '& > div': {
        width: '50%',
        marginBottom: theme.spacing(2),

        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
    },

    '& > div:nth-of-type(even)': {
        paddingLeft: theme.spacing(0.5),

        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
        },
    },

    '& > div:nth-of-type(odd)': {
        paddingRight: theme.spacing(0.5),

        [theme.breakpoints.down('sm')]: {
            paddingRight: 0,
        },
    },

    '& > div > div': {
        border: `2px solid ${colors.backgroundComplementary}`,
        padding: theme.spacing(2),
        height: '100%',
    },
}));

const PortfolioSection = ({ screenHeight, isLastSection }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={!isLastSection}>
            <SectionContentWrapper isLoading={isLoading} maxWidth="md">

                <Typography variant="h1" fontWeight="bold" paragraph>
                    PORTFOLIO
                </Typography>

                <Block>
                    <Typography variant="h3" paragraph>
                        SIDE PROJECTS
                    </Typography>

                    <Box
                        display="flex"
                        sx={{
                            flexDirection: {
                                xs: 'column',
                                sm: 'row',
                            },
                            flexWrap: {
                                xs: 'nowrap',
                                sm: 'wrap',
                            },
                            justifyContent: {
                                xs: 'flex-start',
                                sm: 'space-between',
                            },
                        }}>
                        {projects.map((project) => {
                            return (
                                <ProjectWrapper key={project.name}>
                                    <div>
                                        <ProjectContent>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                flexWrap="wrap"
                                                alignItems="center"
                                                marginBottom={1}>
                                                <Box marginRight={2}>
                                                    <Typography variant="h5" align="justify">
                                                        {project.name.toUpperCase()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="caption" align="justify">
                                                {project.description}
                                            </Typography>
                                        </ProjectContent>

                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="flex-start"
                                            padding={2}
                                            paddingTop={1}
                                            paddingBottom={1}>
                                            {project.links.map((link) => <ContactLink key={link.value} contact={link} fontSize="medium" />)}
                                        </Box>
                                    </div>
                                </ProjectWrapper>
                            );
                        })}
                    </Box>
                </Block>

                <Block>
                    <Typography variant="h3" paragraph>
                        CORE VALUES
                    </Typography>

                    <CoreValuesList>
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
                    </CoreValuesList>
                </Block>
            </SectionContentWrapper>
        </SectionWrapper>
    );
};


export {
    PortfolioSection
};
