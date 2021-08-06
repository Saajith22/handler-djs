const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('ready', async () => {
        console.log(client.user.username + ' is ready to dream!');
        client.user.setActivity(`${client.users.cache.size} Dreamers!`, { type: "WATCHING" })
    })
}