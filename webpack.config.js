let webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx','.css']
    },
    module: {
        rules:[
            { test: /\.css$/, use:['style-loader','css-loader']}
        ],
        loaders: [
            { test: /.ts$/, loader: 'awesome-typescript-loader' },
        ]
    }
};