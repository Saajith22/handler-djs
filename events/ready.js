const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('ready', async () => {
        console.log(client.user.username + ' is online!');

    })
}