// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();

// paths
var paths = {
	localhost: "http://localhost:8000/index.html"
};

// WebServer
gulp.task('webserver', function() {
	return gulp.src('app')
		.pipe(plug.webserver({
			livereload: true,
			directoryListing: true,
			open: paths.localhost
		}));
});


// The default task is 'watch'
gulp.task("default", ["webserver"]);