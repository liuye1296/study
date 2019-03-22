const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require('glob');
let config = {
    entry: {
        main: path.join(__dirname, "./src/index.js")
    },
    output: {
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.(html)$/,
            use: [{
                //这里写 loader 名即可
                loader: 'html-loader',
                options: {
                    aa: '22'
                }
            }]
        }, {// img 压缩，，生成hash值
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,//小于 8192 就转换
                        name: '[name][hash:4].[ext]',
                        outputPath: 'img/',//输出路径
                        fallback: 'file-loader'//失败之后处理方式
                    }
                },
            ]
        },]
    },
    resolveLoader: {
        modules: ['node_modules', 'loaders']
    },
    plugins: []
}

var viesObj = getView('src/*.html', 'src/views/');
var pages = Object.keys(viesObj);
pages.forEach(function (pathname) {
    var htmlName = viesObj[pathname];
    var conf = {
        filename: __dirname + '/dist/' + htmlName + '.html', //生成的html存放路径，相对于path
        template: __dirname + '/src/' + htmlName + '.html', //html模板路径
        inject: 'body', //js插入的位置，true/'head'/'body'/false
        hash: true, //为静态资源生成hash值
        // minify: { //压缩HTML文件
        //     cache: true,//默认是true的，表示内容变化的时候生成一个新的文件。
        //     removeComments: true, //移除HTML中的注释
        //     collapseWhitespace: true, //删除空白符与换行符
        //     removeAttributeQuotes: false // 移除属性的引号
        // }
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;

function getView(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        //pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        entries[pathname] = basename;
    }
    return entries;
}