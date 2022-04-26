import { Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getBlogPostAttachmentUrlPath } from '../../../utils/urlBuilder';
import { BlogPostModel } from '../../models';


/**
 * 
 * @param {Object} props
 * @param {BlogPostModel} props.blogPost
 */
export const BlogMarkdown = (props) => {
    let content = props.blogPost.content;

    if (props.blogPost.descriptionImage) {
        content = `![](${props.blogPost.descriptionImage})` + "\n\n" + content;
    }

    return (
        <ReactMarkdown
            children={content}
            components={{
                img: ({ src, ...otherProps }) => {
                    const linkToAttachment = src.indexOf('/') < 0;

                    if (linkToAttachment) {
                        let url = src;

                        if (props.blogPost.attachments) {
                            const foundAttachment = props.blogPost.attachments.find(t => t.name === src);

                            if (foundAttachment) {
                                url = foundAttachment.getUrl();
                            }
                        }
                        else if (props.blogPost.slug) {
                            url = getBlogPostAttachmentUrlPath(props.blogPostSlug, src);
                        }

                        return (
                            <img src={url} {...otherProps} style={{ maxWidth: '100%' }} />
                        );
                    }
                },
                p:  (elementProps) => {
                    return (<Typography variant="body1" paragraph sx={{ marginTop: 1, marginBottom: 2 }}>{elementProps.children}</Typography>)
                },
                h2: (elementProps) => {
                    return (<Typography variant="h2" sx={{ marginTop: 4, marginBottom: 2 }}>{elementProps.children}</Typography>)
                },
                h3: (elementProps) => {
                    return (<Typography variant="h3" sx={{ marginTop: 1, marginBottom: 2 }}>{elementProps.children}</Typography>)
                },
                h4: (elementProps) => {
                    return (<Typography variant="h4" sx={{ marginTop: 1, marginBottom: 2 }}>{elementProps.children}</Typography>)
                },
            }}
            />
    )
};