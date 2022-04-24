export class Attachment {
    constructor() {
        /**
         * @type {String}
         * @public
         */
        this.path = undefined;
        
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
    }
}
