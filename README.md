# discordjs-viewer

Get gameserver status on Discord with command `!status`.

This is a **very simple** implementation of mTxServ API with Discord.

![Demo](demo.png)


# mTxServ credential

* OAuth: https://mtxserv.com/fr/mon-compte/oauth
* Api Key: https://mtxserv.com/fr/mon-compte/api

# Discord

## Create Bot

You need to create credential on Discord: https://discordapp.com/developers/applications/

* Create Application
* Go to `settings` -> `Bot`
* Click on button `Add Bot`
* Get token
* Set `Public bot` to `off`
* Go to `OAuth2`
* In scope section, set `Bot` to `on`
* Set bot permission `Send Message` to `on` and use the URL generated to add it on your server

# Install

```
npm install
```

# Configuration

To use this bot, you need to set your configuration in `config.json` :

```
cp config.json.dist config.json
```

List of gameserver types :

* ark  
* team-fortress-2
* counter-strike-global-offensive
* counter-strike-source
* counter-strike-condition-zero
* counter-strike-1-6
* day-of-defeat-source
* day-of-defeat-1-3
* bungeecord
* star-made
* minecraft  
* left-4-dead-2
* garry-s-mod

# Usage

```
node index.js
```
