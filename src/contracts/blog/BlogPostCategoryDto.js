/**
 * Represents a blog category.
 */
 export class BlogPostCategoryDto {
    /**
     * @param {BlogPostCategoryDto} [props] 
     */
    constructor(props) {
        /**
         * The category name.
         * @type {String}
         * @public
         */
        this.name = props?.name;

        /**
         * Determines if the category represents all categories.
         * @type {String}
         * @public
         */
        this.all = props?.all;

        /**
         * Determines if the category represents no category.
         * @type {String}
         * @public
         */
        this.none = props?.none;
    }
}
