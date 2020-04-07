import path from 'path';
import fs from 'fs';

async function getCv() {
    const cvDataRaw = await new Promise((resolve, reject) => {
        const fileName = path.resolve(process.cwd(), `data/cv/cv.json`);

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
    
    return JSON.parse(cvDataRaw);
}

export default {
    getCv
};