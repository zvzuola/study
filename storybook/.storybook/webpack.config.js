module.exports = {
    module: {
        rules: [
            {
                test: /\.s?css$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    }
}