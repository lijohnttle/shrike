/**
 * Represents an attached file.
 */
export class AttachmentModel {
    /**
     * @param {AttachmentModel} [props]
     */
    constructor(props) {
        /**
         * Path to the resource. If the source is 'internal', then it uses path relative to the website domain.
         * @type {String}
         * @public
         */
        this.name = props?.name;

        /**
         * The size of attached data in bytes.
         * @type {Number}
         * @public
         */
        this.size = props?.size;

        /**
         * The attachment data.
         * @type {String}
         * @public
         */
        this.data = props?.data;

        /**
         * The content type.
         * @type {String}
         * @public
         */
        this.contentType = props?.contentType;

        /**
         * The local file.
         * @type {File}
         * @public
         */
        this.file = props?.file;

        /**
         * The URL to the resource.
         * @type {String}
         * @public
         */
        this.url = props?.url;
    }

    /**
     * Creates attachment from a local file.
     * @param {File} file 
     */
    static createFromFile(file) {
        return new AttachmentModel({
            name: encodeURI(file.name),
            size: file.size,
            file: file,
            contentType: file.type,
        });
    }
}
