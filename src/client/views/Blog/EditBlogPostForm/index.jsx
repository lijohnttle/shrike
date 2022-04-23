import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useStyles } from './styles';
import { Article } from '../../../components/Article';
import { ContentBlock } from '../../../components/ContentBlock';
import { BlogPostModel } from '../../../models/BlogPostModel';


/**
 * @readonly
 * @enum {String}
 */
const EditMode = {
    create: 'create',
    edit: 'edit',
};

/**
 * Callback for blog post changes notifications.
 *
 * @callback onBlogPostChanged
 * @param {string} key The name of a changed property.
 * @param {any} value The new value of a changed property.
 */

/**
 * Form for editing an existing or adding a new blog post.
 * @param {Object} props 
 * @param {EditMode} props.mode
 * @param {BlogPostModel} props.blogPost
 * @param {onBlogPostChanged} props.onChange
 * @param {Function} props.onPreview
 * @param {Function} props.onSave
 */
const EditBlogPostForm = (props) => {

    const classes = useStyles();

    const previewButtonClickHandler = () => {
        props.onPreview();
    };

    return (
        <Article title={props.mode === EditMode.create ? 'NEW BLOG POST' : 'EDIT BLOG POST'}>
            <ContentBlock>
                <form className={classes.form}>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Title"
                            name="title"
                            defaultValue={props.blogPost.title}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Slug"
                            name="slug"
                            defaultValue={props.blogPost.slug}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Description"
                            multiline
                            maxRows={4}
                            name="description"
                            defaultValue={props.blogPost.description}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </div>
                    <div className={classes.fieldContainer}>
                        <TextField
                            required
                            label="Content"
                            multiline
                            rows={16}
                            name="content"
                            defaultValue={props.blogPost.content}
                            onChange={e => props.onChange(e.target.name, e.target.value)} />
                    </div>
                    
                    <div className={classes.commandsContainer}>
                        <div className={classes.commandContainer}>
                            <FormControlLabel
                                control={<Checkbox checked={props.blogPost.published}
                                name="published"
                                onChange={(e) => props.onChange(e.target.name, e.target.checked)} />}
                                label="Publish" />
                        </div>
                        <div className={classes.commandContainer}>
                            <Button color="primary" variant="outlined" onClick={previewButtonClickHandler}>PREVIEW</Button>
                        </div>
                        <div className={classes.commandContainer}>
                            <Button color="success" variant="contained" onClick={props.onSave}>
                                {props.mode === EditMode.create ? 'CREATE' : 'SAVE'}
                            </Button>
                        </div>
                    </div>
                </form>
            </ContentBlock>
        </Article>
    );
};

EditBlogPostForm.propTypes = {
    mode: PropTypes.oneOf(Object.values(EditMode)),
    blogPost: PropTypes.instanceOf(BlogPostModel),
    onChange: PropTypes.func,
    onPreview: PropTypes.func,
    onSave: PropTypes.func,
};

EditBlogPostForm.modes = EditMode;


export {
    EditBlogPostForm,
};
