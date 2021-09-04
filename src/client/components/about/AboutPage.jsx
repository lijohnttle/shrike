import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';

const PAGE_TITLE = 'lijohnttle - About';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4)
    },
    content: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    introduction: {
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

const AboutPage = () => {
    const classes = useStyles();

    useEffect(() => {
        document.title = PAGE_TITLE;
    }, []);

    return (
        <React.Fragment>
            <Header lightTheme />

            <Container className={classes.content} maxWidth="lg">
                <div className={classes.title}>
                    <Typography variant="h1" align="center" >
                        ABOUT ME
                    </Typography>
                </div>

                <div className={classes.introduction}>
                    <div className={classes.pictureContainer}>
                        <img className={classes.picture} src="/assets/images/me_large.jpg" />
                    </div>

                    <div>
                        <Typography variant="h2" align="justify" gutterBottom paragraph>
                            Hi, I am Ivan Cherkasov
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            Since I was a kid, I have been passionate about writing code. I remember the day I found Visual Basic code listings in one of my books that my dad bought me, and that strong feeling of curiosity I experienced at that moment.
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            My first language that I studied was C++, and it was not easy. Bun in the year 2005 I learned about .NET and C# and decided to give it a try, and now, for the last <b>{new Date().getFullYear() - 2013}+ years of my professional career</b>, they are the main technologies that I work with. 
                        </Typography>

                        <Typography align="justify" gutterBottom paragraph>
                            I have an experience of creating Windows desktop applications, web services and web API, web front-end. I worked with relational DBMS as well as with object-oriented DBMS. I performed migration of the monolithic on-premise web application to the cloud-based microservices. 
                        </Typography>
                    </div>
                </div>
            </Container>

            <Footer />
        </React.Fragment>
    );
};

export default AboutPage;