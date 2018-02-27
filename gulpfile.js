const gulp = require('gulp')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')

gulp.task('upload', () => {
    const conn = ftp.create({
        host: 'test4.xiaomaowu.com',
        user: 'cq94zhgp',
        password: 'IWpoFJLlv5E99k5Z',
        log: gutil.log,
    })

    return gulp.src(['dist/**/*', '!dist/favicon.ico', '!dist/index.html'])
        .pipe(conn.dest('/public'))
})
