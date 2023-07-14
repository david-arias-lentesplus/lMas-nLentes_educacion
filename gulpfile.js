
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


// IMGS task
gulp.task('imgs_png', function() {
    log(color('= = = = Watch IMAGES PNG changes = = = =', 'YELLOW'));

    return gulp.src('./src/imgs/**/*.png')
        .pipe( gulp.dest('./app/img/') );
})
gulp.task('imgs_jpg', function() {
    log(color('= = = = Watch IMAGES JPG changes = = = =', 'YELLOW'));

    return gulp.src('./src/imgs/**/*.jpg')
        .pipe( gulp.dest('./app/img/') );
})

// HTML task
gulp.task('html', function() {
    log(color('= = = = Watch HTML changes = = = =', 'YELLOW'));

    return gulp.src('./src/**/*.html')
        .pipe( gulp.dest('./app/') );
})

// SASS task
gulp.task('sass', function() {
    log(color('= = = = Watch SASS changes = = = =', 'GREEN'));

    return gulp.src('./src/scss/**/*.scss')
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

    // IMGS task
    gulp.watch("src/imgs/**/*.png", gulp.series('imgs_png'));
    gulp.watch("src/imgs/**/*.jpg", gulp.series('imgs_jpg'));
    
    // html watch
    gulp.watch("src/**/*.html", gulp.series('html'));
    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    
    // sass watch
    gulp.watch("src/scss/**/*.scss", gulp.series('sass'));

    // JS watch
    gulp.watch("app/js/**/*.js").on('change', browserSync.reload);

})