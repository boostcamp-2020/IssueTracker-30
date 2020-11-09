const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3030;

module.exports = {
    mode: "development",
    entry: {
        app: ['babel-polyfill', "./src/index.jsx"],
    },
    output: {
        filename: "bundle.[hash].js",
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
    ],
    devServer: {
        host: "127.0.0.1",
        port: port,
        open: true,
        // contentBase: path.join(__dirname, '/public'),
        proxy: {
            '/': 'http://localhost:3000/',
        },
        historyApiFallback: true,
    },
};
