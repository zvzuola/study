module.exports = {
    entry: './es6.js',
    output: {
        path: __dirname,
        libraryTarget: 'umd',
        filename: './es5.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    },
    mode: 'development'
}