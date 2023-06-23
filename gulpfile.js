
// BASE
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');

// PUSH ERROR NOTIFY
var plumber = require('gulp-plumber');

// DEBUG
var color = require('gulp-color');
const log = console.log;

// = = = = = = = = = = 
// TASKS
// = = = = = = = = = = 

gulp.task('default', function() {
    return new Promise( function(resolve, reject){
        log(color('= = = = Hola GULP = = = =', 'RED'));
        resolve();
    } )
});

// SASS task
gulp.task('sass', function() {
    log(color('= = = = Watch SASS changes = = = =', 'GREEN'));

    return gulp.src('./app/scss/**/*.scss')
        .pipe(plumber({ errorHandler: function(err) {
            log( color(err.message, 'RED') );
        }}))
        .pipe(sass({
            /* output style : nested | compact | expanded | compressed */
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: false
        }))
        // .pipe(cssnano())
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream())

})


// SERVE task
gulp.task('serve', function() {
    // Browser sync
    browserSync.init({
        server: "./app"
    });

    // HTML watch
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    
    // sass watch
    gulp.watch("app/scss/**/*.scss", gulp.series('sass'));

    // JS watch
    gulp.watch("app/js/**/*.js").on('change', browserSync.reload);

})