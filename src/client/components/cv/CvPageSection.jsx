import React from 'react';
import { withStyles, Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ArticleTitle } from '../common/article/ArticleTitle';
import { Article } from '../common/article/Article';
import { CvBlock } from './CvBlock';
import { CvBlockParagraph } from './CvBlockParagraph';
import { CvHistoryList } from './CvHistoryList';
import { CvEducationDataPresenter } from './CvEducationDataPresenter';
import { CvExperienceDataPresenter } from './CvExperienceDataPresenter';
import { CvEmptyDataPresenter } from './CvEmptyDataPresenter';
import ProfileService from '../../services/profileService';

const useStyles = (theme) => ({
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

    async componentDidMount() {
        try {
            const cv = await ProfileService.getCv();
            
            this.setState({ cv });
        }
        catch (error) {
            console.log(error);

            this.setState({ error });
        }
    }

    render() {
        const { cv } = this.state;

        return (
            <Article background="#436c8a" color="white">
                <ArticleTitle title="CV" to="/cv" />

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
            </Article>
        );
    }
}

const CvPageSectionExport = withStyles(useStyles)(CvPageSection);

export { CvPageSectionExport as CvPageSection };