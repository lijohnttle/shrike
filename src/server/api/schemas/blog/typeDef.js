const typeDef = `
    extend type Query {
        blogPostList(includeUnpublished: Boolean, accessToken: String): BlogPostListResult
        blogPost(slug: String!, accessToken: String): BlogPostResult
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, accessToken: String!): CreateBlogPostResult
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

    type BlogPost {
        metadata: BlogPostMetadata!
        content: String!
    }

    input CreateBlogPostInput {
        title: String!
        slug: String!
        description: String!
        content: String!
        publish: Boolean
    }

    type BlogPostListResult {
        success: Boolean!
        blogPosts: [BlogPostMetadata]
        errorMessage: String
    }

    type BlogPostResult {
        success: Boolean!
        blogPost: BlogPost
        errorMessage: String
    }

    type CreateBlogPostResult {
        success: Boolean!
        errorMessage: String
    }
`;


export {
    typeDef
};
