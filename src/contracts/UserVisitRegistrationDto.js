/**
 * Represents a file attachment.
 */
 export class UserVisitRegistrationDto {
    /**
     * @param {UserVisitDto} [props]
     */
    constructor(props) {
        /**
         * The path to the visited resource.
         * @type {String}
         * @public
         */
        this.path = props?.path;
    }
}