import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTopOnRouteChanged extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default withRouter(ScrollToTopOnRouteChanged)