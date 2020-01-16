let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin");

let conf = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './public/'),
        filename: 'index.js',
        publicPath: "public/"
    },
    devServer: {
        overlay:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-react-jsx"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        })
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production ? false : 'eval-sourcemap';
    return conf;
};
