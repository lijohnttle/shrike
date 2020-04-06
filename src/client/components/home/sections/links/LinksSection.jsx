import React from 'react';
import { Box, Paper, withStyles, Typography } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = () => ({
    cvRoot: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#436c8a',
        color: 'white',
        flex: 1
    }
});

class LinksSection extends React.Component {
    render() {
        return (
            <Box display="flex" flexDirection="row">
                <Paper className={this.props.classes.cvRoot}>
                    <Typography variant="h1">
                        <AssignmentIcon fontSize="inherit" style={{ position: 'relative', top: '0.125em' }} />
                        CV
                    </Typography>
                </Paper>
            </Box>
        );
    }
}

const LinksSectionExport = withStyles(useStyles)(LinksSection);

export { LinksSectionExport as LinksSection };