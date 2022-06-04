import { BlogFilterCategoryModel } from './BlogFilterCategoryModel';

/**
 * Represents a selected blog filter.
 */
 export class BlogFilterSelectionModel {
    /**
     * @param {BlogFilterSelectionModel} [props]
     */
    constructor(props) {
        /**
         * The list of selected categories.
         * @type {BlogFilterCategoryModel[]}
         * @public
         */
        this.categories = props?.categories || [];

        /**
         * Show unpublished blog posts.
         * @type {Boolean}
         * @public
         */
        this.unpublished = props?.unpublished;
    }
}
