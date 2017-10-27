var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var critical = require('critical');
var modernizr = require('gulp-modernizr');
var requirejsOptimize = require('gulp-requirejs-optimize');
var cache = require('gulp-cache');

gulp.task('sass', function(){
  return gulp.src('spip/squelettes/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('spip/squelettes/css'))
    .pipe(browserSync.reload({
          stream: true
        }))
});
gulp.task('watch',['browserSync','sass'], function(){
  gulp.watch('spip/squelettes/scss/*.scss', ['sass']); 
  gulp.watch('spip/squelettes/**/*.html', ['clear',browserSync.reload]); 
  gulp.watch('spip/squelettes/js/**/*.js', browserSync.reload);
  // autres observations
});
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});
gulp.task('cleancache', function() {
  del('spip/tmp/cache');
})
gulp.task('uglify',function() {
	return gulp.src('spip/squelettes/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('spip/squelettes/js'))

});
gulp.task('minify-css', function() {
  return gulp.src('spip/squelettes/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('spip/squelettes/css'));
});
gulp.task('images', function(){
  return gulp.src('spip/sources_squelettes/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('spip/squelettes/images'))
});
gulp.task('browserSync', function() {
  browserSync({
    proxy: "http://mdph:80"
  })
});
gulp.task('autoprefixer',function() {
	return gulp.src('spip/squelettes/css/*.css')
	.pipe(autoprefixer({
	            browsers: ['last 2 versions'],
	            cascade: false
	        }))
	.pipe(gulp.dest('spip/squelettes/css'))

});
gulp.task('clean', function() {
  del('spip/squelettes/css/*');
  del('spip/squelettes/js/*');
});
gulp.task('modernizr', function() {
  gulp.src('spip/squelettes/js/**/*.js')
    .pipe(modernizr())
    .pipe(uglify())
    .pipe(gulp.dest("spip/squelettes/js/build/"))
});
gulp.task('require', function () {
    return gulp.src('spip/squelettes/js/**/*.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('spip/squelettes/js/build/'));
});
gulp.task('critiquehome', function (cb) {
    critical.generate({
        inline: true,
        base: 'spip',
        src: 'critiquehome.html',
        dest: 'critiquehome.html',
        minify: true,
        width: 500,
        height: 800
       });
});

// les actions //

gulp.task('build', function (callback) {
  runSequence('sass','autoprefixer',
  ['uglify', 'minify-css'],
  callback
  )
});
gulp.task('default', function (callback) {
  runSequence(['clear','sass','browserSync', 'watch','cleancache'],
  callback
  )
});

