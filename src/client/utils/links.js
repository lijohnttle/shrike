/**
 * Builds a final link according to vendor's name.
 * @param {String} vendor Vendor's name.
 * @param {String} value Original link.
 */
export const buildUrlByVendor = (vendor, value) => {
    switch (vendor) {
        case 'email':
            return `mailto:${value}`;
        default:
            return value;
    }
};
