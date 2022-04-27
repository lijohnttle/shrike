/**
 * The model of an page descriptor.
 */
export class PageDescriptiorModel {
    /**
     * @param {PageDescriptiorModel} props 
     */
    constructor(props) {
        /**
         * Code name of the page.
         * @type {String}
         * @public
         */
        this.name = props?.name;

        /**
         * Display name of the page.
         * @type {String}
         * @public
         */
        this.title = props?.title;

        /**
         * Path to the page.
         * @type {String}
         * @public
         */
        this.path = props?.path;
        
        /**
         * Parent page name.
         * @type {String}
         * @public
         */
        this.parent = props?.parent;
    }
}