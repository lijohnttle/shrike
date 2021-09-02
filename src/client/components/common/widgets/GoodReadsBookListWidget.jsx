import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography, Box, Link, CircularProgress, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    hiddenWidgetRoot: {
        display: 'none'
    },
    list: {
        overflow: 'hidden',
        padding: theme.spacing(1)
    },
    card: {
        display: 'block',
        float: 'left',
        width: '98px',
        height: '160px',
        margin: '0 8px 8px 0',
        overflow: 'hidden',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        }
    }
}));

const LoadWidget = ({ shelf }) => {
    const classes = useStyles();

    return (
        <div className={classes.hiddenWidgetRoot} id={`gr_grid_widget_${shelf}`}>
        </div>
    );
};

const RenderBooks = ({ shelf }) => {
    const loadedWidget = document.getElementById(`gr_grid_widget_${shelf}`);
    
    if (!loadedWidget) {
        return null;
    }

    const classes = useStyles();
    const links = Array.prototype.slice.call(loadedWidget.querySelectorAll('.gr_grid_book_container>a'));

    return (
        <Grid container className={classes.list}>
            {links.map(a => (
                <Grid item key={a.href}>
                    <Link href={a.href} title={a.title} rel={a.rel} className={classes.card}>
                        <img alt={a.title} border={0} src={a.firstChild.src}></img>
                    </Link>
                </Grid>
            ))}
        </Grid>
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
        script.src = `https://www.goodreads.com/review/grid_widget/${this.props.userId}?cover_size=medium&hide_link=true&hide_title=true&num_books=${this.props.count}&order=d&shelf=${this.props.shelf}&sort=date_added&widget_id=${this.props.shelf}`;
        script.async = true;
        script.innerHTML = '';
        script.onload = this.handleBooksLoaded;
        this._rootRef.current.appendChild(script);
    }

    render() {
        return (
            <div ref={this._rootRef}>
                <Box mb={2}>
                    <Typography variant="h2" display="inline">
                        {`${this.props.title}  `}
                    </Typography>

                    <Link href={`https://www.goodreads.com/review/list/${this.props.userId}?shelf=${this.props.shelf}`} target="_blank">
                        <Typography variant="h3" display="inline">
                            {`(see all)`}
                        </Typography>
                    </Link>
                </Box>

                <LoadWidget shelf={this.props.shelf} />
                
                {this.state.booksLoading
                    ? <CircularProgress />
                    : <RenderBooks shelf={this.props.shelf} />}
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