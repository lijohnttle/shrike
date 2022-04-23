import { ResponseDto } from './ResponseDto';
import { BlogPostDto } from './BlogPostDto';

/**
 * Represents a blog post.
 */
 export class BlogPostResponseDto extends ResponseDto {
    /**
     * @param {BlogPostResponseDto} [props] 
     */
    constructor(props) {
        super(props);

        /**
         * The list of blog posts.
         * @type {BlogPostDto}
         * @public
         */
        this.blogPost = props?.blogPost;
    }
}
