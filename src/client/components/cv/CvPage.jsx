import React from 'react';
import { withStyles, Box, Container, Paper, Typography, List } from '@material-ui/core';
import { HeaderBar } from '../common/HeaderBar';
import { Footer } from '../Footer';
import { CvSection } from './CvSection';
import { CvSectionParagraph } from './CvSectionParagraph';
import { CvHistoryItem } from './CvHistoryItem';
import { CvHistoryList } from './CvHistoryList';

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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae orci nec velit elementum ullamcorper id at nunc. Nunc volutpat facilisis ultrices.
                                    Morbi porttitor egestas ultricies. Nunc aliquet molestie facilisis. Sed vitae bibendum eros. Nullam dapibus ex tortor, sed commodo elit suscipit at. Nullam eu ultricies lectus.
                                    Morbi aliquet laoreet consequat. Morbi dignissim varius ligula a dapibus.
                                </CvSectionParagraph>
                            </CvSection>

                            <CvSection title="Experience" titleBackground="#ffbb00">
                                <CvHistoryList>
                                    <CvHistoryItem>
                                        <Typography>
                                            <Typography variant="h3" component="span">
                                                Job Position&nbsp;
                                            </Typography>
                                            <Typography component="span">
                                                at Company
                                            </Typography>
                                        </Typography>
                                        <Typography style={{ opacity: 0.66, paddingBottom: "1rem" }}>
                                            01.01.1001-01.01.1002, City of Lights, Neverland
                                        </Typography>
                                        <Typography style={{ paddingBottom: "1rem" }}>
                                            • Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
                                            • In quis nisi nec lorem mattis porttitor id eu est.<br/>
                                            • Aenean id lectus a erat pretium suscipit.<br/>
                                            • Integer nec erat et turpis tempor accumsan.<br/>
                                        </Typography>
                                        <Typography style={{ paddingBottom: "1rem" }}>
                                            Tools: Tool1, Tool2, Tool3
                                        </Typography>
                                        <Typography>
                                            Technologies: Tech1, Tech2, Tech3
                                        </Typography>
                                    </CvHistoryItem>
                                </CvHistoryList>
                            </CvSection>

                            <CvSection title="Education" titleBackground="#0098ff">
                                <CvHistoryList>
                                    <CvHistoryItem>
                                        <Typography variant="h3">
                                            Name of the university
                                        </Typography>
                                        <Typography>
                                            Degree, Description
                                        </Typography>
                                        <Typography style={{ opacity: 0.66 }}>
                                            01.01.1001-01.01.1002, City of Lights, Neverland
                                        </Typography>
                                    </CvHistoryItem>
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