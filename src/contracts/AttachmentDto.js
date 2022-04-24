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
        this.name = props?.name;

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

        /**
         * The content type of an attachment.
         * @type {String}
         * @public
         */
        this.contentType = props?.contentType;

        /**
         * The URL of the resource.
         * @type {String}
         * @public
         */
        this.url = props?.url;
    }
}