const typeDef = `
    extend type Query {
        blogPostList(includeUnpublished: Boolean, accessToken: String): BlogPostListResult
        blogPost(slug: String!, accessToken: String): BlogPostResult
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, accessToken: String!): CreateBlogPostResult
        editBlogPost(blogPost: EditBlogPostInput!, accessToken: String!): EditBlogPostResult
    }
    
    input CreateBlogPostInput {
        title: String!
        slug: String!
        description: String!
        content: String!
        publish: Boolean
    }

    input EditBlogPostInput {
        id: String!
        title: String!
        slug: String!
        description: String!
        content: String!
        publish: Boolean
    }

    type BlogPost {
        id: String!
        title: String!
        content: String!
        description: String!
        slug: String!
        createdOn: String!
        updatedOn: String!
        publishedOn: String
        published: Boolean!
    }

    type BlogPostMetadata {
        id: String!
        title: String!
        description: String!
        slug: String!
        createdOn: String!
        updatedOn: String!
        publishedOn: String
        published: Boolean!
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

    type EditBlogPostResult {
        success: Boolean!
        errorMessage: String
    }
`;


export {
    typeDef
};
