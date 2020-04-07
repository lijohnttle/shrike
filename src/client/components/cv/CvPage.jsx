import React from 'react';
import { withStyles, Box, Container, Paper } from '@material-ui/core';
import { HeaderBar } from '../common/HeaderBar';
import { Footer } from '../Footer';
import { CvPageSection } from './CvPageSection';

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
    }
});

class CvPage extends React.Component {
    render() {
        return (
            <Box className={this.props.classes.root}>
                <HeaderBar hasBackground={true} hasFixedPosition={false} />

                <Container>
                    <Paper className={this.props.classes.contentPaper} square>
                        <CvPageSection />

                        <Footer />
                    </Paper>
                </Container>
            </Box>
        );
    }
}

const CvPageExport = withStyles(useStyles)(CvPage);

export { CvPageExport as CvPage };