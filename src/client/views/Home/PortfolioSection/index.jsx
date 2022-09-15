import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { ContactLink } from '../../../components';
import { colors } from '../../../themes';
import { SectionContentWrapper } from '../SectionContentWrapper';
import { SectionWrapper } from '../SectionWrapper';


const projects = [
    {
        name: 'Personal Website & Blog',
        description: 'My personal website and blog.',
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
        name: 'Image Processing Tools (.NET)',
        description: 'Libraries consisting of image processing tools and filters.',
        links: [
            {
                vendor: 'github',
                value: 'https://github.com/lijohnttle/lijohnttle.Media.Photo.Net',
            }
        ],
    }
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

const PortfolioSection = ({ screenHeight, disableBottomGutter, showScrollToNextSection }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    });

    return (
        <SectionWrapper screenHeight={screenHeight} canScrollToNextSection={showScrollToNextSection}>
            <SectionContentWrapper isLoading={isLoading} maxWidth="md" disableBottomGutter={disableBottomGutter}>

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
                                                        {project.name}
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
            </SectionContentWrapper>
        </SectionWrapper>
    );
};


export {
    PortfolioSection
};
