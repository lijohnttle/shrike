const typeDef = `
    extend type Query {
        blogPostList(includeUnpublished: Boolean, accessToken: String): BlogPostListResult
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, accessToken: String!): CreateBlogPostResult
    }

    type BlogPostListResult {
        success: Boolean!
        blogPosts: [BlogPostMetadata]
        errorMessage: String
    }

    type BlogPostMetadata {
        id: String!
        title: String!
        slug: String!
        description: String!
        createdOn: String!
        updatedOn: String!
        publishedOn: String
        published: Boolean!
    }

    input CreateBlogPostInput {
        title: String!
        slug: String!
        description: String!
        content: String!
        publish: Boolean
    }

    type CreateBlogPostResult {
        success: Boolean!
        errorMessage: String
    }
`;


export {
    typeDef
};
