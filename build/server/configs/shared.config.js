const path = require('path');

module.exports = (env, options) => {
    return {
        mode: options.mode || 'development',
        entry: path.resolve(env.ROOT_PATH, 'src/server/index.js'),
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                }
            ]
        },
        resolve: {
            extensions: ['*', '.mjs', '.js', '.vue', '.json', '.gql', '.graphql']
        },
        output: {
            path: path.resolve(env.ROOT_PATH, 'dist/server'),
            publicPath: '/',
            filename: 'index.js'
        },
        target: 'node',
        node: {
            fs: 'empty',
            net: 'empty'
        }
    };
};