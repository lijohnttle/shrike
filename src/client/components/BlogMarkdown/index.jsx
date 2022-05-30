import { Box, Link, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeRaw from 'rehype-raw';
import { getBlogPostAttachmentUrlPath } from '../../../utils/urlBuilder';
import { BlogPostModel } from '../../models';
import { colors } from '../../themes';


/**
 * @param {String} query 
 * @param {Object} props 
 * @param {Theme} theme 
 */
function parseImageProps(query, props, theme) {
    const keyValues = query.split('&');

    for (let keyValue of keyValues) {
        const [key, value] = keyValue.split('=').map(t => t.trim());

        if (key === 'size') {
            if (value === 'small') {
                props.maxHeight = 'calc(0.66*100vh)';
            }
            else if (value === 'fit') {
                props.maxHeight = 'calc(100vh)';
            }
        }
        else if (key === align) {
            if (value === 'center') {
                props.alignSelf = 'center';
            }
        }
    }
}

/**
 * @param {String} url 
 * @param {BlogPostModel} blogPost 
 */
function parseUrl(url, blogPost) {
    let resultUrl = url;
    let query = '';

    const linkToAttachment = url.indexOf('/') < 0;

    if (linkToAttachment) {
        let urlParts = url.split('?');
        let attachmentName = urlParts[0];

        if (blogPost.attachments) {
            const foundAttachment = blogPost.attachments.find(t => t.name === attachmentName);

            if (foundAttachment) {
                resultUrl = foundAttachment.getUrl();
            }
        }
        else if (blogPost.slug) {
            resultUrl = getBlogPostAttachmentUrlPath(blogPost.slug, src);
        }

        if (urlParts.length > 1) {
            query = urlParts[1];
        }
    }

    return {
        url: resultUrl,
        query: query
    };
}

/**
 * @param {Object} param0 
 * @param {BlogPostModel} param0.blogPost 
 * @returns 
 */
function RenderDescription({ blogPost }) {
    return (
        <Typography variant="body1" fontStyle="italic" margin="1em 0">
            {blogPost.description}
        </Typography>
    );
}

/**
 * 
 * @param {Object} props
 * @param {BlogPostModel} props.blogPost
 */
export const BlogMarkdown = (props) => {
    const theme = useTheme();

    let content = props.blogPost.content;
    let descriptionImageContent = '';
    let descriptionContent = '';

    if (props.blogPost.descriptionImage) {
        descriptionImageContent = `![](${props.blogPost.descriptionImage})` + "\n\n";
    }

    if (props.blogPost.description) {
        descriptionContent = `![](##description)` + "\n\n";
    }

    content = descriptionImageContent + descriptionContent + content;

    return (
        <ReactMarkdown
            children={content}
            rehypePlugins={[RehypeRaw]}
            components={{
                a: ({ href, ...otherProps }) => {
                    const parsedUrl = parseUrl(href, props.blogPost);

                    return <Link href={parsedUrl.url} {...otherProps} />;
                },
                img: ({ src, ...otherProps }) => {
                    if (src === '##description') {
                        return <RenderDescription blogPost={props.blogPost} />;
                    }

                    const parsedUrl = parseUrl(src, props.blogPost);
                    const customProps = { };

                    if (parsedUrl.query) {
                        parseImageProps(parsedUrl.query, customProps, theme);
                    }

                    return (
                        <Box display="flex" flexDirection="column" alignItems="center" marginBottom={3}>
                            <img src={parsedUrl.url} {...otherProps} style={{ maxWidth: '100%', ...customProps }} />

                            {otherProps.alt
                                ? (
                                    <Typography fontWeight="bold" marginTop={1} sx={{ fontSize: '0.8em' }}>
                                        Picture - {otherProps.alt}
                                    </Typography>
                                ) : null}
                            
                        </Box>
                    );
                },
                p:  (elementProps) => {
                    // unwrap images
                    if (elementProps.children
                        && elementProps.children.length === 1
                        && elementProps.children[0].props
                        && elementProps.children[0].props.src) { // rendering media without p wrapper
                    
                        return elementProps.children;
                    }

                    return (
                        <Typography variant="body1" paragraph sx={{ overflow: 'auto', marginTop: 0, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h2: (elementProps) => {
                    return (
                        <Typography variant="h2" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 6, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h3: (elementProps) => {
                    return (
                        <Typography variant="h3" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 6, marginBottom: 3 }}>
                            {elementProps.children}
                        </Typography>)
                },
                h4: (elementProps) => {
                    return (
                        <Typography variant="h4" fontWeight="bold" sx={{ overflow: 'auto', marginTop: 4, marginBottom: 2 }}>
                            {elementProps.children}
                        </Typography>)
                },
                ul: (elementProps) => {
                    return (
                        <ul style={{ overflow: 'auto' }}>
                            {elementProps.children}
                        </ul>)
                },
                blockquote: (elementProps) => {
                    return (
                        <blockquote
                            style={{
                                color: colors.grayText,
                                fontStyle: 'italic',
                                margin: 0,
                                padding: '0.5em 40px',
                                background: 'whitesmoke',
                                borderLeft: `8px solid ${colors.grayText}`,
                            }}>
                            {elementProps.children}
                        </blockquote>);
                },
                pre: (elementProps) => {
                    return (
                        <pre
                            style={{
                                background: colors.backgroundComplementary,
                                color: colors.textComplementary,
                                overflowX: 'auto',
                                marginLeft: theme.spacing(-1),
                                marginRight: theme.spacing(-1),
                                paddingLeft: theme.spacing(1),
                                paddingRight: theme.spacing(1),
                                paddingTop: theme.spacing(2),
                                paddingBottom: theme.spacing(2),
                                fontSize: '0.85em',
                            }}>
                            {elementProps.children}
                        </pre>
                    );
                },
                code: (elementProps) => {
                    return (
                        <code>
                            {elementProps.children}
                        </code>
                    );
                },
            }}
        />
    )
};