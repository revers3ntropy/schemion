const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const terser = require("gulp-terser");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");
const run = require("gulp-run-command").default;
const fs = require("fs");
const dts = require('dts-bundle');

const PACKAGE_JSON = JSON.parse(String(fs.readFileSync("./package.json")));
const { name: moduleName } = PACKAGE_JSON;

function compileTs () {
	return browserify({
		basedir: ".",
		debug: true,
		entries: ["./src/main.ts"],
		cache: {},
		packageCache: {},
	})
		.plugin(tsify, { emitDeclarationOnly: false })
		.bundle()
		.pipe(source(`index.js`))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(terser())
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("dist"));
}

function emitDts () {
	return run(`tsc`)();
}

function bundleDts () {
	return new Promise<void>(resolve => {
		dts.bundle({
			name: moduleName,
			main: 'src/main.d.ts',
			baseDir: './src',
			out: `../dist/index.d.ts`,
			removeSource: true,
			outputAsModuleFolder: false,
		});
		resolve();
	});
}

exports.default = gulp.parallel(
	compileTs,
	gulp.series(
		emitDts,
		bundleDts
	)
);