import { BlogPostModel } from './BlogPostModel';

/**
 * Represents a blog post list.
 */
 export class BlogPostListModel {
    /**
     * @param {BlogPostListModel} [props]
     */
    constructor(props) {
        /**
         * The list of blog posts.
         * @type {BlogPostModel[]}
         * @public
         */
        this.blogPosts = props?.blogPosts;

        /**
         * The total number of blog posts.
         * @type {String}
         * @public
         */
        this.totalCount = props?.totalCount;
    }
}
