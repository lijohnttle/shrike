import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useStyles } from './styles';
import ReactMarkdown from 'react-markdown';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';


const NewBlogPostPreview = ({
        blogPostTitle,
        blogPostContent,
        blogPostPublish,
        onEdit,
        onCreate
    }) => {

    const classes = useStyles();

    const editButtonClickHandler = () => {
        onEdit();
    };

    return (
        <Article title={blogPostTitle.toUpperCase()} compact>
            <ArticleContentBlock>
                <div className={classes.contentRoot}>
                    <ReactMarkdown children={blogPostContent} />

                    <form className={classes.form}>
                        <div className={classes.commandsContainer}>
                            <div className={classes.commandContainer}>
                                <FormControlLabel control={<Checkbox checked={blogPostPublish} onChange={(e) => setBlogPostPublish(e.target.checked)} />} label="Publish" />
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="primary" variant="outlined" onClick={editButtonClickHandler}>EDIT</Button>
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="success" variant="contained" onClick={onCreate}>CREATE</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </ArticleContentBlock>
        </Article>
    );
};


export {
    NewBlogPostPreview
};
