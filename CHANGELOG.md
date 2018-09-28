# Changelog



## 5.0.0-alpha.9
2018-09-28

### Added
- Custom Nunjucks filters

### Improved
- Move Pangolin head to Nunjucks template block
- Watch for components config changes
- Cache Nunjucks preview environment

### Updated
- Dependencies

### Fixed
- Don’t show empty directories in sidebar nav
- Allow tables to span the whole docs width



## 5.0.0-alpha.8
2018-09-21

### Added
- Split webpack runtime chunk

### Improved
- Save nav scroll position
- UI for smaller viewports

### Updated
- Dependencies

### Removed
- Unused dependency



## 5.0.0-alpha.7
2018-08-30

### Added
- File hash for assets
- Option to hide components from sidebar

### Improved
- Move AVA to dev dependencies

### Updated
- Dependencies



## 5.0.0-alpha.6
2018-08-12

### Added
- Static asset handling
- Favicon support

### Improved
- Reconnection handling
- UI refinements

### Fixed
- Nunjucks and Markdown watcher

### Updated
- Dependencies



## 5.0.0-alpha.5
2018-08-09

### Improved
- `PANGOLIN_BASE` and `PANGOLIN_PORT` env variables
- Project config loading

### Updated
- Dependencies

### Fixed
- webpack public path and project base

### Removed
- Auto-imports (too fragile)



## 5.0.0-alpha.4
2018-08-08

### Fixed
- Set explicit paths for loader resolving



## 5.0.0-alpha.3
2018-08-08

### Fixed
- Use relative paths for entry points



## 5.0.0-alpha.2
2018-08-08

### Improved
- Re-arranged dependencies



## 5.0.0-alpha.1
2018-08-08

Complete rewrite. Stay tuned for the updated docs.



## 4.6.0
2018-04-29

### Added
- Dev server port configuration
- Auto open in browser configuration
- Bundling progress

### Updated
- Dependencies



## 4.6.0-beta.3
2018-04-23

### Improved
- `production` NODE_ENV for all build tasks
- More webpack config flexibility

### Updated
- Dependencies



## 4.6.0-beta.2
2018-04-13

### Fixed
- Use correct webpack config for dev server

### Updated
- Dependencies



## 4.6.0-beta.1
2018-04-13

### Added
- webpack-merge for project specific configuration

### Improved
- CSS loader situation
- Renamed `cwd` to `context`

### Updated
- Dependencies



## 4.5.8
2018-03-30

### Updated
- Dependencies

### Fixed
- cssnano mergeRules problems



## 4.5.7
2018-03-17

### Updated
- Dependencies

### Fixed
- Component page highlighting in sidebar



## 4.5.6
2018-03-15

### Updated
- Dependencies



## 4.5.5
2018-03-01

### Improved
- Error logging
- Grouped HTML validation errors and warnings
- Switched to `path.join` instead of template strings for path concatenation

### Updated
- Dependencies



## 4.5.4
2018-01-31

### Improved
- Reduced extreme Nunjucks indentation
- Some default styling for section usage content

### Added
- IDs and links for component sections

### Updated
- Dependencies



## 4.5.3
2018-01-16

### Improved
- Copy content of `<code>` element when clicking copy button of section
- Moved common webpack plugins to base config

### Fixed
- Revert FOUC remover (this disabled sourcemaps)



## 4.5.2
2018-01-16

### Improved
- Reduces Express response complexity
- Removed development FOUC (Flash of unstyled content)
- Outsource some HTML stuff into utils file

### Updated
- Dependencies



## 4.5.1
2018-01-10

### Updated
- Dependencies

### Removed
- Component background
- Babel istanbul plugin from unit test



## 4.5.0
2017-11-10

### Improved
- Section CSS
- Inherit font-family from project

### Added
- Sidebar fuzzy search



## 4.4.0
2017-11-04

### Improved
- Extract common webpack options into shared config
- Pre-compile styleguide CSS and JavaScript

### Added
- Prototype build `build:proto`

### Updated
- Dependencies

### Removed
- css-loader `url()` handling



## 4.3.0
2017-10-14

### Improved
- Limit section height

### Added
- Dev server port can be set with env variable `PORT`
- Code copy button

### Updated
- Dependencies

### Fixed
- Branding variables



## 4.2.0
2017-10-08

## Improved
- Expanded custom Nunjucks section tag

## Updated
- Dependencies



## 4.1.0
2017-10-05

## Added
- PostCSS



## 4.0.1
2017-10-03

## Fixed
- webpack include paths



## 4.0.0
2017-10-03

Complete rewrite with webpack. The `test` represents the new and improved folder structure.



## 3.8.1
2017-09-15

### Fixed
- HTML preview rendering config



## 3.8.0
2017-09-12

### Added
- HTML linting/validation

### Improved
- Remove empty lines from console log
- Move styleguide front end JavaScript to Browserify
- Move more console logging to separate file
- Switch to some sort of Gulp plugins for HTML rendering

### Updated
- Readme
- Dependencies



## 3.7.3
2017-08-23

### Improved
- Gulp task names
- Readme

### Updated
- Dependencies



## 3.7.2
2017-08-04

### Fixed
- Section heading IDs aren't random anymore (kinda defeats the purpose of links…)



## 3.7.1
2017-08-04

### Improved
- Test
- Add random numbers to component section ID
- Meta information
- Moved default config into separate file
- Clean up Nunjucks compilation

### Updated
- Dependencies



## 3.7.0
2017-07-19

### Updated
- Dependencies

### Removed
- Check for local styleguide
- CLI stuff that front-end-styleguide-cli already provides



## 3.6.2
2017-07-05

### Improved
- Split styleguide CSS into multiple files

### Fixed
- Reset footer and hash-link styles



## 3.6.1
2017-07-04

### Fixed
- Make branding image really optional



## 3.6.0
2017-07-04

### Added
- Hash-links to component sections

### Improved
- Branding capability for component footer



## 3.5.0
2017-07-02

### Added
- Branding capabilities
- `gulp test` for linting only

### Updated
- Dependencies
- stylelint rules

### Fixed
- Navigation hide button sizing (@finn-h)
- Handle umlauts in component and prototype pages (#2)



## 3.4.0
2017-06-26

### Updated
- Dependencies

### Fixed
- Make files outside the `src`-folder available to Nunjucks
- JavaScript Standard Style inconsistencies



## 3.3.0
2017-06-11

### Improved
- Moved to Nunjucks environment with global variables



## 3.2.0
2017-06-03

### Added
- Ability to use `.browserslistrc`

### Updated
- Dependencies



## 3.1.0
2017-05-18

### Improved
- Enforce Styleguide styles

### Added
- stylelint for test

### Updated
- Dependencies



## 3.0.2
2017-05-08

### Fixed
- Image watcher path



## 3.0.1
2017-05-07

### Fixed
- README.md link



## 3.0.0
2017-05-07

### Improved
- More or less a complete rewrite



## 2.5.4
2017-04-23

### Improved
- Replaced `gulp.watch` with `chokidar` <- more reliable!



## 2.5.3
2017-04-22

### Improved
- A11Y testing from styleguide navbar
- Use `development` NODE_ENV for preview task
- Module testing

### Updated
- Dependencies



## 2.5.2
2017-03-07

### Added
- Envify for JavaScript



## 2.5.1
2017-02-22

### Improved
- Styleguide navigation

### Added
- Test for watchers: `npm run watchtest`

### Updated
- stylelint rules for test

### Fixed
- CHANGELOG.md headings



## 2.5.0
2017-02-11

### Added
- Basic testing

### Updated
- Dependencies
- stylelint rules



## 2.4.2
2017-01-20

### Improved
- Reset component body background to white



## 2.4.1
2017-01-13

### Fixed
- Spaces in project paths
- Handlebars version variable



## 2.4.0
2017-01-03

### Added
- Fallback configuration



## 2.3.1
2016-12-31

### Fixed
- Path mess



## 2.3.0
2016-12-31

### Added
- stylelint



## 2.2.2
2016-12-17

### Improved
- README.md
- Handlebars task

### Added
- Assemble Handlebars helpers and current page indicator
- Linting scripts
- EditorConfig

### Updated
- Gulp Sass



## 2.2.1
2016-12-04

### Fixed
- Line endings for npm package
- Readme link



## 2.2.0
2016-12-03

### Improved
- Cross-platform improvements
- Readme fixes

### Added
- Switch to external init package



## 2.1.3
2016-12-03

### Added
- Correct exit code emitting



## 2.1.2
2016-12-03

### Fixed
- Startup on Windows not working correctly



## 2.1.1
2016-12-02

### Improved
- Errors break preview and production tasks
- README.md updated with latest changes



## 2.1.0
2016-12-02

### Improved
- Switch to separate CLI and local versions



## 2.0.0
2016-12-01

### Improved
- Make a npm package out of this styleguide
- Switch back to GPLv3 license



## 1.15.0
2016-11-25

### Improved
- Styleguide CSS
- Layout partials
- ESLint configuration
- Replaced included normalize.css with npm package
- Replace path configuration JavaScript with JSON

### Added
- Exclude option for copy task



## 1.14.2
2016-10-22

### Improved
- Handlebars example files
- Styleguide CSS
- In-file documentation

### Added
- Browserify error handler



## 1.14.1
2016-19-10

### Improved
- Screenreader only CSS

### Added
- Node environment eslint flag to gulpfile.js

### Fixed
- Cross platform frontmatter remover



## 1.14.0
2016-10-12

### Improved
- Styleguide menu JavaScript generation with `development` task
- Increase Sass precision to 10
- Switch to simple gulp plugin to remove Handlebars front matter
- Use `.eslintrc.json` instead of custom path and file to support IDE linters

### Updated
- Normalize.css

### Added
- Bundle JavaScript with Browserify

### Removed
- JavaScript concatenation (replaced by Browserify)



## 1.13.0
2016-09-23

### Improved
- More generic copy task
- Replace Windows file paths with Unix in Handlebars output
- No more `index.html` in {{page "filename"}} and {{page "filepath"}} helpers

### Fixed
- README.md errors
- Styleguide navigation bar cookie
- Copy task watching



## 1.12.1
2016-09-07

### Removed
- HTML development clean task



## 1.12.0
2016-09-07

### Improved
- Missing `alt` accessibility check
- Uniform Handlebars helpers and data

### Added
- Example for `embed-responsive`
- Duplicate ID accessibility check
- Missing `label` accessibility check
- SVG icon sprite component page

### Fixed
- NPM Assets copy task (new syntax)

### Removed
- Leftover IDs from testing



## 1.11.0
2016-08-26

### Improved
- Switched to permissive MIT license
- Separated Styleguide JavaScript from HTML
- Styleguide CSS
- Gulp config file is now JSON

### Added
- Basic accessibility testing from Styleguide navigation



## 1.10.0
2016-08-15

### Improved
- Remember Styleguide nav state (with a cookie)

### Updated
- README.md
- Dependencies

### Added
- Preview task (`gulp preview`)
- svgxuse

### Removed
- SVG for Everybody



## 1.9.0
2016-07-31

### Improved
- Styleguide CSS
- Browsersync HTML reloading
- Changed "front-end" to "front end"

### Updated
- Normalize.css to v4.2.0

### Added
- Dynamic Styleguide navigation categories
- Copy task for node module assets
- Handlebars {{filepath}} helper

### Fixed
- Handlebars {{rel}} helper



## 1.8.1
2016-07-28

### Improved
- More reliable Browsersync HTML reloading
- gulp.watch for new files and folders

### Added
- JavaScript subfolders



## 1.8.0
2016-07-24

### Improved
- README.md
- Styleguide CSS
- CSS/JS sectioning comments
- CSS embed responsive

### Added
- Re-introduced version number for assets
- Description meta tag

### Fixed
- Custom gulp error handlers

### Removed
- Bootstrap grid



## 1.7.0
2016-07-13

### Improved
- GPU acceleration for Styleguide nav
- Major CSS moving and juggling and changing

### Updated
- package.json

### Added
- Concat helper for Handlebars
- SVG for Everybody

### Fixed
- ESLint configuration



## 1.6.2
2016-07-03

### Improved
- Styleguide navigation reset

### Updated
- ESLint to v3.0.0

### Fixed
- icons.html removal on html clean task

### Removed
- svg-sprite inline option



## 1.6.1
2016-06-27

### Improved
- Browsersync notification
- Styleguide CSS

### Removed
- border-radius Sass mixin



## 1.6.0
2016-06-26

### Improved
- Outsource Gulp config and paths

### Added
- SVG sprite generation
- ESLint

### Fixed
- Babel and gulp-filter problem

### Removed
- JSHint
- Holder.js



## 1.5.0
2016-06-20

### Improved
- Styleguide article partial position
- Handlebars error logging
- Browsersync notification

### Added
- Babel to the party. Let's use ES6!
- Stricter JSHint config

### Fixed
- Imagemin settings



## 1.4.1
2016-06-16

### Improved
- Component article partial

### Updated
- Documentation for component article



## 1.4.0
2016-06-12

### Improved
- Styleguide menu

### Updated
- jQuery to 3.0.0

### Added
- Partial for component markup



## 1.3.2
2016-07-09

### Improved
- Small CSS changes

### Updated
- Normalize.css

### Fixed
- gulp-hb `file` to `@file`



## 1.3.1
2016-05-26

### Improved
- Error handling for Handlebars
- Switch to relative paths in generated HTML files
- Switch from Assets to Images because all the other stuff like fonts will be loaded from CDNs - there is no need for other assets anymore
- Make Styleguide Nav a bit more beautiful by removing file extension

### Updated
- Dependencies



## 1.2.1
2016-05-18

### Improved
- Highly decrease gulpfile.js complexity



## 1.2.0
2016-05-18

### Updated
- README.md

### Added
- gulp-concat for JavaScript concatenation

### Removed
- gulp-bless since old IE versions aren't supported anymore
- gulp-include (switch to gulp-concat)



## 1.1.0
2016-03-25

### Added
- Holder.js for easy image placeholders
- Forms and Typography example components
- Material Icons credits to README.md



## 1.0.1
2016-03-11

### Improved
- Switch to SVG icons for Styleguide navigation
- Open Browsersync settings in a new tab



## 1.0.0
2016-03-11

### Improved
- Completely overhauled the Styleguide navigation menu

### Updated
- jQuery to 2.2.1
- README.md



## 0.12.3
2016-03-10

### Improved
- Make the Styleguide navigation more awesome (visually)…



## 0.12.2
2016-02-21

### Improved
- Aasset version system has random number



## 0.12.1
2016-02-04

### Removed
- gulp-responsive



## 0.12.0
2016-02-04

### Added
- Bootstrap responsive utilities
- Tried gulp-responsive (not enabled because of a bug)

### Removed
- Unused Sass mixins



## 0.11.5
2016-01-28

### Added
- CSS and JavaScript version number for cache invalidation



## 0.11.4
2016-01-26

### Added
- `box-sizing: border-box` to all Elements… cause Bootstrap requires it and everyone needs it



## 0.11.3
2016-01-21

### Improved
- Styleguide CSS

### Added
- `gulp development` task for one time generation of development files

### Fixed
- Handlebars production task receives correct input files
- Browsersync reloads correctly on Sass change



## 0.11.2
2016-01-16

### Added
- Assets Browsersync reloading

### Fixed
- Splitted CSS generation for IE is now working properly



## 0.11.1
2016-01-11

### Improved
- Some cleaning here, some cleaning there



## 0.11.0
2016-01-10

### Improved
- Styleguide dev menu uses more streamlined CSS

### Added
- Handlebars to HTML compilation now supports subfolders
- Console logging shows which file changed



## 0.10.0
2016-01-08

### Added
- gulp-include for JavaScript concatenation

### Removed
- gulp-concat (switch to gulp-include)



## 0.9.0
2016-01-06

### Improved
- Some general clean up and update

### Added
- gulp-bless



## 0.8.1
2016-01-03

### Improved
- Handlebars error logging

### Added
- gulp-plumber to prevent unpiping



## 0.8.0
2015-12-29

### Added
- gulp-hb/Handlebars template engine

### Removed
- Nunjucks (switch to Handlebars… again)



## 0.7.0
2015-12-20

### Added
- gulp-watch for file/directory watching

### Removed
- watchr (switch to gulp-watch)



## 0.6.0
2015-12-14

### Improved
- Page generation with Nunjucks is feature complete

### Updated
- README.md



## 0.5.0
2015-12-11

### Added
- Nunjucks template engine

### Removed
- Assemble/Handlebars (some core features are still not available)



## 0.4.0
2015-12-8

### Added
- Assemble/Handlebars template engine



## 0.3.0
2016-12-02

### Added
- Browsersync



## 0.2.0
2016-11-29

### Added
- watchr for file/directory watching

### Removed
- gulp.watch
- gulp-watch



## 0.1.0
2016-11-28

The first (almost) working release. Some issues with Gulp's watch remaining (editor's note after 8 months: still not working flawlessly :P).
