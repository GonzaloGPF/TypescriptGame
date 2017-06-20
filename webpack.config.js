let webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [ // or loaders
            { test: /.ts$/, loader: 'awesome-typescript-loader', "exclude": ["node_modules"] }
        ]
    },
    plugins: []
};

if (process.env.ENV === 'prod') {
    module.exports.plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ]
}