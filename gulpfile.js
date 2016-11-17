// Include gulp & gulp plugins
var concat = require('gulp-concat');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task(
	'scripts',
	function() {
		return gulp.src(
			[
				'src/editor.js',
				'src/app.js',
			]
		)
		.pipe(concat('live_edit.min.js'))
		.pipe(gulp.dest('dist'));
	}
);

gulp.task(
	'watch',
	function() {
		// Watch .js files
		gulp.watch('src/**/*.js', ['scripts']);
	}
);

gulp.task(
	'default',
	function() {
		runSequence('scripts', 'watch');
	}
);
