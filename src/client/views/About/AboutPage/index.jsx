import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { AccessTimeOutlined } from '@mui/icons-material';
import { Article, Page } from '../../../components';
import { pagesDescriptors } from '../../../../static';
import { BookList } from '../../../components/BookList';
import { BookLibraryButton } from '../../../components/BookLibraryButton';


/**
 * Renders a section on the page.
 * @param {Object} props 
 * @param {String} props.title Section title. 
 * @param {React.ReactNode} props.children Children components.
 * @returns 
 */
const Section = (props) => (
    <Box
        overflow="hidden"
        sx={[{
            paddingTop: {
                xs: 4,
                sm: 8,
            },
            paddingBottom: {
                xs: 2,
                sm: 4,
            },
        }, props.styles]}>
        <Container maxWidth="md">
            {props.title ?
                (
                    <Typography variant="h2" align="center" marginBottom={2}>
                        {props.title}
                    </Typography>
                ) : null}

            {props.children}
        </Container>
    </Box>
);

export const AboutPage = () => {
    return (
        <Page title="About">
            <Article
                pageDescriptor={pagesDescriptors.ABOUT}
                subTitle={
                    <span>
                        <AccessTimeOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 1 }} />
                        <span>
                            JULY 03, 2023
                        </span>
                    </span>
                }>

                <Box display="flex" flexDirection="column" marginTop={4}>
                    <Section title="Book Library">
                        <Box marginBottom={8}>
                            <BookList count={7} shelf="currently-reading" />
                        </Box>

                        <Box marginBottom={8}>
                            <BookList count={7} shelf="read" />
                        </Box>

                        <BookLibraryButton />
                    </Section>
                </Box>
            </Article>
        </Page>
    );
};
