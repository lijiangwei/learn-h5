(function(){
    'use strict';
    var gulp = require('gulp'),
        connect = require('gulp-connect'),
        open = require('gulp-open'),
        rename = require('gulp-rename'),
        header = require('gulp-header'),
        path = require('path'),
        uglify = require('gulp-uglify'),
        sourcemaps = require('gulp-sourcemaps'),
        jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish'),
        minifycss = require('gulp-minify-css'),
        imagemin = require('gulp-imagemin'),
        pngcrush = require('imagemin-pngcrush'),
        md5 = require('gulp-md5-plus'),
        htmlmin = require('gulp-htmlmin'),
        rev = require('gulp-rev'),
        revCollector = require('gulp-rev-collector'),
        autoprefixer = require('autoprefixer'),
        postcss = require('gulp-postcss'),
        cssnano = require('gulp-cssnano'),
        minifyHTML = require('gulp-minify-html'),
        concat = require('gulp-concat'),        // 文件合并
        paths = {
            root: './',
            dist: 'dist/',
            source: 'source',
        };



    gulp.task('dist', function (cb) {

        gulp.src(paths.source + '/scripts/index.js')
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(sourcemaps.write('./'))

            .pipe(rev())
            .pipe(gulp.dest(paths.dist + '/scripts'))

            .pipe(rev.manifest())
            .pipe(gulp.dest(paths.dist + '/rev'))

            .pipe(connect.reload())

            cb();
    });

    gulp.task('rev', function() {
      gulp.src([paths.dist + '/rev/*.json', paths.source + '/index.html'])
        .pipe(revCollector())
        .pipe(rename(paths.dist + '/index.min.html'))
        // .pipe(gulp.dest(paths.dist));

    });



    gulp.task('scripts', function () {
        // return gulp.src('source/scripts/*.js')
        //     .pipe(rev())
        //     .pipe(gulp.dest('dist/js'))
        //     .pipe( rev.manifest() )
        //     .pipe( gulp.dest( 'rev/js' ) );

        return gulp.src('source/scripts/*.js')
            .pipe(concat('index.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js'));

    });

    gulp.task('minifyhtml', function() {
      return gulp.src('source/index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename('index.min.html'))
        .pipe(gulp.dest(paths.dist));
    });

    // auto mini css
    gulp.task('minifyicss', function () {
        var postcss      = require('gulp-postcss');
        var sourcemaps   = require('gulp-sourcemaps');
        var autoprefixer = require('autoprefixer');

        return gulp.src('source/styles/index.css')
            .pipe(sourcemaps.init())
            .pipe(postcss([ autoprefixer({ browsers: ['> 1%'], remove: false }) ]))
            .pipe(minifycss())
            .pipe(sourcemaps.write('.'))


            .pipe(rev())
            .pipe(gulp.dest('dist/styles/'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('rev/styles'));

            // .pipe(rename({suffix: '.min'}))

            // .pipe(gulp.dest('./source/styles/'));

            // gulp.src(['./source/styles/rev/*.json', './source/index.html'])
            // .pipe(revCollector())
            // .pipe(rename({suffix: '.min'}))
            // .pipe(gulp.dest('./source/'));

    });


    gulp.task('watch', function () {
        gulp.watch(paths.source + '/scripts/index.js', [ 'dist' ]);
    });

    gulp.task('connect', function () {
        return connect.server({
            root: [ paths.root ],
            livereload: true,
            port:'4000'
        });
    });


    gulp.task('minifyimg', function() {
      return gulp.src(paths.source + '/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(paths.dist + '/images/'));
    });

    gulp.task('open', function () {
        return gulp.src(paths.source + '/index.html').pipe(open({ uri: 'http://localhost:4000/' + paths.source + '/index.html'}));
    });



    gulp.task('rev', function () {
        return gulp.src(['./source/styles/rev/*.json', './source/index.html'])
            .pipe(revCollector())
            .pipe( minifyHTML({
                empty:true,
                spare:true
            }) )
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./source/'));
    });

    gulp.task('server', [ 'watch', 'connect', 'open' ]);

    gulp.task('default', [ 'server' ]);

})();