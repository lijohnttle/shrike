/**
 * Represents a standard response from the server.
 */
 export class ResponseDto {
    /**
     * @param {ResponseDto} [props] 
     */
    constructor(props) {
        /**
         * The value that indicates if the request was succcessful.
         * @type {Boolean}
         * @public
         */
        this.success = props?.success;
        /**
         * The error message of a failed request.
         * @type {string}
         * @public
         */
        this.errorMessage = props?.errorMessage;
    }

    /**
     * @returns {ResponseDto}
     */
    static success() {
        return new ResponseDto({ success: true });
    }

    /**
     * @param {string} errorMessage The error message.
     * @returns {ResponseDto}
     */
    static fail(errorMessage) {
        return new ResponseDto({ success: false, errorMessage });
    }

    /**
     * @returns {ResponseDto}
     */
    static failUnauthorized() {
        return new ResponseDto({ success: false, errorMessage: 'Unauthorized acceess' });
    }

    /**
     * @returns {ResponseDto}
     */
    static failNotFound() {
        return new ResponseDto({ success: false, errorMessage: 'Resource not found' });
    }
}