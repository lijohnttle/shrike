import { Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getBlogPostAttachmentUrl } from '../../../utils/urlBuilder';
import { AttachmentModel } from '../../models';


/**
 * 
 * @param {Object} props
 * @param {String} props.blogPostSlug
 * @param {AttachmentModel[]} props.attachments
 */
export const BlogMarkdown = (props) => {
    return (
        <ReactMarkdown
            children={props.children}
            components={{
                img: ({ src, ...otherProps }) => {
                    const linkToAttachment = src.indexOf('/') < 0;

                    if (linkToAttachment) {
                        let url = src;

                        if (props.attachments) {
                            const foundAttachment = props.attachments.find(t => t.name === src);

                            if (foundAttachment) {
                                url = foundAttachment.getUrl();
                            }
                        }
                        else if (props.blogPostSlug) {
                            url = getBlogPostAttachmentUrl(props.blogPostSlug, src);
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