
module.exports = function(grunt) {
  grunt.initConfig({
		copy: {
			main: {
				expand: true,
				src: ['build/*', 'src/index.html'],
				dest: 'dist/'
			},
			tasks: ['make'],
		},
    watch: {
      files: ['src/**/*'],
      tasks: ['serve'],
			options: {
				nospawn: true,
				atBegin: true,
			}
    },
  });

	grunt.loadNpmTasks("grunt-make");
	grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('serve', ['copy:main'], function() {
		require('./server')({ port: 5200 });
	});

  grunt.registerTask('default', ['make']);
};
