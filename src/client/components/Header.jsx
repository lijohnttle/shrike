import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    appBarTransparent: {
        background: 'transparent',
        boxShadow: 'none'
    },
    title: {
        flexGrow: 1
    }
});

const RenderHeader = ({ hasBackground }) => {
    const classes = useStyles();
    const appBarClassName = hasBackground ? '' : classes.appBarTransparent;

    return (
        <AppBar className={appBarClassName} position="fixed">
            <Toolbar variant="dense">
                <Button color="inherit" href="/">
                    <Typography variant="h6">
                        LIJOHNTTLE
                    </Typography>
                </Button>

                <Typography className={classes.title}>

                </Typography>

                <Button color="inherit" href="/#books">Books</Button>
            </Toolbar>
        </AppBar>
    );
};

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBackground: null
        };

        this.handleWindowScroll = this.handleWindowScroll.bind(this);
        this.checkNeedShowBackground = this.checkNeedShowBackground.bind(this);
    }

    checkNeedShowBackground() {
        return Math.abs(window.pageYOffset) > 4;
    }

    handleWindowScroll() {
        const showBackground = this.checkNeedShowBackground();

        if (this.state.showBackground !== showBackground) {
            this.setState({
                showBackground
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleWindowScroll);

        const showBackground = this.checkNeedShowBackground();

        this.setState({
            showBackground
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleWindowScroll);
    }

    render() {
        let { showBackground } = this.state;

        if (showBackground === null) {
            showBackground = this.checkNeedShowBackground();
        }

        return <RenderHeader hasBackground={showBackground} />;
    }
}

export { Header };