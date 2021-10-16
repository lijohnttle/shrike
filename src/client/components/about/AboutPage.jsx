import React from 'react';
import { Link, makeStyles, Typography } from '@material-ui/core';
import { Article, ArticleContentBlock, ContactLink, Footer, Header } from '../common';
import { asPage, withData } from '../core';

const pageOptions = {
    title: 'About'
};

const useStyles = makeStyles((theme) => ({
    introductionBlock: {
        background: 'lightslategray',
        color: 'white',
    },
    pictureContainer: {
        width: '50%',
        float: 'right',
        paddingLeft: theme.spacing(4),

        [theme.breakpoints.down('sm')]: {
            float: 'none',
            paddingLeft: 0,
            width: '100%',
            paddingBottom: theme.spacing(2),
        },
    },
    picture: {
        width: '100%',
    },
    contactList: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
    },
    contactIcon: {
        width: 48,
        height: 48,
    },
}));

const AboutPage = ({ data }) => {
    const classes = useStyles();
    const linkedin = data.contacts.find(contact => contact.vendor === 'linkedin').value;

    return (
        <Article title="ABOUT ME" updatedOn="October 13, 2021">
            <ArticleContentBlock className={classes.introductionBlock}>
                <div className={classes.pictureContainer}>
                    <img className={classes.picture} src="/assets/images/me_large.jpg" />
                </div>

                <div>
                    <Typography variant="h2" align="justify" gutterBottom paragraph>
                        Hi, I'm Ivan Cherkasov
                    </Typography>

                    <Typography align="justify" gutterBottom paragraph>
                        Since I was a kid, I have been passionate about software development. I remember the day I found Visual Basic code listings in one of my books that my dad bought me, and the curiosity I felt at that moment.
                    </Typography>

                    <Typography align="justify" gutterBottom paragraph>
                        My first language that I studied was C++. In 2005 I learned about .NET and C# and decided to give it a try. And now, for the last <b>{new Date().getFullYear() - 2013}+ years of my professional career</b>, they are the main technologies I work with. 
                    </Typography>

                    <Typography align="justify" gutterBottom paragraph>
                        I have experience of creating Windows desktop applications, web services and web API, web front-end. I worked with relational DBMS as well as with object-oriented DBMS. I performed migration of the monolithic on-premise web application to the cloud-based microservices. 
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
                            <b>I am based in Wroclaw, Poland.</b> I moved here from Saint Petersburg, Russia in February, 2019.
                        </Typography>
                    </li>
                    <li>
                        <Typography align="justify" gutterBottom paragraph>
                            <b>Working</b> as a Senior Software Engineer in a Swiss multinational bank.
                        </Typography>
                    </li>
                    <li>
                        <Typography align="justify" gutterBottom paragraph>
                            <b>Trading stocks</b> as an additional income stream.
                        </Typography>
                    </li>
                    <li>
                        <Typography align="justify" gutterBottom paragraph>
                            <b>Travelling.</b> I try to travel as much as I can, and Europe provides with a lot of interesting places to visit.
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
                            <b>Relocate to Canada or Australia.</b> One of my and my girlfriend's goals is to move to Canada or Australia,
                            therefore I would be glad to consider job opportunities in these countries.
                            You can check my LinkedIn <Link href={linkedin} target="_blank">profile</Link> or
                            my <Link href={data.cv} target="_blank">CV</Link>.
                        </Typography>
                    </li>
                    <li>
                        <Typography align="justify" gutterBottom paragraph>
                            <b>Visit my girlfriend in Australia.</b> Covid-19 negatevely affected lives of too many people. My girlfriend is currently living in Australia, and I am waiting when the borders will get open to visit her.
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
    );
};

let ResultComponent = withData(AboutPage);
ResultComponent = asPage(ResultComponent, pageOptions);

export default ResultComponent;