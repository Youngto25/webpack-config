/*
 * @Author: YangTao
 * @Date: 2020-08-27 16:32:43
 * @LastEditTime: 2020-09-09 21:53:55
 * @LastEditors: YangTao
 * @Description:
 * @FilePath: \wep-demo\webpack.config.js
 * @可以输入预定的版权声明、个性签名、空行等
 */
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin"); //指定html文件，将其放入打包的文件中
let MiniCssExtractPlugin = require("mini-css-extract-plugin"); //用link的方式引入css样式

module.exports = {
  devServer: {
    //开发服务器的配置
    port: 3000, //本地服务端口号
    progress: true, //是否有进度条
    contentBase: "./dist", //打开哪个文件
    open: true, //自动打开浏览器
    compress: true, //Gzip压缩
  },
  mode: "production", //模式 默认两种 production development
  entry: "./src/index.js", //入口
  output: {
    filename: "bundle.[hash:8].js", //打包后的文件名，加上hash戳并只显示8位
    path: path.resolve(__dirname, "dist"), //路径必须是一个绝对路径,
  },
  plugins: [
    //数组，放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        //打包时操作
        removeAttributeQuotes: true, //双引号去除
        collapseWhitespace: true, //变为一行
      },
      hash: true, //哈希戳
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
  module: {
    //模块
    rules: [
      //规则 (css-loader 解析@import这种语法)
      //style-loader 把css插入到head的标签中
      //loader的特点，希望单一，一种loader希望只处理一种问题
      //loader的用法 字符串，只使用一个loader 多个loader则使用[] 还可以写成对象方式(以便进行具体的配置)
      //loader的执行顺序，默认从右向左执行 从下到上执行
      {
        test: /\.(less)$/,
        use: [
          //此种style-loader的方式是将css文件的内容直接放入head标签中
          // {
          //   loader: "style-loader",
          //   options: { insert: "head" },
          // },
          //可以使用link标签引入
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
};
