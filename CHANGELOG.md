# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [5.5.1](https://github.com/pangolinjs/core/compare/v5.5.0...v5.5.1) (2020-03-04)


### Bug Fixes

* Avoid large `components.json` ([7121c0b](https://github.com/pangolinjs/core/commit/7121c0b3999375db45ca903bd6a67b7e2f60c692))
* Don't prettify modern build helper code (Fix [#84](https://github.com/pangolinjs/core/issues/84)) ([a0a2698](https://github.com/pangolinjs/core/commit/a0a26982ad1858c879da87fbb4fbc626788fe2e0))
* Slightly increase HTML line length to 100 ([0c9f69f](https://github.com/pangolinjs/core/commit/0c9f69f0e5c397eb1e293b0b03302e3b0195c07e))

## [5.5.0](https://github.com/pangolinjs/core/compare/v5.4.2...v5.5.0) (2020-02-14)


### Features

* Make dependency transpilation possible ([#83](https://github.com/pangolinjs/core/issues/83)) ([56b516a](https://github.com/pangolinjs/core/commit/56b516a559f4f36e924558219f3981c4ab55e1ed))
* Re-add component docs (Close [#80](https://github.com/pangolinjs/core/issues/80)) ([c0764c7](https://github.com/pangolinjs/core/commit/c0764c726e3e71e44cb87a416d37dddcdbd94103))


### Bug Fixes

* **ui:** Remove forced global vertical scrollbar … again ([#65](https://github.com/pangolinjs/core/issues/65)) ([2e32946](https://github.com/pangolinjs/core/commit/2e32946e11fc4af0ea88dc2c36f05e7df4aaece6))
* **ui:** Transpile for older browsers ([#83](https://github.com/pangolinjs/core/issues/83)) ([5c4fd9c](https://github.com/pangolinjs/core/commit/5c4fd9cf2960c656de33cac30caf33a16cf3b06f))

### [5.4.2](https://github.com/pangolinjs/core/compare/v5.4.1...v5.4.2) (2020-01-22)


### Bug Fixes

* **ui:** Center dark mode switcher (Fix [#81](https://github.com/pangolinjs/core/issues/81)) ([a963361](https://github.com/pangolinjs/core/commit/a96336121bf02f7f0e5b3275e6c9038c6d6ea341))

### [5.4.1](https://github.com/pangolinjs/core/compare/v5.4.0...v5.4.1) (2020-01-13)


### Bug Fixes

* Comply with Prettier parser specs ([34d8150](https://github.com/pangolinjs/core/commit/34d81504b3d372a90c0213995c7c4d1fe4543d3e))
* Trim white space in HTML attributes ([1f74d40](https://github.com/pangolinjs/core/commit/1f74d40b9e58ac6e87517548bcba38d83e6a11da))

## [5.4.0](https://github.com/pangolinjs/core/compare/v5.3.0...v5.4.0) (2020-01-13)


### Features

* Prettify attributes in render (Close [#78](https://github.com/pangolinjs/core/issues/78)) ([c0621f1](https://github.com/pangolinjs/core/commit/c0621f1403aed63d3c11138627e620471b681a78))


### Bug Fixes

* Add note for Node.js compatibility (Fix [#79](https://github.com/pangolinjs/core/issues/79)) ([73fc7eb](https://github.com/pangolinjs/core/commit/73fc7eb0f40068ac114911a7e6bcac7469938726))

## [5.3.0](https://github.com/pangolinjs/core/compare/v5.2.0...v5.3.0) (2019-12-15)


### Features

* **ui:** Make sidebar groups transparent if the only child is named after the parent (Close [#68](https://github.com/pangolinjs/core/issues/68)) ([ac89ec2](https://github.com/pangolinjs/core/commit/ac89ec2ee27da252c2e1244c166f5dcb34d3e6d2))
* Link `extends` in highlighted source (Close [#69](https://github.com/pangolinjs/core/issues/69)) ([3f6ec9d](https://github.com/pangolinjs/core/commit/3f6ec9dbb79514f4ad791d50ca611aac64d5f57d))


### Bug Fixes

* Only prettify HTML in production ([#74](https://github.com/pangolinjs/core/issues/74)) ([4e074f9](https://github.com/pangolinjs/core/commit/4e074f972b46e5bb187138c43f93cce010cc892a))

## [5.2.0](https://github.com/pangolinjs/core/compare/v5.1.0...v5.2.0) (2019-12-13)


### Features

* Prettify rendered HTML (Close [#74](https://github.com/pangolinjs/core/issues/74)) ([1e59ed8](https://github.com/pangolinjs/core/commit/1e59ed8cef01181d5d178b65b4d27cd461cfc8d7))


### Bug Fixes

* **ui:** Don’t discard children in search (Fix [#70](https://github.com/pangolinjs/core/issues/70)) ([f7910b5](https://github.com/pangolinjs/core/commit/f7910b5ec8d2acab7d1cad9e6e395e4adb0c39a8))
* **ui:** Increase syntax highlighting contrast in dark mode (Fix [#72](https://github.com/pangolinjs/core/issues/72)) ([0307d32](https://github.com/pangolinjs/core/commit/0307d320cffd7a06280a8b080d0c20bd1999e3f4))
* **ui:** Keep query parameters on redirect (Fix [#73](https://github.com/pangolinjs/core/issues/73)) ([81be2ce](https://github.com/pangolinjs/core/commit/81be2ce0813ceac38a463444d8b0202b655eddf3))
* **ui:** Remove background from operators (Fix [#71](https://github.com/pangolinjs/core/issues/71)) ([db9e800](https://github.com/pangolinjs/core/commit/db9e8006b8b7383218b8ab3b24657478d2778493))

## [5.1.0](https://github.com/pangolinjs/core/compare/v5.0.0...v5.1.0) (2019-11-22)


### Features

* Enable `esModules` option for `file-loader` ([4bb4f50](https://github.com/pangolinjs/core/commit/4bb4f50eb29cf05d074648f1659b5ce3031f57b8))


### Bug Fixes

* **ui:** Correctly calculate color contrast ([74148de](https://github.com/pangolinjs/core/commit/74148dea9032335fffb5a27b957edb29ce34eb50))

## [5.0.0](https://github.com/pangolinjs/core/compare/v5.0.0-rc.5...v5.0.0) (2019-11-21)


### Features

* **ui:** Add dedicated template pages ([d750bc9](https://github.com/pangolinjs/core/commit/d750bc95e4a0d5db326e3df6e2690c4feadecf8f))
* **ui:** Enhance components sidebar (Close [#67](https://github.com/pangolinjs/core/issues/67)) ([378a7e6](https://github.com/pangolinjs/core/commit/378a7e6d92221f9a4a7a13b985bbd9d7c8c1d122))
* **ui:** Improve sidebar design ([7fa99b3](https://github.com/pangolinjs/core/commit/7fa99b33aef1f4b4df0bb7a14732b189bd7db548))
* **ui:** Remove dark mode namespace ([7593163](https://github.com/pangolinjs/core/commit/75931630203feb69d4e1ca2455dd791a94516bf5))


### Bug Fixes

* Don't suppress error messages in dev mode (Fix [#25](https://github.com/pangolinjs/core/issues/25)) ([ecbbca0](https://github.com/pangolinjs/core/commit/ecbbca09cb04f9361e18508ceef3016e8aaad45b))
* Only link components in source tab (Fix [#64](https://github.com/pangolinjs/core/issues/64)) ([6e30219](https://github.com/pangolinjs/core/commit/6e30219447f83a293c21ae64512d5b4e01f5a113))
* Use new webpack API for modified files (Fix [#63](https://github.com/pangolinjs/core/issues/63)) ([ee05d26](https://github.com/pangolinjs/core/commit/ee05d26db718e1fbad75c4e329e26a5bc620a1b4))
* **ui:** Remove forced global vertical scrollbar (Fix [#65](https://github.com/pangolinjs/core/issues/65)) ([3967a3a](https://github.com/pangolinjs/core/commit/3967a3a113c39f5d5be98d267872df0fe5c55f41))

## [5.0.0-rc.5](https://github.com/pangolinjs/core/compare/v5.0.0-rc.4...v5.0.0-rc.5) (2019-10-28)


### Bug Fixes

* **ui:** Add `index.html` to package ([e279ce1](https://github.com/pangolinjs/core/commit/e279ce1))

## [5.0.0-rc.4](https://github.com/pangolinjs/core/compare/v5.0.0-rc.3...v5.0.0-rc.4) (2019-10-27)


### ⚠ BREAKING CHANGES

* **deps:** Both `eslint` and `stylelint` must be re-installed with `npm install --save-dev eslint stylelint`.

### Bug Fixes

* **ui:** Use brand color as Vuetify primary color ([02fab51](https://github.com/pangolinjs/core/commit/02fab51))


### Features

* **ui:** Add template tab and link imports and includes (Close [#59](https://github.com/pangolinjs/core/issues/59)) ([3b660b1](https://github.com/pangolinjs/core/commit/3b660b1))
* **ui:** Make the index page 100% friendlier ([eadfa91](https://github.com/pangolinjs/core/commit/eadfa91))
* **ui:** Syntax highlighting for source (Close [#58](https://github.com/pangolinjs/core/issues/58)) ([8a5a972](https://github.com/pangolinjs/core/commit/8a5a972))


* **deps:** Make `eslint` and `stylelint` peer dependencies (Close [#62](https://github.com/pangolinjs/core/issues/62)) ([4c53de2](https://github.com/pangolinjs/core/commit/4c53de2))

## [5.0.0-rc.3](https://github.com/pangolinjs/core/compare/v5.0.0-rc.2...v5.0.0-rc.3) (2019-10-14)


### Bug Fixes

* Let stylelint throw warnings so webpack can emit files ([f4be6cf](https://github.com/pangolinjs/core/commit/f4be6cf))

## [5.0.0-rc.2](https://github.com/pangolinjs/core/compare/v5.0.0-rc.1...v5.0.0-rc.2) (2019-10-14)


### Bug Fixes

* **ui:** Clear console on navigation (Close [#60](https://github.com/pangolinjs/core/issues/60)) ([944e430](https://github.com/pangolinjs/core/commit/944e430))

## [5.0.0-rc.1](https://github.com/pangolinjs/core/compare/v5.0.0-rc.0...v5.0.0-rc.1) (2019-10-07)


### Bug Fixes

* **ui:** Browser history works again (Fix [#57](https://github.com/pangolinjs/core/issues/57)) ([1ff4953](https://github.com/pangolinjs/core/commit/1ff4953))
* **ui:** Fight with Vuetify ⚔️ ([512dd6e](https://github.com/pangolinjs/core/commit/512dd6e))
* **ui:** Set title and favicon correctly ([b35ad48](https://github.com/pangolinjs/core/commit/b35ad48))
* **ui:** Use real links for sidebar ([7d07852](https://github.com/pangolinjs/core/commit/7d07852))
* Don't show webpack performance hint for Pangolin.js files ([fedffd2](https://github.com/pangolinjs/core/commit/fedffd2))


### Features

* **ui:** Clear console on component reload ([b64b442](https://github.com/pangolinjs/core/commit/b64b442))

## [5.0.0-rc.0](https://github.com/pangolinjs/core/compare/v5.0.0-beta.27...v5.0.0-rc.0) (2019-09-20)


### Bug Fixes

* Remove unnecessary console.log statement ([6f4d378](https://github.com/pangolinjs/core/commit/6f4d378))


### Features

* Rename to `@pangolinjs/core` ([ccedca3](https://github.com/pangolinjs/core/commit/ccedca3))

## [5.0.0-beta.27](https://github.com/pangolinjs/core/compare/v5.0.0-beta.26...v5.0.0-beta.27) (2019-08-05)


### Bug Fixes

* **UI:** Add favicon path to head ([99fbab5](https://github.com/pangolinjs/core/commit/99fbab5))
* **UI:** Automatic foreground color ([1984f6f](https://github.com/pangolinjs/core/commit/1984f6f))

## [5.0.0-beta.26](https://github.com/pangolinjs/core/compare/v5.0.0-beta.25...v5.0.0-beta.26) (2019-07-25)


### Bug Fixes

* Brand color as primary UI color ([6a61856](https://github.com/pangolinjs/core/commit/6a61856))



## [5.0.0-beta.25](https://github.com/pangolinjs/core/compare/v5.0.0-beta.24...v5.0.0-beta.25) (2019-07-16)


### Bug Fixes

* **UI:** Use correct URL for standalone render page link ([dae3aac](https://github.com/pangolinjs/core/commit/dae3aac))



## [5.0.0-beta.24](https://github.com/pangolinjs/core/compare/v5.0.0-beta.23...v5.0.0-beta.24) (2019-07-04)


### Bug Fixes

* **UI:** Component render isn't resolved correctly ([38829c2](https://github.com/pangolinjs/core/commit/38829c2))



## [5.0.0-beta.23](https://github.com/pangolinjs/core/compare/v5.0.0-beta.22...v5.0.0-beta.23) (2019-07-04)


### Bug Fixes

* **UI:** Respect base path during path resolution ([84e31fc](https://github.com/pangolinjs/core/commit/84e31fc))



## [5.0.0-beta.22](https://github.com/pangolinjs/core/compare/v5.0.0-beta.21...v5.0.0-beta.22) (2019-07-03)


### Bug Fixes

* Don't try to connect to socket in dev build ([#44](https://github.com/pangolinjs/core/issues/44)) ([b068484](https://github.com/pangolinjs/core/commit/b068484))



## [5.0.0-beta.21](https://github.com/pangolinjs/core/compare/v5.0.0-beta.20...v5.0.0-beta.21) (2019-07-03)


### Bug Fixes

* Load UI HTML file from correct location ([6d225c2](https://github.com/pangolinjs/core/commit/6d225c2))



## [5.0.0-beta.20](https://github.com/pangolinjs/core/compare/v5.0.0-beta.19...v5.0.0-beta.20) (2019-07-03)


### Bug Fixes

* Disable UI socket if path isn't set (Fix [#44](https://github.com/pangolinjs/core/issues/44)) ([8e46d56](https://github.com/pangolinjs/core/commit/8e46d56))
* Inspect command and assets in modern build (Fix [#43](https://github.com/pangolinjs/core/issues/43)) ([9b9e0c5](https://github.com/pangolinjs/core/commit/9b9e0c5))
* Make returned paths from `require`d files usable (Fix [#42](https://github.com/pangolinjs/core/issues/42)) ([40434a8](https://github.com/pangolinjs/core/commit/40434a8))


### Features

* Remove Markdown docs ([6d76790](https://github.com/pangolinjs/core/commit/6d76790))
* UI overhaul featuring Vuetify.js ([#48](https://github.com/pangolinjs/core/issues/48)) (Fix [#47](https://github.com/pangolinjs/core/issues/47)) ([a5ea3fc](https://github.com/pangolinjs/core/commit/a5ea3fc))


### BREAKING CHANGES

* Markdown files no longer generate a docs section. Projects continue to work without any necessary changes.



## [5.0.0-beta.19](https://github.com/pangolinjs/core/compare/v5.0.0-beta.18...v5.0.0-beta.19) (2019-06-15)


### Features

* Proxy WebSocket through webpack-dev-server (Fix [#38](https://github.com/pangolinjs/core/issues/38)) ([19aedef](https://github.com/pangolinjs/core/commit/19aedef))



## [5.0.0-beta.18](https://github.com/pangolinjs/core/compare/v5.0.0-beta.17...v5.0.0-beta.18) (2019-05-25)


### Features

* Support secure WebSocket (Fix [#38](https://github.com/pangolinjs/core/issues/38)) ([5d48062](https://github.com/pangolinjs/core/commit/5d48062))



## [5.0.0-beta.17](https://github.com/pangolinjs/core/compare/v5.0.0-beta.16...v5.0.0-beta.17) (2019-05-12)


### Bug Fixes

* User config existence check ([5c624e4](https://github.com/pangolinjs/core/commit/5c624e4))



## [5.0.0-beta.16](https://github.com/pangolinjs/core/compare/v5.0.0-beta.15...v5.0.0-beta.16) (2019-05-12)


### Features

* Log errors from user config file (Fixes [#40](https://github.com/pangolinjs/core/issues/40)) ([692d6cd](https://github.com/pangolinjs/core/commit/692d6cd))
* Switch to dart-sass (Fixes [#41](https://github.com/pangolinjs/core/issues/41)) ([81648d6](https://github.com/pangolinjs/core/commit/81648d6))



# [5.0.0-beta.15](https://github.com/pangolinjs/core/compare/v5.0.0-beta.14...v5.0.0-beta.15) (2019-04-16)


### Bug Fixes

* Adjust default hostname in command help ([d82d774](https://github.com/pangolinjs/core/commit/d82d774))


### Features

* Use devServer options from webpack config ([f062775](https://github.com/pangolinjs/core/commit/f062775))



# [5.0.0-beta.14](https://github.com/pangolinjs/core/compare/v5.0.0-beta.13...v5.0.0-beta.14) (2019-04-12)


### Features

* Format host depending on environment ([9e0963f](https://github.com/pangolinjs/core/commit/9e0963f))



# [5.0.0-beta.13](https://github.com/pangolinjs/core/compare/v5.0.0-beta.12...v5.0.0-beta.13) (2019-04-09)


### Features

* Add host and port arguments to dev command ([e3d7a05](https://github.com/pangolinjs/core/commit/e3d7a05))



# [5.0.0-beta.12](https://github.com/pangolinjs/core/compare/v5.0.0-beta.11...v5.0.0-beta.12) (2019-03-27)


### Bug Fixes

* Use checkbox for dark mode instead of radio ([07aceda](https://github.com/pangolinjs/core/commit/07aceda))


### Features

* Auto-set page title color ([a1ce450](https://github.com/pangolinjs/core/commit/a1ce450))
* Move browser open from config to CLI ([cf30f49](https://github.com/pangolinjs/core/commit/cf30f49))
* Show parent in nav if single child is named differently ([a56c1c8](https://github.com/pangolinjs/core/commit/a56c1c8))



# [5.0.0-beta.11](https://github.com/pangolinjs/core/compare/v5.0.0-beta.10...v5.0.0-beta.11) (2019-03-25)


### Bug Fixes

* Menu close button color in dark mode ([e549e8d](https://github.com/pangolinjs/core/commit/e549e8d))



## 5.0.0-beta.10
2019-03-18

### Updated
- Dependencies

### Fixed
- No 'defer'-attribute on module scripts
- CSS import in JS for modern build
- 'defaults' browserslist env



## 5.0.0-beta.9
2019-02-19

### Added
- crossorigin config option

### Updated
- Dependencies



## 5.0.0-beta.8
2019-02-18

### Updated
- Dependencies

### Fixed
- Fancy webpackbar in CI env



## 5.0.0-beta.7
2019-02-14

### Added
- Build type env variable

### Fixed
- Different filenames for webpack report in modern build
- Nav not remembering position

### Updated
- Dependencies



## 5.0.0-beta.6
2019-02-02

### Added
- Optional modern bundle

### Updated
- Dependencies



## 5.0.0-beta.5
2019-01-15

### Updated
- Dependencies

### Removed
- npm shrinkwrap (fixes #31)



## 5.0.0-beta.4
2018-12-21

### Added
- Webpack Bundle Analyzer option for build command

### Updated
- Dependencies



## 5.0.0-beta.3
2018-12-03

### Updated
- Dependencies

### Fixed
- Correctly detect ports used by Docker



## 5.0.0-beta.2
2018-11-28

### Updated
- Dependencies



## 5.0.0-beta.1
2018-11-09

This release seems to be stable enough for a first beta. Breaking changes can still be a thing but should be a lot rarer.

### Updated
- Dependencies (No `--ignore-engines` anymore for Nunjucks 🎉)



## 5.0.0-alpha.11
2018-10-27

### Added
- Custom Nunjucks tags

### Improved
- CLI for pangolin-core
- Bin file is now called `pangolin-core.js`

### Updated
- Dependencies

### Removed
- Dark mode transition to avoid page flashing



## 5.0.0-alpha.10
2018-10-01

### Improved
- Watch Nunjucks template changes

### Updated
- Dependencies

### Removed
- imagemin



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
