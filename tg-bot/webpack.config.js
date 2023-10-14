const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

const webPackConfig = {
    entry: {
        'app': './src/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'public/img'),
        //             to: path.resolve(__dirname, 'dist/img'),
        //         },
        //         {
        //             from: path.resolve(__dirname, 'public/src/service-worker.js'),
        //             to: path.resolve(__dirname, 'dist'),
        //         },
        //     ],
        // }),
    ],
};

module.exports = () => {
    webPackConfig.optimization = {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    }
    webPackConfig.devtool = 'source-map';
    webPackConfig.devServer = {
        hot: true,
        historyApiFallback: true,
        static: path.join(__dirname, 'dist'),
        client: {
            logging: 'info',
            overlay: true,
            progress: true,
            reconnect: 3,
        },
        compress: true,
        port: 8081,
    };
    webPackConfig.stats = {
        errorDetails: true,
    };
    // webPackConfig.mode = 'development';

    return webPackConfig;
};
