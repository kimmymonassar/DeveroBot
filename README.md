# 🤖 Deverobot for Discord 🤖
[![CircleCI](https://circleci.com/gh/kimmymonassar/DeveroBot.svg?style=shield)](https://github.com/kimmymonassar/DeveroBot) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## 💬 About Deverobot
Simple discord bot to show various statistics, gamble and play music etc.
Deverobots official website is [https://devero.dev](https://devero.dev). There you can checkout our official discord and invite the bot to your own discord server.

If you dont feel like visiting the website, here is the Discord bot invite link:  
[Invite bot](https://discord.com/api/oauth2/authorize?client_id=774981128419409960&permissions=3536896&scope=bot)

## 🔑 Key Features
  - **postmeme** -- (also: 'meme') - posts a random meme from subscribed subreddits
  - **listreddits** -- (also: 'listsubreddits') - lists currently subscribed subreddits
  - **cryptoprice** -- (also: 'crypto', 'btc', 'eth', 'xrp') - lists current cypto prices
  - **stock** -- (also: 'stockprice') - takes one argument in the form of stock symbol 
  - **gamble** -- (also: 'dice') - takes on argument, gamble away your hard earned points
  - **balance** -- (also: 'wallet', 'money', 'currency', 'bal') show current balance
  - **beg** -- (also: 'moneypls') - begs for balance
  - ~~play~~ -- (also: 'song', 'music') - Play your favorite songs, takes one youtube link as argument (**coming soon**)
  - **listcases** -- (also: 'caselist', 'csgocases') - Lists all available CSGO cases you can open
  - **case** -- (also: 'open', 'opencase') Opens a CSGO case

## 🔗 Official development discord
https://discord.gg/eCjP4C7vYG

## 💻 Contributing
To contribute to the project, either create an issue or fork the repo and then follow the commit standard and make a PR. Or join the discord to talk about the feature you want to add or the issue you've encountered.

### Commit convention
When commiting to the repo its important to write commit messages that follow our convention, we even have a pre-commit hook that wont let you commit if you dont follow the convention.

Since we manage versions with [semantic-release](https://github.com/semantic-release/semantic-release) we use prefixes to handle the semantic versioning when a build is triggered.

Here is an example taken from semantic-release's README.
| Commit message | Release type |
|---|---|
| fix(pencil): stop graphite breaking when too much pressure applied  | Patch Release |
| feat(pencil): add 'graphiteWidth' option	  | Minor Feature Release |
| perf(pencil): remove graphiteWidth option  | Major Release |
| BREAKING CHANGE: The graphiteWidth option has been removed | ~~Major~~ Breaking Release |

You can also use other prefixes that will trigger a build but not an official release.
These commands can be:
- 'chore'
- 'docs'
- 'revert'
- 'style'  
and many more.

Since we dont really want to publish this bot to NPM we use the plugin [@semantic-release/git](https://github.com/semantic-release/git)

You can read more about commit message conventions over at commitlint:  
[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

## 🗺️ Roadmap
Check out our [Kanban](https://github.com/kimmymonassar/DeveroBot/projects/1) for in progress and upcoming features.

## 🍺 Buy me a beer
[![paypal](https://img.shields.io/static/v1?label=paypal&message=donate&color=success&logo=PayPal&style=for-the-badge)](https://paypal.me/deverobot)

