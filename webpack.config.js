let webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx','.css']
    },
    module: {

        rules: [ // or loaders
            { test: /.ts$/, loader: 'awesome-typescript-loader', "exclude": ["node_modules"] },
            { test: /\.css$/, use:['style-loader','css-loader']}
        ],

        loaders: [
            { test: /.ts$/, loader: 'awesome-typescript-loader' }
        ]
    },
    plugins: []
};

if (process.env.NODE_ENV === 'prod') {
    module.exports.plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ]
}