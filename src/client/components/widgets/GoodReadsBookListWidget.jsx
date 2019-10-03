import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Box, Link, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .gr_grid_book_container': {
            float: 'left',
            width: '98px',
            height: '160px',
            padding: '0 8px 8px 0',
            overflow: 'hidden'
        },
        '& h2, & .gr_grid_branding': {
            display: 'none'
        }
    }
}));

const RenderWidget = ({ shelf }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div id={`gr_grid_widget_${shelf}`}></div>
        </div>
    );
};

class GoodReadsBookListWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            booksLoading: true
        };

        this._rootRef = React.createRef();
        this.handleBooksLoaded = this.handleBooksLoaded.bind(this);
    }

    handleBooksLoaded() {
        this.setState({
            booksLoading: false
        });
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.src = `https://www.goodreads.com/review/grid_widget/${this.props.userId}?cover_size=medium&hide_link=&hide_title=&num_books=${this.props.count}&order=d&shelf=${this.props.shelf}&sort=date_added&widget_id=${this.props.shelf}`;
        script.async = true;
        script.innerHTML = '';
        script.onload = this.handleBooksLoaded;
        this._rootRef.current.appendChild(script);
    }

    render() {
        return (
            <div ref={this._rootRef}>
                <Box mb={2}>
                    <Typography variant="h4" display="inline">
                        {`${this.props.count} ${this.props.title}  `}
                    </Typography>

                    <Link href={`https://www.goodreads.com/review/list/${this.props.userId}?shelf=${this.props.shelf}`} target="_blank">
                        <Typography variant="h6" display="inline">
                            {`(see all)`}
                        </Typography>
                    </Link>
                </Box>

                <RenderWidget shelf={this.props.shelf} />

                {this.state.booksLoading ? <CircularProgress /> : null}
            </div>
        );
    }
};

GoodReadsBookListWidget.propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired
};

export { GoodReadsBookListWidget };