import { BlogFilterCategoryModel } from './BlogFilterCategoryModel';

/**
 * Represents a blog filter.
 */
 export class BlogFilterModel {
    /**
     * @param {BlogFilterModel} [props]
     */
    constructor(props) {
        /**
         * The list of categories.
         * @type {BlogFilterCategoryModel[]}
         * @public
         */
        this.categories = props?.categories;
    }

    /**
     * Finds a category that represents all categories.
     * @returns {BlogFilterCategoryModel}
     */
    findAllCategory() {
        return this.categories.find(c => c.all);
    }
}