import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const useStyles = () => ({
    appBar: {
        background: 'black',
    },
    appBarTransparent: {
        background: 'transparent',
        boxShadow: 'none',
    }
});

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolled: null
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.checkIfScrolled = this.checkIfScrolled.bind(this);
    }

    checkIfScrolled() {
        return Math.abs(window.pageYOffset) > 4;
    }

    handleWindowScroll() {
        const scrolled = this.checkIfScrolled();

        if (this.state.scrolled !== scrolled) {
            this.setState({
                scrolled
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleWindowScroll);

        const scrolled = this.checkIfScrolled();

        this.setState({
            scrolled
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    }

    render() {
        let showBackground = true;
        
        if (this.props.showBackgroundOnScroll) {
            let { scrolled } = this.state;

            if (scrolled === null) {
                scrolled = this.checkIfScrolled();
            }

            showBackground = scrolled;
        }

        const appBarClassName = showBackground
            ? this.props.classes.appBar
            : this.props.classes.appBarTransparent;
        const position = this.props.hasFixedPosition ? 'fixed' : 'relative';
    
        return (
            <AppBar className={appBarClassName} position={position}>
                <Toolbar variant="dense">
                    <Button color="inherit" href="/">
                        <Typography variant="h6">
                            LIJOHNTTLE
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
};

HeaderBar.propTypes = {
    hasFixedPosition: PropTypes.bool,
    showBackgroundOnScroll: PropTypes.bool
};

export default withStyles(useStyles)(HeaderBar);