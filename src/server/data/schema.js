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

    type CvExperience {
        position: String
        employer: String
        date: String
        location: String
        accomplishments: [String]
        tools: [String]
        technologies: [String]
    }

    type CvEducation {
        title: String
        description: String
        date: String
        location: String
    }

    type Cv {
        summary: String
        experience: [CvExperience]
        education: [CvEducation]
    }

    type Project {
        id: Int
        title: String
        category: String
        shortDescription: String
        description: String
    }

    type Query {
        getBlog: Blog
        getCv: Cv
        getProjects: [Project]
    }
`);

export { schema };