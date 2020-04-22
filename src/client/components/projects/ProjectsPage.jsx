import React from 'react';
import { withStyles, Container, Paper } from '@material-ui/core';
import { HeaderBar } from '../common/HeaderBar';
import { Footer } from '../Footer';
import { ProjectsPageSection } from './ProjectsPageSection';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    contentContainer: {
        display: 'flex',
        flexGrow: 1,

        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    contentPaper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#313131',
        color: 'white'
    }
});

class ProjectsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            minHeight: 0
        };
    }

    componentDidMount() {
        this.setState({
            minHeight: window.innerHeight
        });
    }

    render() {
        return (
            <div className={this.props.classes.root} style={{ minHeight: this.state.minHeight }}>
                <HeaderBar hasBackground={true} hasFixedPosition={false} />

                <Container className={this.props.classes.contentContainer}>
                    <Paper className={this.props.classes.contentPaper} square>
                        <ProjectsPageSection />

                        <Footer />
                    </Paper>
                </Container>
            </div>
        );
    }
}

const ProjectsPageExport = withStyles(useStyles)(ProjectsPage);

export { ProjectsPageExport as ProjectsPage };