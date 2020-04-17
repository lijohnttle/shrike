import path from 'path';
import fs from 'fs';

async function parseDataJson(relativePath) {
    const rowData = await new Promise((resolve, reject) => {
        const fileName = path.resolve(process.cwd(), 'dist/data/', relativePath);

        fs.readFile(fileName, (err, data) => {
            if (err) {
                if (process.env.NODE_ENV === 'production') {
                    reject(new Error('File not found'));
                }
                else {
                    reject(err);
                }
            }
            else resolve(data);
        })
    });
    
    return JSON.parse(rowData);
}

export default {
    parseDataJson
};