/**
 * Represents a file attachment.
 */
 export class AttachmentDto {
    /**
     * @param {AttachmentDto} [props]
     */
    constructor(props) {
        /**
         * The name of an attachment.
         * @type {String}
         * @public
         */
        this.path = props?.path;

        /**
         * The size of an attachment.
         * @type {String}
         * @public
         */
        this.size = props?.size;

        /**
         * The data of an attachment.
         * @type {String}
         * @public
         */
        this.data = props?.data;
    }
}