import path from 'path';

export default (env, options) => {
    const rootPath = process.env.INIT_CWD;

    return {
        mode: options.mode || 'development',
        entry: path.resolve(rootPath, 'src/client/index.jsx'),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                    resolve: {
                        fullySpecified: false,
                    },
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: path.resolve(rootPath, 'dist/public/assets'),
            publicPath: '/assets/',
            filename: 'scripts/bundle.js'
        },
    };
};