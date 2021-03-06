var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var env = process.env.NODE_ENV;

var vendors_dir = path.join(__dirname, "/Scripts/vendors");

var config = {
    devtool: 'eval',
    entry: {
        app_desktop: [
            './Scripts/desktop/app.js'
        ],
        vendors: [
            "babel-polyfill", "es5-sham", "es5-shim", "es6-promise", "fetch",
            "jquery",
            "react", "react-dom","fetch"]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|vendors)/,
                loader: 'babel',
                query: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            { test: /\.css$/, loader: (env != "production")?'style-loader!css-loader' : ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.(png|jpg)$/, loader: 'url-loader' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js"),
        new ExtractTextPlugin("build.css"),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.NoErrorsPlugin()
    ],
    noParse: [
        /[\/\\]node_modules.*/,
    ],
    resolve: {
        alias: {}
    },
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.noParse.push(new RegExp(path));
    },
};

config.addVendor("babel-polyfill", vendors_dir + "/babel-polyfill/dist/polyfill.js");
config.addVendor("es5-sham", vendors_dir + "/es5-shim/es5-sham.js");
config.addVendor("es5-shim", vendors_dir + "/es5-shim/es5-shim.js");
config.addVendor("es6-promise", vendors_dir + "/es6-promise/dist/es6-promise.js");
config.addVendor("fetch", vendors_dir + "/whatwg-fetch/fetch.js");
config.addVendor("jquery", vendors_dir + "/jquery/dist/jquery.js");
config.addVendor("react", vendors_dir + "/react/dist/react.js");
config.addVendor("react-dom", vendors_dir + "/react-dom/dist/react-dom.js");




module.exports = config;
