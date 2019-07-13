/* Import libs */
import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import header from 'gulp-header';
import footer from 'gulp-footer';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import uncss from 'uncss';
import postcss from 'gulp-postcss';
import { browserSync } from './../../gulpfile.babel';
const argv = require('yargs').argv;

/* Import config */
import * as config from './../../config';
import { getModeName } from './frontbox';

export function style_main() {
	const element = config.path.style.main;
	let importStyle = '';
	if (argv.prod) {
		importStyle = `
			@import 'bootstrap';
			@import 'utilities';
		`;
	}
	config.dev = !argv.prod;

	return src(`${element.files}`, {
		allowEmpty: true
	})
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(
			header(`
			$infoOffJavascript: ${config.info.offJavascript};
			$infoOldBrowser: ${config.info.oldBrowser};
			$dev: ${!argv.prod};
			${importStyle}
			`)
		)
		.pipe(gulpif(config.working, footer(`@import '../../../FrontBox-Plugins/**/*.scss';`)))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(
			gulpif(
				argv.prod,
				postcss([
					autoprefixer(),
					cssnano(),
					uncss.postcssPlugin({
						html: [`./public/${getModeName()}/*.html`],
						ignoreSheets: [/fonts.googleapis/],
						ignore: [/js_*/, /data-tabs-slider-active/, /\.active/]
					})
				])
			)
		)
		.pipe(
			rename({
				suffix: `.${getModeName()}`
			})
		)
		.pipe(gulpif(!argv.prod, sourcemaps.write(`./`, { sourceRoot: './' })))
		.pipe(dest(`public/${getModeName()}/${element.dest}`))
		.pipe(browserSync.stream());
}
export function style_bootstrap() {
	const element = config.path.style.bootstrap;

	return src(`${element.files}`, {
		allowEmpty: true
	})
		.pipe(
			header(`
				$infoOffJavascript: ${config.info.offJavascript};
				$infoOldBrowser: ${config.info.oldBrowser};
				$dev: ${!argv.prod};
			`)
		)
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(
			rename({
				suffix: `.${getModeName()}`
			})
		)
		.pipe(dest(`public/${getModeName()}/${element.dest}`))
		.pipe(browserSync.stream());
}
export function style_utilities() {
	const element = config.path.style.utilities;

	return src(`${element.files}`, {
		allowEmpty: true
	})
		.pipe(gulpif(!argv.prod, sourcemaps.init({ loadMaps: true })))
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(
			rename({
				suffix: `.${getModeName()}`
			})
		)
		.pipe(dest(`public/${getModeName()}/${element.dest}`))
		.pipe(browserSync.stream());
}
