const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");
//复制文件到dist文件夹
gulp.task("copyHtml",function(){
	gulp.src("*.html")
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
})
gulp.task("copyJS",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest('dist/js'))
})
//k拷贝所有文件
gulp.task("copyImg",function(){
	gulp.src("img/**")
	.pipe(gulp.dest('dist/img'))
})
//转换scss并复制到dist/css
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())//将css的样式和scss关联起来，调试时，f12可以直接显示scss的行数；
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'))
})

//文件修改后自动更新
gulp.task('server',function(){
	connect.server({root:'dist',
		livereload:true
	})
})

gulp.task('watch',function(){
	gulp.watch('*.html',['copyHtml']);
	gulp.watch('sass/*.scss',['sass']);
	gulp.watch('img/**',['copyImg']);
	gulp.watch('js/*.js',['copyJS'])
})

gulp.task('build',['copyHtml','copyImg','copyJS','sass']);
gulp.task('default',['server','watch']);