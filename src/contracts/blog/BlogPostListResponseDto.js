import { ResponseDto } from '../ResponseDto';
import { BlogPostListResultDto } from './BlogPostListResultDto';

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
         * The result of the request.
         * @type {BlogPostListResultDto}
         * @public
         */
        this.result = props?.result;
    }
}
