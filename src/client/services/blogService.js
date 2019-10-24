import { graphqlApi } from './api';

const GET_BLOG_POSTS = `
    {
        getBlog {
            getPosts {
                id
                title
                description
                publishedOn
                urlSlug
                tags
            }
        }
    }
`;

async function getPosts() {
    const response = await graphqlApi.post('', { query: GET_BLOG_POSTS });
    const posts = response.data.data.getBlog.getPosts;
    return posts;
}

export { getPosts };