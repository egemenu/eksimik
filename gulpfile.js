const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const rollup = require('gulp-rollup')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')

gulp.task('js', () => {
	gulp.src('./src/js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(rollup({
			rollup: require('rollup'),
			input: './src/js/main.js',
			output: { format: 'es' },
		}))
		.pipe(babel())
		.pipe(gulp.dest('./dist'))
})


gulp.task('sass', () => gulp
	.src('./src/sass/main.scss')
	.pipe(sass.sync().on('error', sass.logError))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./dist'))
)

gulp.task('js:watch', () => {
	gulp.watch('./src/js/**/*.js', [ 'js' ])
})

gulp.task('sass:watch', () => {
	gulp.watch('./src/sass/**/*.scss', [ 'sass' ])
})

gulp.task('default', [ 'sass:watch', 'js:watch' ])