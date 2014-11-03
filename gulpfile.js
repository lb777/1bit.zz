var gulp             = require('gulp');

var connect          = require('connect');
var livereLoad 		 = require('gulp-livereload');
var serveStatic      = require('serve-static');

var concat           = require('gulp-concat');
var gulpFilter       = require('gulp-filter');
var mainBowerFiles   = require('main-bower-files');
var cssmin			 = require('gulp-cssmin');
var uglify 			 = require('gulp-uglify');
var rename           = require('gulp-rename');
var prefix    		 = require('gulp-autoprefixer');
var unhtml           = require('gulp-minify-html');
var spritesmith      = require('gulp.spritesmith');

// мини-сервер для livereLoad
gulp.task('server', function(next) {
    server = connect();
    server.use(serveStatic('./')).listen(process.env.PORT || 8080, next);
});

// следим и распределяем main файлы Bower
gulp.task('libs', function () {
    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');

    return gulp.src(mainBowerFiles(
        {
            includeDev: true
        }))

        // собираем js файлы , склеиваем и отправляем в папку www/js
        .pipe(jsFilter)
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('www/js'))
        .pipe(jsFilter.restore())

        // собраем css файлы, склеиваем и отправляем их под синтаксисом scss
        .pipe(cssFilter)
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('dev/sass/library/'));

});

// css. Добавляем или удаляем автопрефикс и минифицируем.
//gulp.task('css', function() {
//    return gulp.src('dev/sass/style.css')
//        .pipe(prefix(["last 5 version", "ie 8", "ie 7"]))
//        .pipe(cssmin())
//        .pipe(rename({
//            suffix: ".min"
//        }))
//        .pipe(gulp.dest('www/style/'));
//});

// js. Склеиваем и минифицируем
gulp.task('js', function () {
    return gulp.src('dev/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('www/js/'));
});

// html. Минифицируем
gulp.task('minifyHtml', function() {
    var opts = {spare:true};

    gulp.src('dev/*.html')
        .pipe(unhtml(opts))
        .pipe(gulp.dest('www/'))
});

// Создаем спрайт
// gulp.task('sprite', function () {
    // var spriteData = gulp.src('dev/sprite/*.png')
        // .pipe(spritesmith({
            // imgName: 'sprite.png',
            // cssFormat: 'sass',
            // cssName: 'sprite.sass',
            // padding: 10,
            // algorithm: 'binary-tree',
            // cssVarMap: function(sprite) {
                // sprite.name = 'sprite-' + sprite.name
            // }
        // }));
    // spriteData.img.pipe(gulp.dest('www/image/'));
    // spriteData.css.pipe(gulp.dest('dev/sass/library/'));
// });

// а теперь наблюдаем за происходящим =)
gulp.task('watch', ['server'], function() {
    var server = livereLoad();

    gulp.watch('bower.json',['libs']);

    //gulp.watch('dev/sass/style.css',['css']);

    gulp.watch('dev/js/*.js',['js']);

    gulp.watch('dev/*.html',['minifyHtml']);

    //gulp.watch('dev/sprite/*.png',['sprite']);

    gulp.watch('www/**/*').on('change', function(file) {
        server.changed(file.path);
    });
});