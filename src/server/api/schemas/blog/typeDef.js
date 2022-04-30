const typeDef = `
    extend type Query {
        blogPostList(options: BlogPostListOptions): BlogPostListRsponse
        blogPost(slug: String!, userToken: String): BlogPostResult
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, userToken: String!): EmptyResult
        changeBlogPost(blogPost: ChangeBlogPostInput!, userToken: String!): EmptyResult
        deleteBlogPost(blogPostId: String!, userToken: String!): EmptyResult
    }

    input BlogPostListOptions {
        unpublished: Boolean
        userToken: String
        skip: Int
        take: Int
    }
    
    input CreateBlogPostInput {
        title: String!
        slug: String!
        description: String!
        descriptionImage: String
        content: String!
        published: Boolean
        attachments: [FileAttachmentInput]
    }

    input ChangeBlogPostInput {
        id: String!
        title: String!
        slug: String!
        description: String!
        descriptionImage: String
        content: String!
        published: Boolean
        attachments: [FileAttachmentInput]
    }

    type BlogPost {
        id: String!
        title: String!
        content: String!
        description: String!
        descriptionImage: String
        slug: String!
        createdOn: String!
        updatedOn: String!
        publishedOn: String
        published: Boolean!
        attachments: [FileAttachmentOutput]
        visits: Int
    }

    type BlogPostMetadata {
        id: String!
        title: String!
        description: String!
        descriptionImage: String
        slug: String!
        createdOn: String!
        updatedOn: String!
        publishedOn: String
        published: Boolean!
        visits: Int
    }

    type BlogPostListResult {
        blogPosts: [BlogPostMetadata]
        totalCount: Int!
    }

    type BlogPostListRsponse {
        success: Boolean!
        result: BlogPostListResult
        errorMessage: String
    }

    type BlogPostResult {
        success: Boolean!
        blogPost: BlogPost
        errorMessage: String
    }
`;


export {
    typeDef
};
