import path from 'path';

export default (env, options) => {
    return {
        mode: options.mode || 'development',
        entry: path.resolve(env.ROOT_PATH, 'src/client/index.jsx'),
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: path.resolve(env.ROOT_PATH, 'dist/public/assets'),
            publicPath: '/assets/',
            filename: 'scripts/bundle.js'
        },
    };
};