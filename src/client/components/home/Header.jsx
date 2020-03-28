import React from 'react';
import { HeaderBar } from '../common/HeaderBar';

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

        return <HeaderBar hasBackground={showBackground} hasFixedPosition={true} />;
    }
}

export { Header };