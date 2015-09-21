var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var open = require('gulp-open');

var config = {
	port: 4000,
	devBaseUrl: 'http://localhost',
	paths :{
		dist: './dist'
	}
};

gulp.task('connect', function () {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function () {
	gulp.src('dist/index.html')
			.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('browserify', function () {
	gulp.src('src/js/main.js')
			.pipe(plumber())
			.pipe(browserify({transform: 'reactify'}))
			.pipe(concat('main.js'))
			.pipe(gulp.dest('dist/js'))
			.pipe(connect.reload());
});

gulp.task('copy', function () {
	gulp.src('src/index.html')
			.pipe(gulp.dest('dist'));
	gulp.src('src/assets/**/*.*')
			.pipe(gulp.dest('dist/assets'))
			.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.*', ['browserify']);
});

gulp.task('default', ['browserify', 'copy', 'open', 'watch']);
