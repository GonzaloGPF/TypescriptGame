let webpack = require('webpack');
let path = require('path');
let glob = require('glob');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let PurifyCSSPlugin = require('purifycss-webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let WebpackAssetsManifest = require('webpack-assets-manifest');

let inProduction = (process.env.NODE_ENV === 'prod');

module.exports = {
    entry: {
        app: [
            './src/app.ts',
            './src/app.scss'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx','.css']
    },
    module: {

        rules: [ // or loaders
            {
                test: /.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader', 'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                use: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader', // when providing 'options' you must use 'loader' key instead of 'use'
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },
                    'img-loader'
                ],

            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"), // [name].[chunkhash].css
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'index.html')),
            minimize: inProduction
        }),
        new CleanWebpackPlugin(['src/dist/*'], {
            root: __dirname,
            // exclude:  ['shared.js'],
            verbose:  true,
            dry:      false
        }),
        new WebpackAssetsManifest({
            output: 'manifest.json',
            replacer: null,
            space: 2,
            writeToDisk: false,
            fileExtRegex: /\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,
            sortManifest: true,
            merge: false,
            publicPath: null,
            customize: null,
            contextRelativeKeys: false,
        })

        // function(){
        //     this.plugin('done', stats => {
        //         require('fs').writeFileSync(
        //             path.join(__dirname, 'src/dist/manifest.json'),
        //             JSON.stringify(stats.toJson().assetsByChunkName)
        //         )
        //     })
        // }
    ]
};

// Creo que no es necesario, al usar webpack -p se minifica sin necesidad de realizar esta configuración
// if (inProduction) {
//     module.exports.plugins = [
//         new webpack.optimize.UglifyJsPlugin()
//     ]
// }