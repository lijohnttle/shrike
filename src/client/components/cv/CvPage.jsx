import React from 'react';
import { withStyles, Box, Container, Paper, Typography, List } from '@material-ui/core';
import { HeaderBar } from '../common/HeaderBar';
import { Footer } from '../Footer';
import { CvSection } from './CvSection';
import { CvSectionParagraph } from './CvSectionParagraph';
import { CvHistoryList } from './CvHistoryList';
import { CvEducationDataPresenter } from './CvEducationDataPresenter';
import { CvExperienceDataPresenter } from './CvExperienceDataPresenter';

const useStyles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    contentPaper: {
        display: 'flex',
        flexDirection: 'column',
        background: '#436c8a',
        color: 'white'
    },
    section: {
        display: 'flex',
        flexDirection: 'column'
    },
    educationSectionTitle: {
        background: '#0098ff'
    }
});

const cv = {
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae orci nec velit elementum ullamcorper id at nunc. Nunc volutpat facilisis ultrices. Morbi porttitor egestas ultricies. Nunc aliquet molestie facilisis. Sed vitae bibendum eros. Nullam dapibus ex tortor, sed commodo elit suscipit at. Nullam eu ultricies lectus. Morbi aliquet laoreet consequat. Morbi dignissim varius ligula a dapibus.',
    experience: [
        {
            position: 'Job Position 3',
            employer: 'Company',
            date: '01.01.1001-01.01.1002',
            location: 'City of Lights, Neverland',
            accomplishments: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'In quis nisi nec lorem mattis porttitor id eu est.',
                'Aenean id lectus a erat pretium suscipit.',
                'Integer nec erat et turpis tempor accumsan.',
            ],
            tools: [ 'Tool1', 'Tool2', 'Tool3' ],
            technologies: [ 'Tech1', 'Tech2', 'Tech3' ]
        },
        {
            position: 'Job Position 2',
            employer: 'Company',
            date: '01.01.1001-01.01.1002',
            location: 'City of Lights, Neverland',
            accomplishments: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'In quis nisi nec lorem mattis porttitor id eu est.',
                'Aenean id lectus a erat pretium suscipit.',
                'Integer nec erat et turpis tempor accumsan.',
            ],
            tools: [ 'Tool1', 'Tool2', 'Tool3' ],
            technologies: [ 'Tech1', 'Tech2', 'Tech3' ]
        },
        {
            position: 'Job Position 1',
            employer: 'Company',
            date: '01.01.1001-01.01.1002',
            location: 'City of Lights, Neverland',
            accomplishments: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'In quis nisi nec lorem mattis porttitor id eu est.',
                'Aenean id lectus a erat pretium suscipit.',
                'Integer nec erat et turpis tempor accumsan.',
            ],
            tools: [ 'Tool1', 'Tool2', 'Tool3' ],
            technologies: [ 'Tech1', 'Tech2', 'Tech3' ]
        }
    ],
    education: [
        {
            title: 'Name of the University',
            description: 'Degree, Description',
            date: '01.01.1001-01.01.1002',
            location: 'City of Lights, Neverland'
        }
    ]
};

class CvPage extends React.Component {
    render() {
        return (
            <Box className={this.props.classes.root}>
                <HeaderBar hasBackground={true} hasFixedPosition={false} />

                <Container>
                    <Paper className={this.props.classes.contentPaper} square >
                        <Box className={this.props.classes.section} mb="5rem">
                            <Box pl="3rem" pt="3rem">
                                <Typography variant="h1">
                                    CV
                                </Typography>
                            </Box>
                            
                            <CvSection title="Summary" titleBackground="transparent">
                                <CvSectionParagraph>
                                    {cv.summary}
                                </CvSectionParagraph>
                            </CvSection>

                            <CvSection title="Experience" titleBackground="#ffbb00">
                                <CvHistoryList>
                                    {cv.experience.map((data, i) => <CvExperienceDataPresenter key={i} data={data} />)}
                                </CvHistoryList>
                            </CvSection>

                            <CvSection title="Education" titleBackground="#0098ff">
                                <CvHistoryList>
                                    {cv.education.map((data, i) => <CvEducationDataPresenter key={i} data={data} />)}
                                </CvHistoryList>
                            </CvSection>
                        </Box>

                        <Footer />
                    </Paper>
                </Container>
            </Box>
        );
    }
}

const PageExport = withStyles(useStyles)(CvPage);

export { PageExport as CvPage };