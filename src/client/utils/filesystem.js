/**
 * Reads file into Base64 string.
 * @param {File} file 
 * @returns {Promise<String>}
 */
export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var result = reader.result;
        var matches = result.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        if (matches.length !== 3) 
        {
            throw new Error('Invalid input string');
        }

        resolve(matches[2]);
    };
    reader.onerror = error => reject(error);
});
