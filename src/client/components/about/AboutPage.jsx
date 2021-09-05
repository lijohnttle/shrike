import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Footer, Header } from '../common';
import { asPage, withData } from '../core';

const pageOptions = {
    title: 'About'
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    content: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    section: {
        paddingBottom: theme.spacing(8),
        overflow: 'hidden',
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
}));

const AboutPage = ({ data }) => {
    const classes = useStyles();
    const email = data.contacts.find(contact => contact.vendor === 'email').value;

    return (
        <div className={classes.root}>
            <Header lightTheme />

            <Container className={classes.content} maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h1" align="center" >
                        ABOUT ME
                    </Typography>

                    <Typography variant="caption" align="center" color="textSecondary" gutterBottom paragraph>
                        (Updated on <b>September 05, 2021</b>)
                    </Typography>
                </div>

                <div className={classes.section}>
                    <div className={classes.pictureContainer}>
                        <img className={classes.picture} src="/assets/images/me_large.jpg" />
                    </div>

                    <div>
                        <Typography variant="h2" align="justify" gutterBottom paragraph>
                            Hi, I am Ivan Cherkasov
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
                </div>

                <div className={classes.section}>
                    <Typography variant="h2" align="center" gutterBottom paragraph>
                        Contact me
                    </Typography>

                    <Typography align="justify" gutterBottom paragraph>
                        Want to get in touch with me? Feel free to contact me via e-mail <a href={`mailto:${email}`}>{email}</a>.
                    </Typography>
                </div>
            </Container>

            <Footer />
        </div>
    );
};

let ResultComponent = withData(AboutPage);
ResultComponent = asPage(ResultComponent, pageOptions);

export default ResultComponent;