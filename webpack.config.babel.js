import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';
import webpackMerge from 'webpack-merge';

const baseConfig = {
    entry: './client/index.js',

    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', { modules: false }],
                                'react',
                            ],
                            plugins: [
                                'transform-flow-strip-types',
                            ],
                        },
                    },
                ],
            },
        ],
    },
};

const developmentConfig = {
    devtool: 'eval-source-map',

    devServer: {
        overlay: true,

        host: '0.0.0.0',
        port: 8080,
        publicPath: '/assets/',
    },
};

const productionConfig = {};

// Merge config based on environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const config = webpackMerge([
    baseConfig,
    NODE_ENV === 'development' ? developmentConfig : productionConfig,
]);

export default config;
