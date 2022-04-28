import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
            filename: 'scripts/bundle.[contenthash].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(rootPath, 'dist/templates/index.html'),
                filename: path.resolve(rootPath, 'dist/public/index.html'),
            })
        ]
    };
};