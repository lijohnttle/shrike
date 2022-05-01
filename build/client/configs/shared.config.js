import path from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';


function clearScripts(rootPath) {
    try {
        const directory = path.resolve(rootPath, 'dist/public/assets/scripts');

        if (fs.existsSync(directory)) {
            const files = fs.readdirSync(directory);
    
            for (const file of files) {
                fs.unlinkSync(path.join(directory, file));
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

export default (env, options) => {
    const rootPath = process.env.INIT_CWD;

    clearScripts(rootPath);

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