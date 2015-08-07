var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var useref = require('gulp-useref');
var clean = require('gulp-clean');
var htmlv = require('gulp-html-validator');

var jsOrder = ['js/parse-1.4.2.min.js', 'js/jquery-1.11.2.min.js', 'js/velocity.min.js', 'js/Chart.js', 'js/main.js', 'js/coin_list.js', 'js/graph.js', 'js/item_detail.js', 'js/metal_info.js', 'js/parse-stackitem.js'];

gulp.task('htmlLinks', function() {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist/public'))
});

gulp.task('minifyCSS', function() {
   return gulp.src('style/*.css')
       .pipe(minifyCss())
       .pipe(gulp.dest('dist/public/style'))
});

gulp.task('concatJS', function() {
    return gulp.src(jsOrder)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/public/js'));
});

gulp.task('clean', function() {
    return gulp.src('dist/public/*', {read: false})
        .pipe(clean())
});

gulp.task('copyall', function() {
    return gulp.src(['assets/*', 'fonts/*', 'favicon.ico'], {base: './'})
        .pipe(gulp.dest('dist/public'));
});

gulp.task('validate', function() {
    return gulp.src('*.html')
        .pipe(htmlv({format: 'html'}))
        .pipe(gulp.dest('validate/'))
});

gulp.task('all', ['minifyCSS', 'concatJS', 'htmlLinks', 'copyall']);
