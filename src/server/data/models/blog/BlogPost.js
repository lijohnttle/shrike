import mongoose from 'mongoose';
import { Attachment } from '../Attachment';


const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    descriptionImage: String,
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
    updatedOn: {
        type: Date,
        default: Date.now,
        required: true,
    },
    publishedOn: Date,
    published: Boolean,
    attachments: [{
        name: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        data: {
            type: Buffer,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
    }],
});

blogPostSchema.index({ publishedOn: 1 });
blogPostSchema.index({ slug: 1 }, { unique: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

class BlogPostDocument extends mongoose.Document {
    constructor() {
        /**
         * @type {String}
         * @public
         */
        this.title = undefined;
        
        /**
         * @type {String}
         * @public
         */
        this.description = undefined;

        /**
         * @type {String}
         * @public
         */
         this.descriptionImage = undefined;
        
        /**
         * @type {String}
         * @public
         */
        this.content = undefined;
        
        /**
         * @type {String}
         * @public
         */
        this.slug = undefined;
        
        /**
         * @type {Date}
         * @public
         */
        this.createdOn = undefined;
        
        /**
         * @type {Date}
         * @public
         */
        this.updatedOn = undefined;
        
        /**
         * @type {Date}
         * @public
         */
        this.publishedOn = undefined;
        
        /**
         * @type {Boolean}
         * @public
         */
        this.published = undefined;
        
        /**
         * @type {Attachment[]}
         * @public
         */
        this.attachments = undefined;
    }
}


export {
    BlogPost,
    BlogPostDocument,
};
