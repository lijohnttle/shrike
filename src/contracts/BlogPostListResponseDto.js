import { ResponseDto } from './ResponseDto';
import { BlogPostDto } from './BlogPostDto';

/**
 * Represents a list of blog posts.
 */
 export class BlogPostListResponseDto extends ResponseDto {
    /**
     * @param {BlogPostListResponseDto} [props] 
     */
    constructor(props) {
        super(props);

        /**
         * The list of blog posts.
         * @type {BlogPostDto[]}
         * @public
         */
        this.blogPosts = props?.blogPosts;
    }
}
