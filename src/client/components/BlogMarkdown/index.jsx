import React from 'react';
import ReactMarkdown from 'react-markdown';
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
                            url = `/content/blog/${props.blogPostSlug}/attachments/${src}`;
                        }

                        return (
                            <img src={url} {...otherProps} style={{ maxWidth: '100%' }} />
                        );
                    }
                },
            }}
            />
    )
};