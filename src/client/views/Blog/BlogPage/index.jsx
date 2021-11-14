import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { ArticleContentBlock } from '../../../components/ArticleContentBlock';
import { Article } from '../../../components/Article';
import { Page } from '../../../components/Page';
import { BlogPostMeta } from '../BlogPostMeta';
import { BlogToolBar } from '../BlogToolBar';


/**
 * 
 * @param {Number} page The number of page.
 * @param {Number} pageSize The number of posts on a page.
 * @returns {Array} Array of blog posts.
 */
// async function loadBlogPostsList(page, pageSize) {
//     return [
//         {
//             id: '0',
//             title: 'How to grow dragons',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper augue libero, et feugiat ex tempor vitae. Quisque eget justo consequat, semper sapien nec, vehicula nulla. Etiam fringilla hendrerit orci tristique cursus. Quisque maximus sapien sapien, at placerat justo ullamcorper feugiat. Duis tempus vehicula libero, ut condimentum diam cursus id. Donec erat turpis, euismod non nisl sed, feugiat ullamcorper velit. Aliquam ullamcorper metus in molestie posuere. Quisque vel convallis lorem. Sed pellentesque sed purus in venenatis. Ut non risus tellus. Morbi id felis ut tellus interdum ullamcorper. Phasellus ullamcorper eros ac sapien accumsan, vel sollicitudin tellus rutrum. Quisque bibendum arcu et commodo rhoncus. Quisque consectetur est sed odio vehicula tempor.',
//             slug: 'how_to_grow_dragons',
//             createdOn: new Date(),
//             updatedOn: new Date(),
//             publishedOn: new Date(),
//             published: true,
//         },
//         {
//             id: '1',
//             title: 'How to kill orks',
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper augue libero, et feugiat ex tempor vitae. Quisque eget justo consequat, semper sapien nec, vehicula nulla. Etiam fringilla hendrerit orci tristique cursus. Quisque maximus sapien sapien, at placerat justo ullamcorper feugiat. Duis tempus vehicula libero, ut condimentum diam cursus id. Donec erat turpis, euismod non nisl sed, feugiat ullamcorper velit. Aliquam ullamcorper metus in molestie posuere. Quisque vel convallis lorem. Sed pellentesque sed purus in venenatis. Ut non risus tellus. Morbi id felis ut tellus interdum ullamcorper. Phasellus ullamcorper eros ac sapien accumsan, vel sollicitudin tellus rutrum. Quisque bibendum arcu et commodo rhoncus. Quisque consectetur est sed odio vehicula tempor.',
//             slug: 'how_to_kill_orks',
//             createdOn: new Date(),
//             updatedOn: new Date(),
//             publishedOn: new Date(),
//             published: true,
//         },
//     ];
// }

function renderBlogPostsPlaceholder() {
    return (
        <ArticleContentBlock compact>
            <Typography variant="h3" align="center">
                There are no posts yet
            </Typography>
        </ArticleContentBlock>
    );
}

const BlogPage = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    // useEffect(() => {
    //     loadBlogPostsList()
    //         .then((data) => setBlogPosts(data))
    //         .catch((error) => console.error(error));
    // }, []);

    return (
        <Page title="Blog">
            <Article title="BLOG">
                <BlogToolBar />

                {blogPosts.length > 0
                    ? blogPosts.map((post) => (
                        <ArticleContentBlock key={post.id} compact>
                            <BlogPostMeta post={post} />
                        </ArticleContentBlock>
                    ))
                    : renderBlogPostsPlaceholder()}
            </Article>
        </Page>
    )
};


export {
    BlogPage
};
