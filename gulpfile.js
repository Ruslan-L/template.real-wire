const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const prefexer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cssmin = require('gulp-minify-css');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const image = require('gulp-image');

let path = {
    build: {
        img: './build/img/',
        js: './build/js/',
        css: './build/css/',
        html: './build'
    },
    src: {
        img: './src/img/*',
        js: './src/js/*.js',
        style: './src/style/*.scss',
        html: './src/*.html'
    },
    watch: {
        js: './src/js/**/*.js',
        style: './src/style/**/*.scss',
        html: './src/**/*.html' 
    },
    clean: './build'
};

gulp.task('webserver', function(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    done();
});

gulp.task('js:build', function(done) {
    gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
    done();
});

gulp.task('style:build', function(done) {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefexer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
    done();
});

gulp.task('html:build', function(done) {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
    done();
});

gulp.task('image:build', function(done) {
    gulp.src(path.src.img)
        .pipe(image())
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream());
    done();
});

gulp.task('build', gulp.series(
    'image:build',
    'js:build',
    'style:build',
    'html:build'
));

gulp.task('watch', function(done) {
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.html, gulp.series('html:build'));
    done();
});

gulp.task('clean', function(callback) {
    rimraf(path.clean, callback);
});

gulp.task('default', gulp.series('build', 'watch', 'webserver'));