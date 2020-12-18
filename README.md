<p align="center">
  <a href="https://wexond.net"><img src="static/icons/icon.png" width="256"></a>
</p>

<div align="center">
<h1>Chocola</h1>

[![Actions Status](https://github.com/LamkasDev/chocola/workflows/Build/badge.svg)](https://github.com/LamkasDev/chocola/actions)
[![Downloads](https://img.shields.io/github/downloads/LamkasDev/chocola/total.svg?style=flat-square)](https://github.com/LamkasDev/chocola/releases)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FLamkasDev%2Fchocola.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FLamkasDev%2Fchocola?ref=badge_shield)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-brightgreen?style=flat-square)](https://www.paypal.me/LamkasDev)

Chocola is an extensible and privacy-focused web browser with a totally different user experience, built on top of `Electron` and `React`. It aims to be fast, private, beautiful, extensible and functional.
(fork of <a href="https://github.com/wexond/desktop">Wexond</a>)

</div>

# Features

- **Wexond Shield** - Browse the web without any ads and don't let websites to track you. Thanks to the Wexond Shield powered by [Cliqz](https://github.com/cliqz-oss/adblocker), websites can load even 8 times faster!
- **Chromium without Google services and low resources usage** - Since Chocola uses Electron under the hood which is based on only several and the most important Chromium components, it's not bloated with redundant Google tracking services and others.
- **Beautiful and modern UI**
- **Fast and fluent UI** - The animations are really smooth and their timings are perfectly balanced.
- **Highly customizable new tab page** - Customize almost an every aspect of the new tab page!
- **Customizable browser UI** - Choose whether Chocola should have compact or normal UI.
- **Tab groups** - Easily group tabs, so it's hard to get lost.
- **Scrollable tabs**
- **Partial support for Chrome extensions** - Install some extensions directly from Chrome Web Store\* (see [#110](https://github.com/wexond/wexond/issues/110)) (WIP)
- **Packages** - Extend Chocola for your needs, by installing or developing your own packages and themes\* ([#147](https://github.com/wexond/wexond/issues/147)) (WIP)

# Screenshots

![image](https://qtlamkas.why-am-i-he.re/lGtrsa.jpeg)

UI normal variant:
![image](https://qtlamkas.why-am-i-he.re/YCHMdc.png)

UI compact variant:
![image](https://qtlamkas.why-am-i-he.re/ZJKRud.png)
![image](https://qtlamkas.why-am-i-he.re/xdBOey.png)

# Downloads
- [Stable and beta versions](https://github.com/LamkasDev/chocola/releases)
- [Nightlies](https://github.com/LamkasDev/chocola-nightly/releases)

# [Roadmap](https://github.com/LamkasDev/chocola/projects)

# Contributing

If you have found any bugs or just want to see some new features in Chocola, feel free to open an issue. We're open to any suggestions. Bug reports would be really helpful for us and appreciated very much. Chocola is in heavy development and some bugs may occur. Also, please don't hesitate to open a pull request. This is really important to us and for the further development of this project.

## Running

Before running Chocola, please ensure you have **latest** [`Node.js`](https://nodejs.org/en/) and [`Yarn`](https://classic.yarnpkg.com/en/docs/install/#windows-stable) installed on your machine.

When running on Windows, make sure you have build tools installed. You can install them by running this command as **administrator**:

```bash
$ npm i -g windows-build-tools
```

Firstly, run this command to install all needed dependencies. If you have encountered any problems, please report it.

```bash
$ yarn
```

After a successful installation, the native modules need to be rebuilt using Electron headers. To do this, run:

```bash
$ npm run rebuild
```

The given command below will run Chocola in the development mode.

```bash
$ npm run dev
```

# Documentation

Guides and the API reference are located in [`docs`](docs) directory.

# License

For commercial or proprietary purposes, please contact me on sentialx@gmail.com

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FLamkasDev%2Fchocola.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FLamkasDev%2Fchocola?ref=badge_large)
