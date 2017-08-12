/**
 * Created by Administrator on 2017/5/19.
 */
/*gulp自动化*/
var gulp = require('gulp'),
    spritesmith = require("gulp.spritesmith"); //引入plugin插件，引入后可以用&直接调用以gulp开头的插件，而不需要提前require声明
var $ = require('gulp-load-plugins')(); //并且在方法后加上双扣号，表示立即调用
var open = require('open');
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var app = {
    srcPath: 'src/', //源代码路径
    devPath: 'build/', //整合后的路径，开发路径
    prdPath: 'dist/' //生产环境路径
};


/*依赖库*/
gulp.task('lib', function () {
    return gulp.src('bower_components/**/*')
    // .pipe(gulp.dest(app.devPath + 'vender'))
        .pipe(gulp.dest(app.prdPath + 'vender'))
        .pipe(gulp.dest(app.srcPath + 'vender'))
        // .pipe($.connect.reload())
        .pipe(reload({stream: true})); //监控并刷新
});
/*html*/
gulp.task('html', function () {
    gulp.src(app.srcPath + '/**/*.html')
    // .pipe(gulp.dest(app.devPath))
    // .pipe($.htmlmin({
    //     removeComments: true,
    //     collapseWhitespace: true
    // }))
        .pipe(gulp.dest(app.prdPath))
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*模拟后台数据*/
gulp.task('json', function () {
    gulp.src(app.srcPath + 'data/**/*.json')
    // .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*less文件处理*/
gulp.task('less', function () {
    gulp.src(app.srcPath + 'css/**/*.less')
        .pipe($.less()) //因为有gulp-load-plugins插件，可以直接用$.less调用gulp-less插件*/
        // .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin()) //因为有gulp-load-plugins插件，可以直接用$.less调用gulp-cssmin插件
        .pipe(gulp.dest(app.prdPath + 'css')) //传入到线上路径之前先压缩css
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*js文件处理*/
gulp.task('js', function () {
    gulp.src(app.srcPath + 'js/**/*.js')
    // .pipe($.concat('index.js'))
    //通过gulp-concat插件将所有js文件合并成一个index.js
    //     .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify()) //流入线上环境路径之前，压缩js代码
        .pipe(gulp.dest(app.prdPath + 'js'))
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*图片处理*/
gulp.task('image', function () {
    return gulp.src(app.srcPath + 'image/**/*')
    // .pipe(gulp.dest(app.devPath + 'image'))
        .pipe($.imagemin()) //流入线上环境路径之前，压缩image图片
        .pipe(gulp.dest(app.prdPath + 'image'))
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*精灵图*/
// gulp.task('sprite', function () {
//     return gulp.src(app.srcPath + 'image/sprite/**/*.png')//需要合并的图片地址
//         .pipe(spritesmith({
//             imgName: 'sprite.png',//保存合并后图片的地址
//             cssName: 'css/sprite.css',//保存合并后对于css样式的地址
//             padding: 5,//合并时两个图片的间距
//             algorithm: 'binary-tree',//注释1
//             cssTemplate: function (data) {
//                 var arr = [];
//                 data.sprites.forEach(function (sprite) {
//                     arr.push(".icon-" + sprite.name +
//                         "{" +
//                         "background-image: url('" + sprite.escaped_image + "');" +
//                         "background-position: " + sprite.px.offset_x + "px " + sprite.px.offset_y + "px;" +
//                         "width:" + sprite.px.width + ";" +
//                         "height:" + sprite.px.height + ";" +
//                         "}\n");
//                 });
//                 return arr.join("");
//             }
//         }))
//         .pipe(gulp.dest(app.prdPath + "image"))
//         .pipe(reload)({stream: true});
// });

/*文件清理*/
gulp.task('clean', function () {
    gulp.src([app.devPath, app.prdPath]) //同时清除编码环境和线上环境的目录内容
        .pipe($.clean())
        // .pipe($.connect.reload())
        .pipe(reload({stream: true}));
});

/*创建browserSync任务 ,创建一个静态服务器*/
gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "./dist/", //启动根目录
        }
    });
    // 监控内容
    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'css/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'js/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
    gulp.watch(app.srcPath + '**/*.html', ['html']).on("change", function () {
        browserSync.reload;
    });

    //为实现构建完成后，刷新浏览器，进行实时预览，
    // 需要在每个任务后面添加.pipe(browserSync.reload({steam:true}));

});


/*build*/
gulp.task('serve', ['image', 'js', 'less', 'json', 'lib', 'html', 'browser-sync']);


/*创建 gulp service服务*/
// gulp.task('serve', ['build'], function() { //serve任务中引入build任务
//      $.connect.server({ //启动一个服务器
//          root: [app.prdPath], //服务器从哪个路径开始读取，默认从开发路径读取
//          livereload: true, //每当写完之后自动刷新浏览器，只支持高版本浏览器
//          port: 3000 //服务器端口号
//      });

//     // open('http://localhost:3000'); //服务起来后，自动打开页面
//     /* browserSync.init({
//          server: {
//              baseDir: "./dist/",
//          }
//      });*/
//     //watch作用，当监控的内容发生变化，修改原文件的时候，自动执行构建任务

// });
//为实现构建完成后，刷新浏览器，进行实时预览，
// 需要在每个任务最后添加.pipe($.connect.reload());
gulp.task('default', ['serve']);
//控制台使用gulp命令，就会调用default任务
//这里设定的default任务是serve，即gulp等同于gulp serve。