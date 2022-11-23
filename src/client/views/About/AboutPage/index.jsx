import React from 'react';
import { Box, Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AccessTimeOutlined, CheckBox } from '@mui/icons-material';
import { Article, ContactLink, ContentBlock, Page } from '../../../components';
import { useData } from '../../../hooks';
import { pagesDescriptors } from '../../../../static';
import { BookList } from '../../../components/BookList';
import { BookLibraryButton } from '../../../components/BookLibraryButton';
import { colors, shadows } from '../../../themes';


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

/**
 * Represents a list of items.
 * @param {Object} props 
 * @param {React.ReactNode} props.children
 * @returns {React.ReactNode}
 */
const SectionList = (props) => (
    <List>
        {props.children}
    </List>
);

/**
 * Represents a list of items.
 * @param {Object} props 
 * @param {React.ReacNode} props.children
 * @returns {React.ReactNode}
 */
 const SectionListItem = (props) => (
    <ListItem disablePadding>
        <ListItemIcon sx={{ minWidth: 'auto', paddingRight: 2 }}>
            <CheckBox fontSize="small" htmlColor={colors.text} />
        </ListItemIcon>
        <ListItemText primary={props.children} />
    </ListItem>
);


export const AboutPage = () => {
    const data = useData();

    const instagramLink = data.contacts.find((contact) => contact.vendor === 'instagram');
    const linkedInLink = data.contacts.find((contact) => contact.vendor === 'linkedin');

    return (
        <Page title="About">
            <Article
                pageDescriptor={pagesDescriptors.ABOUT}
                subTitle={
                    <span>
                        <AccessTimeOutlined sx={{ verticalAlign: 'text-bottom', marginRight: 1 }} />
                        <span>
                            NOVEMBER 22, 2022
                        </span>
                    </span>
                }>
                <ContentBlock compact
                    sx={{
                        marginTop: 4,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }}>
                        
                        <Box
                            sx={{
                                width: {
                                    xs: '100%',
                                    md: '30%',
                                },
                                paddingRight: {
                                    xs: 0,
                                    md: 2,
                                },
                                paddingBottom: {
                                    xs: 2,
                                    md: 0,
                                },
                            }}>
                            <img src="/assets/images/me_large.jpg" style={{ width: '100%' }} />
                        </Box>

                        <Box
                            sx={{
                                background: colors.paperDarkBackground,
                                width: {
                                    xs: '100%',
                                    md: '50%',
                                },
                                padding: {
                                    xs: 2,
                                    md: 4,
                                },
                                borderRadius: 2
                            }}>
                            <Typography variant="h2" gutterBottom paragraph>
                                Hi, I'm Ivan Cherkasov
                            </Typography>

                            <Typography color="inherit" gutterBottom paragraph textAlign="justify">
                                Today, I work as a Senior Software Engineer. I mostly use the .NET technology stack + React.js, but I constantly learn something new. Please, check my <Link href={linkedInLink.value}>LinkedIn profile</Link> for more information.
                            </Typography>
                        </Box>
                    </Box>
                </ContentBlock>

                <Box display="flex" flexDirection="column" marginTop={4}>
                    <Section title="What I'm Doing Now">
                        <SectionList>
                            <SectionListItem>
                                Based in Singapore.
                            </SectionListItem>
                            <SectionListItem>
                                Working as a <b>Senior Software Engineer</b> in a Swiss multinational bank.
                            </SectionListItem>
                            <SectionListItem>
                                Getting ready to get married.
                            </SectionListItem>
                            <SectionListItem>
                                Learning Zulu and French.
                            </SectionListItem>
                        </SectionList>
                    </Section>

                    <Section title="Interests &amp; Hobbies">
                        <SectionList>
                            <SectionListItem>
                                <Link href={instagramLink.value} target="_blank">Travel.</Link>
                            </SectionListItem>
                            <SectionListItem>
                                Finance, investing and trading.
                            </SectionListItem>
                            <SectionListItem>
                                Fitness.
                            </SectionListItem>
                            <SectionListItem>
                                Self-Improvement.
                            </SectionListItem>
                            <SectionListItem>
                                Learning languages. I speak Russian (native), English (fluent), French (beginner), Zulu (beginner).
                            </SectionListItem>
                        </SectionList>
                    </Section>

                    <Section title="Book Library">
                        <Box marginBottom={8}>
                            <BookList count={7} shelf="currently-reading" />
                        </Box>

                        <Box marginBottom={8}>
                            <BookList count={7} shelf="read" />
                        </Box>

                        <BookLibraryButton />
                    </Section>

                    <Section title="Contact Me">
                        <Typography align="center" gutterBottom paragraph>
                            Want to get in touch with me? Feel free to contact me via e-mail or any other social media:
                        </Typography>

                        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
                            {data.contacts.filter(c => c.types.some(ct => ct === 'social')).map(
                                contact => <ContactLink key={contact.vendor} contact={contact} fontSize="large" />)}
                        </Box>
                    </Section>
                </Box>
            </Article>
        </Page>
    );
};
