var path = require('path');

// Hack for Ubuntu on Windows: interface enumeration fails with EINVAL, so return empty.
try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}

module.exports = {
    entry: './src/myjson-save.js',
    output: {
        filename: 'mjs.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.html$/, loader: "html-loader" },
        ]
    }
};