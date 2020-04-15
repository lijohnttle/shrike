import React from 'react';
import { withStyles, Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { PageTitle } from '../common/page/PageTitle';
import { CvBlock } from './CvBlock';
import { CvBlockParagraph } from './CvBlockParagraph';
import { CvHistoryList } from './CvHistoryList';
import { CvEducationDataPresenter } from './CvEducationDataPresenter';
import { CvExperienceDataPresenter } from './CvExperienceDataPresenter';
import { CvEmptyDataPresenter } from './CvEmptyDataPresenter';
import * as cvService from '../../services/cvService';

const useStyles = () => ({
    section: {
        background: '#436c8a',
        color: 'white'
    },
    collapsed: {
        display: 'none'
    }
});

class CvPageSection extends React.Component {
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
            <Box className={this.props.classes.section} pb={6}>
                <Box pl={6} pt={6}>
                    <PageTitle title="CV" to="/cv" />
                </Box>

                <CvBlock title="Summary" titleBackground="transparent">
                    <CvBlockParagraph>
                        {cv === null
                            ? <Skeleton variant="rect" height="6rem" />
                            : cv.summary}
                    </CvBlockParagraph>
                </CvBlock>

                <CvBlock title="Experience" titleBackground="#ffbb00">
                    <CvHistoryList>
                        {cv === null
                            ? <CvEmptyDataPresenter />
                            : cv.experience.map((data, i) => <CvExperienceDataPresenter key={i} data={data} />)}
                    </CvHistoryList>
                </CvBlock>

                <CvBlock title="Education" titleBackground="#0098ff">
                    <CvHistoryList>
                        {cv == null
                            ? <CvEmptyDataPresenter />
                            : cv.education.map((data, i) => <CvEducationDataPresenter key={i} data={data} />)}
                    </CvHistoryList>
                </CvBlock>
            </Box>
        );
    }
}

const CvPageSectionExport = withStyles(useStyles)(CvPageSection);

export { CvPageSectionExport as CvPageSection };