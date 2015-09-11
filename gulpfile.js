/**
	@author ShiJianwen
*/
var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');

gulp.task('connect', function() {
	connect.server({
		root: [__dirname],
		livereload: true
	});
});

gulp.task('style', function() {
	gulp.src('./src/css/*.less')
		.pipe(less())
		.pipe(gulp.dest('./public/css'))
		.pipe(connect.reload());
});

gulp.task('script', function() {
	gulp.src('./public/js/*.js')
		.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src('./index.html')
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['./index.html'], ['html']);
	gulp.watch(['./src/css/*.less'], ['style']);
	gulp.watch(['./public/js/*.js'], ['script']);
});





gulp.task('default', ['style', 'script', 'connect', 'watch']);