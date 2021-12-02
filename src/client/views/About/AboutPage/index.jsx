import React from 'react';
import { Typography } from '@mui/material';
import { ContactLink } from '../../../components/ContactLink';
import { Page } from '../../../components/Page';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { useData } from '../../../hooks';
import { useStyles } from './styles';


const AboutPage = () => {
    const classes = useStyles();
    const data = useData();
    
    return (
        <Page title="About">
            <Article title="ABOUT ME" updatedOn="December 02, 2021">
                <ArticleContentBlock className={classes.introductionBlock}>
                    <div className={classes.pictureContainer}>
                        <img className={classes.picture} src="/assets/images/me_large.jpg" />
                    </div>

                    <div>
                        <Typography variant="h2" align="justify" gutterBottom paragraph>
                            Hi, I'm Ivan Cherkasov
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            Since I was a kid, I have been passionate about software development. It started when I first time saw Visual Basic code listings in one of the books my dad bought me when I was a kid, and I got very curious about it at that moment.
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            My first language that I studied was C++. In 2005 I learned about .NET and C# and decided to give it a try. And now, for the last <b>{new Date().getFullYear() - 2013}+ years of my professional career</b>, they are the main technologies I work with. 
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            I have experience of creating Windows desktop applications, web services and API, front-end. I worked with relational DBMS as well as with object-oriented DBMS. I performed migration of the monolithic on-premise web application to the cloud-based microservices. 
                        </Typography>
                    </div>
                </ArticleContentBlock>

                <ArticleContentBlock maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        What I'm doing now
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Living in Wroclaw, Poland.</b> I moved here from Saint Petersburg, Russia in February 2019.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Working as a Senior Software Engineer</b> in a Swiss multinational bank.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Investing and trading securities.</b>
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Travelling.</b>
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Working out.</b> "Mens sana in corpore sano" ("A healthy mind in a healthy body").
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Striving for self-improvement.</b>
                            </Typography>
                        </li>
                    </ul>
                </ArticleContentBlock>

                <ArticleContentBlock maxWidth="md">
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        My plans
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Relocate to Canada.</b> Currently I am in the process of moving to Canada.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Get married.</b>
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
                        {data.contacts.map(contact => <ContactLink key={contact.vendor} contact={contact} fontSize="large" />)}
                    </div>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    AboutPage
};
