import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(\'/images/amsterdam.jpg\')',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[3]
    }
}));

const RenderHomeTopContainer = ({ height, children }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root} minHeight={`${height}px`}>
            {children}
        </Box>
    );
}

class HomeTopContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowHeight: null
        };
    }

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight
        });
    }

    render() {
        const height = this.state.windowHeight || window.innerHeight;

        return (
            <RenderHomeTopContainer height={height}>
                {this.props.children}
            </RenderHomeTopContainer>
        );
    }
}

export { HomeTopContainer };