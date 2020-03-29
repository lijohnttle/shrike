import React from 'react';
import { withStyles, Box, Container, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { HeaderBar } from '../common/HeaderBar';
import { Footer } from '../Footer';
import { CvSection } from './CvSection';
import { CvSectionParagraph } from './CvSectionParagraph';
import { CvHistoryList } from './CvHistoryList';
import { CvEducationDataPresenter } from './CvEducationDataPresenter';
import { CvExperienceDataPresenter } from './CvExperienceDataPresenter';
import { CvEmptyDataPresenter } from './CvEmptyDataPresenter';
import * as cvService from '../../services/cvService';

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

class CvPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cv: null,
            error: null
        };
    }

    componentDidMount() {
        cvService
            .getCv()
            .then(cv => this.setState({ cv: cv }))
            .catch(error => this.setState({ error: error }));
    }

    render() {
        const { cv } = this.state;

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
                                    {cv === null
                                        ? <Skeleton variant="rect" height="6rem" />
                                        : cv.summary}
                                </CvSectionParagraph>
                            </CvSection>

                            <CvSection title="Experience" titleBackground="#ffbb00">
                                <CvHistoryList>
                                    {cv === null
                                        ? <CvEmptyDataPresenter />
                                        : cv.experience.map((data, i) => <CvExperienceDataPresenter key={i} data={data} />)}
                                </CvHistoryList>
                            </CvSection>

                            <CvSection title="Education" titleBackground="#0098ff">
                                <CvHistoryList>
                                    {cv == null
                                        ? <CvEmptyDataPresenter />
                                        : cv.education.map((data, i) => <CvEducationDataPresenter key={i} data={data} />)}
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