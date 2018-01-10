
const gulp = require("gulp");
const shell = require('gulp-shell');

gulp.task("build", function () {
	shell('make');
});

gulp.task("serve", function() {
	shell('emrun --no_browser --port 5200 ./dist');
});

gulp.task('watch', ['build', 'serve'], function() {
	gulp.watch('./src/**/*.c', ['build']);
});

gulp.task('default', ['build', 'serve']);
