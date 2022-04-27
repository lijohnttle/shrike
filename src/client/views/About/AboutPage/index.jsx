import React from 'react';
import { Container, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ContactLink } from '../../../components/ContactLink';
import { Page } from '../../../components/Page';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { useData } from '../../../hooks';
import colors from '../../../themes/colors';
import { Box } from '@mui/system';
import { Check } from '@mui/icons-material';
import { BreadCrumbs } from '../../../components/BreadCrumbs';
import { pagesDescriptors } from '../../../../static';


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
                    <Typography variant="h2" align="center" gutterBottom>
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
            <Check fontSize='12px' htmlColor='green' />
        </ListItemIcon>
        <ListItemText primary={props.children} />
    </ListItem>
);


export const AboutPage = () => {
    const data = useData();

    const instagramLink = data.contacts.find((contact) => contact.vendor === 'instagram');
    
    return (
        <Page title="About">
            <BreadCrumbs pageDescriptor={pagesDescriptors.ABOUT} />

            <Article title="ABOUT ME" subTitle={<span>(Updated on <b>March 20, 2022</b>)</span>}>
                <ContentBlock
                    styles={{
                        background: colors.backgroundComplementary,
                        color: colors.textComplementary,
                        marginTop: 4,
                    }}>
                    <Box
                        sx={{
                            width: {
                                xs: '100%',
                                sm: '50%',
                            },
                            float: {
                                xs: 'none',
                                sm: 'right',
                            },
                            paddingLeft: {
                                xs: 0,
                                sm: 4,
                            },
                            paddingBottom: {
                                xs: 2,
                                sm: 0,
                            },
                        }}>
                        <img src="/assets/images/me_large.jpg" style={{ width: '100%' }} />
                    </Box>

                    <div>
                        <Typography variant="h2" gutterBottom paragraph>
                            Hi, I'm Ivan Cherkasov
                        </Typography>

                        <Typography gutterBottom paragraph>
                            Since I was a kid, I have been passionate about software development. It started when I saw Visual Basic code listings for the first time in one of the books my dad bought me when I was a kid. My curiosity took over and now here I am.
                        </Typography>

                        <Typography gutterBottom paragraph>
                            The first language that I studied was C++. When I was 13 I started learning C#, and now, for the last <b>{new Date().getFullYear() - 2013}+ years of my professional career</b>, .NET is the main stack of technologies I work with, but I constantly learn new stuff.
                        </Typography>

                        <Typography gutterBottom paragraph>
                            I have experience of creating Windows desktop applications, web services and API, front-end. I worked with relational DBMS as well as with object-oriented DBMS. I performed migration of the monolithic on-premise web application to the cloud-based microservices. 
                        </Typography>
                    </div>
                </ContentBlock>

                <Box display="flex" flexDirection="column" marginTop={4}>
                    <Section title="What I'm Doing Now">
                        <SectionList>
                            <SectionListItem>
                                Right now I live in <b>Wroclaw, Poland</b>, but I am about to move to <b>Toronto, Canada.</b>
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
