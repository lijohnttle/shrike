export class Attachment {
    constructor() {
        /**
         * @type {String}
         * @public
         */
        this.name = undefined;
        
        /**
         * @type {Number}
         * @public
         */
        this.size = undefined;
        
        /**
         * @type {Buffer}
         * @public
         */
        this.data = undefined;

        /**
         * @type {String}
         * @public
         */
        this.contentType = undefined;
    }
}
