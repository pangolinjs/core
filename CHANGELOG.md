# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0-rc.6](https://github.com/pangolinjs/core/compare/v6.0.0-rc.5...v6.0.0-rc.6) (2021-02-19)

## [6.0.0-rc.5](https://github.com/pangolinjs/core/compare/v6.0.0-rc.4...v6.0.0-rc.5) (2021-01-14)


### Bug Fixes

* Generated paths in docs head ([eddace4](https://github.com/pangolinjs/core/commit/eddace40f201ddece79ad37d49390ebd04d61ebc))

## [6.0.0-rc.4](https://github.com/pangolinjs/core/compare/v6.0.0-rc.3...v6.0.0-rc.4) (2021-01-14)


### Features

* Split build into separate build and docs commands ([25d3bd9](https://github.com/pangolinjs/core/commit/25d3bd98d73ba9920994525b4f0c7b138aea7755))
* Use absolute URLs for assets linked from CSS or JS ([9bab164](https://github.com/pangolinjs/core/commit/9bab164f6ccd3aba46b3782d07aa7c8c52cf507e))

## [6.0.0-rc.3](https://github.com/pangolinjs/core/compare/v6.0.0-rc.2...v6.0.0-rc.3) (2021-01-04)

## [6.0.0-rc.2](https://github.com/pangolinjs/core/compare/v6.0.0-rc.1...v6.0.0-rc.2) (2020-12-08)


### Bug Fixes

* Manifest plugin import ([f6438e7](https://github.com/pangolinjs/core/commit/f6438e721202677105c4087a4fbadbb70311f376))

## [6.0.0-rc.1](https://github.com/pangolinjs/core/compare/v6.0.0-rc.0...v6.0.0-rc.1) (2020-12-08)


### Features

* Allow UI label customization ([d77f28b](https://github.com/pangolinjs/core/commit/d77f28bfd2517c98d0c8c51468c23801e4a73f98))


### Bug Fixes

* Increment port for Fractal ([d3506ab](https://github.com/pangolinjs/core/commit/d3506ab0c561749eb5416452189cd312a8c79641))

## [6.0.0-rc.0](https://github.com/pangolinjs/core/compare/v6.0.0-beta.4...v6.0.0-rc.0) (2020-11-04)


### Features

* Use custom sidebar information config (Close [#97](https://github.com/pangolinjs/core/issues/97)) ([cd3bfb2](https://github.com/pangolinjs/core/commit/cd3bfb25a59206f759abe7b33b8e5e918650cbb4))


### Bug Fixes

* Gracefully shut down dev server ([62ee1ae](https://github.com/pangolinjs/core/commit/62ee1ae5ec98a15a3626239e2186c270cd611edb))

## [6.0.0-beta.4](https://github.com/pangolinjs/core/compare/v6.0.0-beta.3...v6.0.0-beta.4) (2020-10-21)


### Bug Fixes

* Apply correct number of loaders before css-loader ([adb453f](https://github.com/pangolinjs/core/commit/adb453fabfe554d243537d49007e07c0bace0343))
* Temporary solution for broken HMR ([381419d](https://github.com/pangolinjs/core/commit/381419d99de1e0abf4679f9e97762f756de6fb0a))

## [6.0.0-beta.3](https://github.com/pangolinjs/core/compare/v6.0.0-beta.2...v6.0.0-beta.3) (2020-10-20)

## [6.0.0-beta.2](https://github.com/pangolinjs/core/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2020-10-20)

## [6.0.0-beta.1](https://github.com/pangolinjs/core/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2020-09-18)


### Bug Fixes

* Set correct public asset path for Fractal ([ea990ae](https://github.com/pangolinjs/core/commit/ea990ae8d8a9dbf447b250a262356bf3e974b88f))

## [6.0.0-beta.0](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.5...v6.0.0-beta.0) (2020-09-18)


### Features

* Expose engine configuration ([1eaf009](https://github.com/pangolinjs/core/commit/1eaf009c027eb0fcf6d5bc9d0f06fdaf90ced60d))
* Expose webpack configuration ([48872dd](https://github.com/pangolinjs/core/commit/48872dd90e2cfc987df256b933e1838a6d4c2486))
* Serve UI and files from a single port ([dfd040e](https://github.com/pangolinjs/core/commit/dfd040e992dcee6b498e7e62fc0d0f324d6301a1))

## [6.0.0-alpha.5](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.4...v6.0.0-alpha.5) (2020-09-09)


### Bug Fixes

* Switch to new postcss-loader options format ([77df2a7](https://github.com/pangolinjs/core/commit/77df2a76361213ecdebd220c3d82687579af023c))

## [6.0.0-alpha.4](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.3...v6.0.0-alpha.4) (2020-09-09)


### Features

* Resolve CSS URLs relative to file paths ([c1338cf](https://github.com/pangolinjs/core/commit/c1338cfbd49fd3a6c703aff0fccd85ae6677fdc6))


### Bug Fixes

* Scope Pangolin's Nunjucks head tag ([8d66559](https://github.com/pangolinjs/core/commit/8d665592b0dc7549489c6d8e2664380711fbbfb7))

## [6.0.0-alpha.3](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.2...v6.0.0-alpha.3) (2020-09-08)


### Features

* Generate relative assets paths ([3941979](https://github.com/pangolinjs/core/commit/394197936795a022c5f55d314c8886a630ea913d))
* Introduce separate "static" command ([1e9ced4](https://github.com/pangolinjs/core/commit/1e9ced4b43476a3a126073cf1cbfc30c25213f6c))
* Separate "static" command isn't necessary with relative URLs ([de7f405](https://github.com/pangolinjs/core/commit/de7f4052f250cea01018fc5554ce06e3bc95c88b))

## [6.0.0-alpha.2](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.1...v6.0.0-alpha.2) (2020-09-07)

## [6.0.0-alpha.1](https://github.com/pangolinjs/core/compare/v6.0.0-alpha.0...v6.0.0-alpha.1) (2020-09-07)


### Features

* Implement file name hashing ([a32d8cb](https://github.com/pangolinjs/core/commit/a32d8cb9a6906f23d921fc93754e64c3dfa5985e))

## [6.0.0-alpha.0](https://github.com/pangolinjs/core/compare/v5.8.2...v6.0.0-alpha.0) (2020-08-11)


### Features

* Setup v6 ([5207092](https://github.com/pangolinjs/core/commit/5207092a5526dcc1b40e6b9b3057309d7ff60a22))
