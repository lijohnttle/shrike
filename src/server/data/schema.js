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
        tags: [String]
    }

    type Blog {
        getPosts: [BlogPost]
        getPostPreview(id: ID!): BlogPost
        getPostPreviewByUrl(urlSlug: String!): BlogPost
        getPost(id: ID!): BlogPost
        getPostByUrl(urlSlug: String!): BlogPost
    }

    type Query {
        getBlog: Blog
    }
`);

export { schema };