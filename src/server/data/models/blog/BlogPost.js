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
    visits: Number,
});

blogPostSchema.index({ publishedOn: 1 });
blogPostSchema.index({ slug: 1 }, { unique: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

BlogPost.syncIndexes();

class BlogPostDocument extends mongoose.Document {
    /**
     * @param {BlogPostDocument} document 
     */
    constructor(document) {
        /**
         * @type {String}
         * @public
         */
        this.title = document?.title;
        
        /**
         * @type {String}
         * @public
         */
        this.description = document?.description;

        /**
         * @type {String}
         * @public
         */
         this.descriptionImage = document?.descriptionImage;
        
        /**
         * @type {String}
         * @public
         */
        this.content = document?.content;
        
        /**
         * @type {String}
         * @public
         */
        this.slug = document?.slug;
        
        /**
         * @type {Date}
         * @public
         */
        this.createdOn = document?.createdOn;
        
        /**
         * @type {Date}
         * @public
         */
        this.updatedOn = document?.updatedOn;
        
        /**
         * @type {Date}
         * @public
         */
        this.publishedOn = document?.publishedOn;
        
        /**
         * @type {Boolean}
         * @public
         */
        this.published = document?.published;
        
        /**
         * @type {Attachment[]}
         * @public
         */
        this.attachments = document?.attachments;

        /**
         * @type {Number}
         * @public
         */
        this.visits = undefined;
    }
}


export {
    BlogPost,
    BlogPostDocument,
};
