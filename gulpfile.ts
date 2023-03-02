const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const terser = require("gulp-terser");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const fs = require("fs");

const packageJson = JSON.parse(String(fs.readFileSync("./package.json")));

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
		.pipe(source(filename))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(terser())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
}

exports.default = gulp.parallel(
	() => compileTs(`${packageJson.name}.${packageJson.version}.js`),
	() => compileTs(`index.js`)
);