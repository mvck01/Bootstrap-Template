const gulp= require('gulp');
const sass= require('gulp-sass');
const browserSync= require('browser-sync').create();

function style(){
  // where is your file
  return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css','./src/scss/*.scss'])
  // Let it pass through the compiler
  .pipe(sass())
  // destination after compiling
  .pipe(gulp.dest('./src/css'))
  // stream changes to all browser(synchronisation)
  .pipe(browserSync.stream())
}

function moveJs(){
  //where file?
  return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/tether/dist/js/tether.min.js'])
  // destination
  .pipe(gulp.dest('./src/js'))
  // stream via browserSync
  .pipe(browserSync.stream())
}

function moveFont(){
  return gulp.src(['./node_modules/font-awesome/fonts/*'])
  .pipe(gulp.dest('./src/fonts'))
  .pipe(browserSync.stream())
}

function watch(){
  browserSync.init({
    server:{
      baseDir:'./src'
    }
  });
  gulp.watch(['./node_modules/bootstrap/dist/css/bootstrap.min.css','./node_modules/font-awesome/scss/font-awesome.scss', './src/scss/*.scss'],style)
  gulp.watch(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/tether/dist/js/tether.min.js'], moveJs)
  gulp.watch('./src/*.html').on('change', browserSync.reload)
}

exports.style = style;
exports.moveFont= moveFont;
exports.moveJs = moveJs;
exports.watch = watch;

