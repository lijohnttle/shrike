import React from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useStyles } from './styles';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';


const NewBlogPostForm = ({
        blogPostTitle,
        setBlogPostTitle,
        blogPostSlug,
        setBlogPostSlug,
        blogPostDescription,
        setBlogPostDescription,
        blogPostContent,
        setBlogPostContent,
        blogPostPublish,
        setBlogPostPublish,
        onPreview,
        onCreate
    }) => {

    const classes = useStyles();

    const previewButtonClickHandler = () => {
        onPreview();
    };

    return (
        <Article title="NEW BLOG POST">
            <ArticleContentBlock>
                <form className={classes.form}>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Title"
                            defaultValue={blogPostTitle}
                            onChange={e => setBlogPostTitle(e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Slug"
                            defaultValue={blogPostSlug}
                            onChange={e => setBlogPostSlug(e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Description"
                            multiline
                            maxRows={4}
                            defaultValue={blogPostDescription}
                            onChange={e => setBlogPostDescription(e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Content"
                            multiline
                            rows={16}
                            defaultValue={blogPostContent}
                            onChange={(e) => setBlogPostContent(e.target.value)} />
                    </div>
                    
                    <div className={classes.commandsContainer}>
                        <div className={classes.commandContainer}>
                            <FormControlLabel control={<Checkbox checked={blogPostPublish} onChange={(e) => setBlogPostPublish(e.target.checked)} />} label="Publish" />
                        </div>
                        <div className={classes.commandContainer}>
                            <Button color="primary" variant="outlined" onClick={previewButtonClickHandler}>PREVIEW</Button>
                        </div>
                        <div className={classes.commandContainer}>
                            <Button color="success" variant="contained" onClick={onCreate}>CREATE</Button>
                        </div>
                    </div>
                </form>
            </ArticleContentBlock>
        </Article>
    );
};


export {
    NewBlogPostForm
};
