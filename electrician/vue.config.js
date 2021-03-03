const FileManagerPlugin = require('filemanager-webpack-plugin')
module.exports = {
    devServer: {
      proxy: 'http://localhost:8083'
    }
  }
