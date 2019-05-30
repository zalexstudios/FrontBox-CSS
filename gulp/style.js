/* Import libs */
import { src, dest } from "gulp";
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import rename from "gulp-rename";
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import { browserSync } from "./../gulpfile.babel";
const argv = require('yargs').argv;

/* Import config */
import * as config from "./../config";
import { getModeName } from './index';


export function style_grid() {

	const element = config.path.style.grid;

	config.dev = !argv.prod;

	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(rename({
			suffix: `.${getModeName()}`,
		}))
		.pipe(gulpif(!argv.prod,
			sourcemaps.write(`./`, { sourceRoot: './' })
		))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
export function style_main() {

	const element = config.path.style.main;

	config.dev = !argv.prod;

	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(gulpif(!argv.prod,
			sourcemaps.init({ loadMaps: true })
		))
		.pipe(less({
			modifyVars: config,
			plugins: [
				require('less-plugin-glob'),
			]
		}))
		.pipe(rename({
			basename: 'style',
			suffix: `.${getModeName()}`,
		}))
		.pipe(gulpif(!argv.prod,
			sourcemaps.write(`./`, { sourceRoot: './' })
		))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
export function style_base() {

	const element = config.path.style.base;


	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(less({
			modifyVars: config,
			plugins: [
				require('less-plugin-glob'),
			]
		}))
		.pipe(rename({
			basename: 'base',
			suffix: `.${getModeName()}`,
		}))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
// export function style_grid() {

//       const element = config.path.style.grid;


//       return src( `${element.files}`, {
//             allowEmpty: true,
//          })
//          .pipe( less({
//                modifyVars: config,
//                plugins: [
//                   require('less-plugin-glob'),
//                ]
//          }))
//          .pipe( rename({
//                basename: 'grid',
//                suffix: `.${getModeName()}`,
//          }))
//          .pipe( dest(
//                `public/${getModeName()}/${element.dest}`
//          ))
//          .pipe( browserSync.stream() );
// }
export function style_utilities() {

	const element = config.path.style.utilities;


	return src(`${element.files}`, {
		allowEmpty: true,
	})
		.pipe(less({
			modifyVars: config,
			plugins: [
				require('less-plugin-glob'),
			]
		}))
		.pipe(rename({
			basename: 'utilities',
			suffix: `.${getModeName()}`,
		}))
		.pipe(dest(
			`public/${getModeName()}/${element.dest}`
		))
		.pipe(browserSync.stream());
}
