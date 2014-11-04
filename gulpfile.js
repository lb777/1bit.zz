var gulp             = require('gulp');

var connect          = require('connect');
var livereLoad 		 = require('gulp-livereload');
var serveStatic      = require('serve-static');

var concat           = require('gulp-concat');
var gulpFilter       = require('gulp-filter');
var mainBowerFiles   = require('main-bower-files');
var uglify 			 = require('gulp-uglify');
var rename           = require('gulp-rename');
var unhtml           = require('gulp-minify-html');

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

// а теперь наблюдаем за происходящим =)
gulp.task('watch', ['server'], function() {
    var server = livereLoad();

    gulp.watch('bower.json',['libs']);

    gulp.watch('dev/js/*.js',['js']);

    gulp.watch('dev/*.html',['minifyHtml']);

    gulp.watch('www/**/*').on('change', function(file) {
        server.changed(file.path);
    });
});