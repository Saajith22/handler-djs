const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 */
module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;
        if (!message.guild) return;

        const prefix = process.env.prefix;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (!message.content || !message.content.toLowerCase().startsWith(prefix)) return;
        const cmd = args.shift();
        let command = client.commands.get(cmd);
        if (!command)
            command = client.aliases.get(cmd);
        if(command  == undefined) return;

        command.run(client, message, args, Discord);
    })
}