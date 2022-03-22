import React from 'react';
import { Link, Typography } from '@mui/material';
import { ContactLink } from '../../../components/ContactLink';
import { Page } from '../../../components/Page';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { useData } from '../../../hooks';
import { useStyles } from './styles';


const AboutPage = () => {
    const classes = useStyles();
    const data = useData();

    const instagramLink = data.contacts.find((contact) => contact.vendor === 'instagram');
    
    return (
        <Page title="About">
            <Article title="ABOUT ME" updatedOn="March 20, 2022">
                <ArticleContentBlock className={classes.introductionBlock}>
                    <div className={classes.pictureContainer}>
                        <img className={classes.picture} src="/assets/images/me_large.jpg" />
                    </div>

                    <div>
                        <Typography variant="h2" align="justify" gutterBottom paragraph>
                            Hi, I'm Ivan Cherkasov
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            Since I was a kid, I have been passionate about software development. It started when I saw Visual Basic code listings for the first time in one of the books my dad bought me when I was a kid. My curiosity took over and now here I am.
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            The first language that I studied was C++. When I was 13 I started learning C#, and now, for the last <b>{new Date().getFullYear() - 2013}+ years of my professional career</b>, .NET is the main stack of technologies I work with, but I constantly learn new stuff.
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            I have experience of creating Windows desktop applications, web services and API, front-end. I worked with relational DBMS as well as with object-oriented DBMS. I performed migration of the monolithic on-premise web application to the cloud-based microservices. 
                        </Typography>
                    </div>
                </ArticleContentBlock>

                <ArticleContentBlock maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        What I'm Doing Now
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Right now I live in <b>Wroclaw, Poland</b>, but I am about to move to <b>Toronto, Canada.</b>
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Working as a <b>Senior Software Engineer</b> in a Swiss multinational bank.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Getting ready to get married.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Learning Zulu and French.
                            </Typography>
                        </li>
                    </ul>
                </ArticleContentBlock>

                <ArticleContentBlock maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        Interests &amp; Hobbies
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <Link href={instagramLink.value} target="_blank">Travel.</Link>
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Finance, investing and trading.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Fitness.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Self-Improvement.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                Learning languages. I speak Russian (native), English (fluent), French (beginner), Zulu (beginner).
                            </Typography>
                        </li>
                    </ul>
                </ArticleContentBlock>

                <ArticleContentBlock maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        Contact Me
                    </Typography>

                    <Typography align="center" gutterBottom paragraph>
                        Want to get in touch with me? Feel free to contact me via e-mail or any other social media:
                    </Typography>

                    <div className={classes.contactList}>
                        {data.contacts.filter(c => c.types.some(ct => ct === 'social')).map(
                            contact => <ContactLink key={contact.vendor} contact={contact} fontSize="large" />)}
                    </div>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    AboutPage
};
