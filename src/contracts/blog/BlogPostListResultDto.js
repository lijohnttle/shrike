import { BlogPostPreviewDto } from '../blog';

/**
 * Represents a list of blog posts.
 */
 export class BlogPostListResultDto {
    /**
     * @param {BlogPostListResultDto} [props] 
     */
    constructor(props) {
        /**
         * The list of blog posts.
         * @type {BlogPostPreviewDto[]}
         * @public
         */
        this.blogPosts = props?.blogPosts;

        /**
         * The total number of blog posts for the purpose of pagination.
         * @type {Number}
         * @public
         */
        this.totalCount = props?.totalCount;
    }
}
