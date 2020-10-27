const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3030;

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
        filename: "bundle.[hash].js",
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
        host: "localhost",
        port: port,
        open: true,
    },
};
