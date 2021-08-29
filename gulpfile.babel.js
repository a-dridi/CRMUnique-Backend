require('del');
require('run-sequence');
require('babel-compiler');

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**'],
    tests: './server/test/**/*.test.js'
};

// Deleting dist directory
gulp.task('clean', () => {
    return del('dist/**');
});

// Setting environment variables
gulp.task('set-env', () => {
    plugins.env({
        vars: {
            NODE_ENV: 'test'
        }
    });
});

// triggering mocha tests
gulp.task('test', ['set-env'], () => {
    let exitCode = 0;

    return gulp.src([paths.tests], {
            read: false
        })
        .pipe(plugins.plumber())
        .pipe(plugins.mocha({
            reporter: 'spec',
            ui: 'bdd',
            timeout: 2000,
            compilers: {
                js: babelCompiler
            }
        }))
        .once('error', (err) => {
            console.log(err);
            exitCode = 1;
        })
        .once('end', () => {
            process.exit(exitCode);
        });
});

gulp.task('mocha', ['clean'], () => {
    return runSequence('babel', 'test');
});