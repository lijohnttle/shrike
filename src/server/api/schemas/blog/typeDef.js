export const typeDef = `
    extend type Query {
        blogPostList(options: BlogPostListOptions): BlogPostListRsponse
        blogPost(slug: String!, userToken: String): BlogPostResponse
    }

    extend type Mutation {
        createBlogPost(blogPost: CreateBlogPostInput!, userToken: String!): EmptyResponse
        changeBlogPost(blogPost: ChangeBlogPostInput!, userToken: String!): EmptyResponse
        deleteBlogPost(blogPostId: String!, userToken: String!): EmptyResponse
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
        category: String
        series: String
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
        category: String
        series: String
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
        category: String
        series: String
        seriesPreviews: [BlogPostPreview]
    }

    type BlogPostPreview {
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
        category: String
        series: String
    }

    type BlogPostListResult {
        blogPosts: [BlogPostPreview]
        totalCount: Int!
    }

    type BlogPostListRsponse {
        success: Boolean!
        result: BlogPostListResult
        errorMessage: String
    }

    type BlogPostResponse {
        success: Boolean!
        blogPost: BlogPost
        errorMessage: String
    }
`;
