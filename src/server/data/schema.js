import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type BlogPost {
        id: ID!
        title: String
        description: String
        content: String
        publishedOn: String
        isVisible: Boolean
        urlSlug: String
    }

    type Blog {
        getPosts: [BlogPost]
        getBlogPostPreview(id: ID!): BlogPost
        getBlogPostPreviewByUrl(urlSlug: String!): BlogPost
        getBlogPost(id: ID!): BlogPost
        getBlogPostByUrl(urlSlug: String!): BlogPost
    }

    type Query {
        getBlog: Blog
    }
`);

export { schema };