/**
 * Represents the context of the controller.
 */
export class ControllerContext {
    /**
     * @param {ControllerContext} props 
     */
    constructor(props) {
        /**
         * @type {String}
         * @public
         */
        this.rootPath = props?.rootPath || process.cwd();
    }
}