import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Article } from '../../../components/Article';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Page } from '../../../components/Page';
import { useStyles } from './styles';


const NewBlogPostPage = () => {
    const classes = useStyles();
    const [blogPostTitle, setBlogPostTitle] = useState('');
    const [blogPostDescription, setBlogPostDescription] = useState('');
    const [blogPostContent, setBlogPostContent] = useState('');
    const [checked, setChecked] = React.useState(false);


    const createHandler = () => {

    };

    return (
        <Page title="New Blog Post" authenticated>
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
                                <FormControlLabel control={<Checkbox checked={checked} onChange={(e) => setChecked(event.target.checked)} />} label="Publish" />
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="primary" variant="outlined" onClick={createHandler}>PREVIEW</Button>
                            </div>
                            <div className={classes.commandContainer}>
                                <Button color="success" variant="contained" onClick={createHandler}>CREATE</Button>
                            </div>
                        </div>
                    </form>
                </ArticleContentBlock>
            </Article>
        </Page>
    );
};


export {
    NewBlogPostPage
};
