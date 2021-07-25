const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const fs = require('fs');
const { spawnSync } = require('child_process');
const path = require('path');

gulp.task('clean', async () => {
  const { src } = gulp;
  if (fs.existsSync('dist')) {
    await src('dist').pipe(clean());
  }
});

gulp.task('dev', async () => {
  const { dest } = gulp;
  await tsProject.src()
    .pipe(tsProject())
    .pipe(dest("dist/build"));
});

gulp.task('publish', async () => {
  await spawnSync('npm', ['run', 'lib'], { shell: true });
  process.chdir(path.join(__dirname, 'dist'));
  await spawnSync('npm', ['pack'], { shell: true });
  await spawnSync('npm', ['publish'], { shell: true });
});
