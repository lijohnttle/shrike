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

    type Query {
        getBlogPostPreview(id: ID!): BlogPost
        getBlogPostPreviewByUrl(urlSlug: String!): BlogPost
        getBlogPost(id: ID!): BlogPost
        getBlogPostByUrl(urlSlug: String!): BlogPost
    }
`);

export { schema };