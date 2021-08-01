const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES"
    ],
    partials: ["GUILD_MEMBER", "CHANNEL", "REACTION"]
});

module.exports = client;
client.commands = new Discord.Collection();
client.slash_commands = new Discord.Collection();
require('./handler/handler');
require('./handler/slash');


client.login(process.env.token);