const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const querystring = require('querystring');

const oauthTokenUrl = 'https://mtxserv.com/oauth/v2/token?';
const viewerApiUrl =
    'https://mtxserv.com/api/v1/viewers/game?ip=' +
    config.gameserver_ip +
    '&port=' +
    config.gameserver_port +
    '&type=' +
    config.gameserver_type;

const authParams = {
    grant_type: 'https://mtxserv.com/grants/api_key',
    client_id: config.mtxserv_client_id,
    client_secret: config.mtxserv_client_secret,
    api_key: config.mtxserv_api_key,
};

const getAccessToken = function(params, callback) {
    request(
        {
            url: oauthTokenUrl + querystring.stringify(params),
            json: true,
            followRedirect: false,
        },
        function(error, response, body) {
            if (
                null !== error ||
                response.statusCode !== 200 ||
                typeof body.access_token === 'undefined'
            ) {
                console.log(
                    "Can't retrieve access_token data, check your credentials (" +
                        response.statusCode +
                        ' ' +
                        (error !== null ? error : '') +
                        ')',
                );
                return;
            }

            callback(body.access_token);
        },
    );
};

const stringify_viewer_response = function(data) {
    const address = data.ip.toUpperCase() + ':' + data.port;

    if (!data.is_online) {
        return 'Server ' + address + ' is currently offline.';
    }

    return (
        data.params.host_name +
        ' (' +
        data.params.used_slots +
        '/' +
        data.params.max_slots +
        ') - ' +
        address
    );
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content !== '!status') {
        return;
    }

    getAccessToken(authParams, function(accessToken) {
        request(
            {
                url: viewerApiUrl + '&access_token=' + accessToken,
                json: true,
            },
            function(error, response, body) {
                if (null !== error || response.statusCode !== 200) {
                    console.log(
                        "Can't retrieve viewer data (" +
                            response.statusCode +
                            ' ' +
                            (error !== null ? error : '') +
                            ')',
                    );
                    msg.reply("An error occured, can't retrieve server data");
                    return;
                }

                msg.channel.send(stringify_viewer_response(body));
            },
        );
    });
});

client.login(config.discord_bot_token);
