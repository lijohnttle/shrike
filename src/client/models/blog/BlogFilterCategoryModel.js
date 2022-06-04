/**
 * Represents a blog category in the blog filter.
 */
export class BlogFilterCategoryModel {
    /**
     * @param {BlogFilterCategoryModel} [props]
     */
    constructor(props) {
        /**
         * The name of the category.
         * @type {String}
         * @public
         */
        this.name = props?.name;

        /**
         * The value that determines if this category represents all categories.
         * @type {Boolean}
         * @public
         */
        this.all = props?.all;
    }

    displayName() {
        if (this.all) {
            return 'All';
        }

        if (!this.name) {
            return 'None';
        }

        return this.name;
    }
}