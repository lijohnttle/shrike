import path from 'path';

export default {
    rootDir: path.join(process.cwd(), '/src'),
    setupFiles: [
        path.join(process.cwd(), '/src/tests/setup-tests.js'),
    ],
    testEnvironment: 'node'
};
