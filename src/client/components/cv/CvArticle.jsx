import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ArticleTitle } from '../common/article/ArticleTitle';
import { Article } from '../common/article/Article';
import { Block } from './Block';
import { HistoryList } from './common/historyTrack/HistoryList';
import { HistoryItem } from './common/historyTrack/HistoryItem';
import { Education } from './education/Education';
import { Experience } from './experience/Experience';
import ProfileService from '../../services/profileService';

const useStyles = (theme) => ({
    collapsed: {
        display: 'none'
    }
});

class CvArticle extends React.Component {
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
            <Article background="white">
                <ArticleTitle title="CV" to="/cv" />

                <Block title="Summary" titleBackground="transparent">
                    <Typography paragraph>
                        {cv === null
                            ? <Skeleton variant="rect" height="6rem" />
                            : cv.summary}
                    </Typography>
                </Block>

                <Block title="Experience" titleBackground="#ffbb00" titleColor="white">
                    <HistoryList>
                        {cv === null
                            ? <HistoryItem />
                            : cv.experience.map((data, i) => <HistoryItem key={i}><Experience data={data} /></HistoryItem>)}
                    </HistoryList>
                </Block>

                <Block title="Education" titleBackground="#0098ff" titleColor="white">
                    <HistoryList>
                        {cv == null
                            ? <HistoryItem />
                            : cv.education.map((data, i) => <HistoryItem key={i}><Education data={data} /></HistoryItem>)}
                    </HistoryList>
                </Block>
            </Article>
        );
    }
}

const CvArticleExport = withStyles(useStyles)(CvArticle);

export { CvArticleExport as CvArticle };