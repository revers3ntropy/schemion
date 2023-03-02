const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const terser = require("gulp-terser");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const fs = require("fs");
const ts = require('gulp-typescript');
const rename = require('gulp-rename');

const packageJson = JSON.parse(String(fs.readFileSync("./package.json")));
const latestVersionFileName = `${packageJson.name}.${packageJson.version}`;

function compileTs (filename: string) {
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["src/main.ts"],
		cache: {},
		packageCache: {},
	})
		.plugin(tsify)
		.bundle()
		.pipe(source(`${filename}.js`))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(terser())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
}

function emitDts (filename: string) {
	const tsProject = ts.createProject("tsconfig.json");
	return tsProject
		.src()
		.pipe(tsProject())
		.dts
		.pipe(rename(`${filename}.d.ts`))
		.pipe(gulp.dest(`dist`));
}

function copyBuilt () {
	gulp.src('./dist/index.js')
		.pipe(rename(`${latestVersionFileName}.js`))
		.pipe(gulp.dest(`dist`));
	gulp.src('./dist/index.js.map')
		.pipe(rename(`${latestVersionFileName}.js.map`))
		.pipe(gulp.dest(`dist`));
	gulp.src('./dist/index.d.ts')
		.pipe(rename(`${latestVersionFileName}.d.ts`))
		.pipe(gulp.dest(`dist`));
}

exports.default = gulp.series(
	gulp.parallel(
		() => compileTs(`index`),
		() => emitDts(`index`)
	),
	copyBuilt
);