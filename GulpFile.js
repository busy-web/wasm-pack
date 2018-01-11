/**
 * Basic config to start server and watch for file changes
 *
 * Builds webassembly files
 */
const gulp = require("gulp");
const nodemon = require('gulp-nodemon');
const spawn = require('child_process').spawn;

/**
 * executes a cmd line argument
 *
 */
function cmd(script, ...args) {
	const child = spawn(script, args);
	child.stdout.pipe(process.stdout);
	return child.stdout;
}

gulp.task("build", function () {
	return cmd('make');
});

gulp.task("copy", ['build'], function() {
	gulp.src('src/index.html').pipe(gulp.dest('dist/'))
	gulp.src('build/*').pipe(gulp.dest('dist/'));
});

gulp.task("serve", ['copy'], function() {
	nodemon({ script: 'server.js' });
});

gulp.task('watch', ['serve'], function() {
	gulp.watch(['src/**/*.html', 'src/**/*.cpp'], ['copy']);
});

gulp.task('default', ['build']);

