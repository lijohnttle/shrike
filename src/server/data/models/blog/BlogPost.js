import mongoose from 'mongoose';


const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedOn: Date,
    publishedOn: Date,
    published: Boolean
});

blogPostSchema.index({ publishedOn: 1 });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);


export {
    BlogPost
};
