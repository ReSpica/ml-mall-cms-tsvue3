const path = require('path');
//局部导入elementplus的配置，暂时注释
// const Components = require('unplugin-vue-components/webpack');
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  outputDir: './dist', //打包出口地址
  // publicPath: './', //加载资源的前缀，只是为了build文件的index.html能看到东西，放到服务器就不要用它了
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        views: '@/views',
        component: '@/component'
      }
    },
    module: {
      unknownContextCritical: false
    }
    // plugins: [
    //   Components({
    //     resolvers: [ElementPlusResolver()]
    //   })
    // ]
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
};
