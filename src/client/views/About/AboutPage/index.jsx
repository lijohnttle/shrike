import React from 'react';
import { Link, Typography } from '@mui/material';
import { ContactLink } from '../../../components/ContactLink';
import { Page } from '../../../components/Page';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { useData } from '../../../components/hooks';
import { useStyles } from './styles';


const AboutPage = () => {
    const classes = useStyles();
    const data = useData();
    
    const linkedin = data.contacts.find(contact => contact.vendor === 'linkedin').value;

    return (
        <Page title="About">
            <Article title="ABOUT ME" updatedOn="November 09, 2021">
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

                <ArticleContentBlock>
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        What I'm doing now
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>I am based in Wroclaw, Poland.</b> I moved here from Saint Petersburg, Russia in February 2019.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Working</b> as a Senior Software Engineer in a Swiss multinational bank.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Investing and trading securities.</b>
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Travelling.</b> One of the best ways to broaden your mind, and Europe is rich with interesting places and
                                different cultures to visit.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Working out.</b> "Mens sana in corpore sano" ("A healthy mind in a healthy body").
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Personal development.</b> Trying to get rid of bad habits and to acquire good ones. Improving my time management.
                                Having a list of daily goals and trying to achieve them.
                            </Typography>
                        </li>
                    </ul>
                </ArticleContentBlock>

                <ArticleContentBlock>
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        My plans
                    </Typography>

                    <ul>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Relocate to Canada or Australia.</b> For the last few years I've been looking for a country to settle down,
                                and recently I fell in love with these two. My girlfriend and I are planning on starting family soon, and we
                                hope that we will be able to move to one of them. Therefore, I would be glad to consider job opportunities in any
                                of these countries. You can check my <Link href={linkedin} target="_blank">LinkedIn profile</Link> or
                                my <Link href={data.cv} target="_blank">CV</Link>.
                            </Typography>
                        </li>
                        <li>
                            <Typography align="justify" gutterBottom paragraph>
                                <b>Learn Polish.</b>
                            </Typography>
                        </li>
                    </ul>
                </ArticleContentBlock>

                <ArticleContentBlock>
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        Contact Me
                    </Typography>

                    <Typography align="center" gutterBottom paragraph>
                        Want to get in touch with me? Feel free to contact me via e-mail or any other social media:
                    </Typography>

                    <div className={classes.contactList}>
                        {data.contacts.map(contact => <ContactLink key={contact.vendor} contact={contact} iconClassName={classes.contactIcon} />)}
                    </div>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    AboutPage
};
