<h1 align="center">Welcome to 3box-did-utils 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/pi0neerpat" target="_blank">
    <img alt="Twitter: pi0neerpat" src="https://img.shields.io/twitter/follow/pi0neerpat.svg?style=social" />
  </a>
</p>

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

> Playground to build + test 3box-verifications-v2

## Install

```sh
yarn install
```

## Usage

This repo is for testing a running instance (local or hosted) of [3box-verifications-v2](https://github.com/pi0neerpat/3box-verifications-v2). The primary tool is the test suite, however there are also convenient test scripts provided in `scripts/`.

In order to pass all tests, you'll need to create a tweet & public gist containing the text `did:key:z6MkrhLBfwRkSedFLwQyJtyFB1ypBD557eq5k4hVvLvADREh`. Keep in mind that gists must be less than 30 minutes old, and only the 5 most recent tweets are considered.

You'll also need to update `API_ENDPOINT` and the `USERNAME` to reflect your own twitter/github accounts.

```sh
yarn test
```

## Author

👤 **Patrick Gallagher**

- Website: https://patrickgallagher.dev
  - Twitter: [@pi0neerpat](https://twitter.com/pi0neerpat)
  - GitHub: [@pi0neerpat](https://github.com/pi0neerpat)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
